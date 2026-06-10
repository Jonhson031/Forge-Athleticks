import jwt from "jsonwebtoken";
import { promisify } from "util";
import crypto from "crypto";

import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
