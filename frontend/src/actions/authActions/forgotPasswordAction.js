import axios from "axios";
import { URL } from "../../assets/config";

export default async function forgotPasswordAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    return await axios.post(`${URL}/api/v1/auth/forgotPassword`, { email });
  } catch (err) {
    return {
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}
