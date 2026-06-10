import { useLoaderData } from "react-router-dom";

export default function DashboardPage() {
  const user = useLoaderData();

  return <h1>Welcome, {user.firstName}</h1>;
}
