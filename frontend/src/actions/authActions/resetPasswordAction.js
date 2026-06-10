import axios from "axios";
import { URL } from "../../assets/config";

export default async function resetPasswordAction({ request }) {
  const formData = await request.formData();
  const password = formData.get("password");
  const passwordConfirm = formData.get("confirm");
  console.log(password, passwordConfirm);

  try {
    const res = await axios.patch(
      `${URL}/api/v1/auth/resetPassword`,
      {
        password,
        passwordConfirm,
      },
      { withCredentials: true },
    );
    return res;
  } catch (err) {
    return {
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}
