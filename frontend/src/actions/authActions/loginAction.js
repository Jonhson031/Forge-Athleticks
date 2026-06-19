import { redirect } from "react-router-dom";
import axios from "axios";
import { URL } from "../../assets/config";
import { authActions } from "../../redux/store/authSlice";
import { store } from "../../redux/store/store";

export default async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(
      `${URL}/api/v1/auth/login`,
      { email, password },
      { withCredentials: true },
    );

    const user = res.data.data.user;

    store.dispatch(authActions.setUser(user));

    return redirect("/dashboard");
  } catch (err) {
    return {
      error: err.response?.data?.message || "Something went wrong",
    };
  }
}
