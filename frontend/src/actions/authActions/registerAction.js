import axios from "axios";
import { redirect } from "react-router-dom";
import { URL } from "../../assets/config";

export default async function registerAction({ request }) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("confirm");

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" };
  }

  try {
    await axios.post(
      `${URL}/api/v1/auth/register`,
      {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
      },
    );

    return redirect("/dashboard");
  } catch (err) {
    return {
      error:
        err.response?.data?.message ||
        "Registration failed! Please try again later",
    };
  }
}
