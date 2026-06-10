import { redirect } from "react-router-dom";
import axios from "axios";
import { URL } from "../../assets/config";

export default async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await axios.post(
      `${URL}/api/v1/auth/login`,
      { email, password },
      { withCredentials: true },
    );

    return redirect("/dashboard");
  } catch (err) {
    return {
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}
