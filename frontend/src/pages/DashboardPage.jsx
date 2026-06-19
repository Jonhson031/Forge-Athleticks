import { useSelector } from "react-redux";
import { useLoaderData, Navigate } from "react-router-dom";
// import Dashboard from "../components/Dashboard/Dashboard";

export default function DashboardPage() {
  const loaderUser = useLoaderData();
  const reduxUser = useSelector((state) => state.auth.user);

  const user = reduxUser || loaderUser;

  if (!user) return <Navigate to="/login" replace />;

  // return <Dashboard />;
  return <h1>Hello {user.firstName}</h1>;
}
