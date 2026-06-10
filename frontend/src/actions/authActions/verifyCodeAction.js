import axios from "axios";
import { URL } from "../../assets/config";
import { redirect } from "react-router-dom";

export default async function verifyCodeAction({ request }) {
  const formData = await request.formData();
  const code = formData.get("code");
  const email = formData.get("email");

  try {
    await axios.post(
      `${URL}/api/v1/auth/verifyResetCode`,
      {
        code,
        email,
      },
      {
        withCredentials: true,
      },
    );
    return redirect("/reset-password");
  } catch (err) {
    return {
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}
