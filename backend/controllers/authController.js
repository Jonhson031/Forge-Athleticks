import jwt from "jsonwebtoken";
import { promisify } from "util";
import crypto from "crypto";

import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401),
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401),
    );
  }

  req.user = currentUser;
  next();
});

const signToken = function (
  id,
  purpose = "auth",
  expiresIn = process.env.JWT_EXPIRES_IN,
) {
  const resetToken = jwt.sign(
    {
      id,
      purpose,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    },
  );
  return resetToken;
};

const createSendToken = function (
  user,
  statusCode,
  res,
  purpose = "auth",
  expiresIn = process.env.JWT_EXPIRES_IN,
) {
  const token = signToken(user._id, purpose, expiresIn);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  } else {
    cookieOptions.sameSite = "lax";
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  user.passwordResetAttempts = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetLockedUntil = undefined;
  user.passwordResetToken = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  createSendToken(user, 201, res);
});

export const getMe = catchAsync(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// * Forgot Passowrd
export const forgotPassword = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  // Prevent email enumeration
  if (!user) {
    return res.status(200).json({
      status: "success",
      message:
        "If an account exists with that email, a verification code has been sent.",
    });
  }

  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(randomCode);

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.createPasswordResetToken(randomCode);
  await user.save({ validateBeforeSave: false });

  const message = `Forgot your password? Use the following code to reset it: ${randomCode}.\nIf you didn't forget your password, please ignore this email! Code is valid for 10 minutes.`;

  try {
    return res.status(200).json({
      status: "success",
      message:
        "If an account exists with that email, a verification code has been sent.",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Please try again!",
        500,
      ),
    );
  }
});

// * Verify Reset Code
export const verifyResetCode = catchAsync(async (req, res, next) => {
  const { email, code } = req.body;
  const user = await User.findOne({
    email,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired reset code!", 400));
  }

  if (
    user.passwordResetLockedUntil &&
    user.passwordResetLockedUntil > Date.now()
  ) {
    return next(
      new AppError("Too many failed attempts. Try again later.", 429),
    );
  }
  const validCode = user.correctResetCode(code);

  const validExpiration = user.passwordResetExpires > Date.now();

  if (!validCode || !validExpiration) {
    user.passwordResetAttempts += 1;

    if (user.passwordResetAttempts >= 5) {
      user.passwordResetLockedUntil = Date.now() + 15 * 60 * 1000;
    }

    await user.save({
      validateBeforeSave: false,
    });

    return next(new AppError("Invalid or expired code.", 400));
  }

  // Success
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetAttempts = 0;
  user.passwordResetLockedUntil = undefined;

  await user.save({
    validateBeforeSave: false,
  });

  const resetToken = signToken(user._id, "password-reset", "15m");
  res.cookie("passwordResetToken", resetToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    message: "Reset code verified. You can now reset your password.",
  });
});

// * Reset Password
export const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.cookies.passwordResetToken;

  if (!token) {
    return next(new AppError("Please provide a reset token!", 400));
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Token is invalid or expired!", 400));
  }

  if (decoded.purpose !== "password-reset") {
    return next(new AppError("Token is invalid or expired!", 400));
  }

  const user = await User.findById(decoded.id).select("+password");

  if (!user) return next(new AppError("Token is invalid or expired!", 400));

  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 201, res);
});

// * Updating the CURRENT user password
export const updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;
  if (!oldPassword)
    return next(new AppError("Please provide old password", 400));

  const { _id } = req.user;
  const user = await User.findOne({ _id }).select("+password");

  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(new AppError("Your current password is wrong!", 401));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 201, res);
});
