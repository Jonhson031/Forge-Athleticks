import axios from "axios";
import { redirect } from "react-router-dom";
import { URL } from "../assets/config.js";

export async function dashboardLoader({ request }) {
  try {
    const res = await axios.get(`${URL}/api/v1/auth/me`, {
      withCredentials: true,
      signal: request.signal,
    });

    return res.data.data.user;
  } catch {
    return redirect("/login");
  }
}
