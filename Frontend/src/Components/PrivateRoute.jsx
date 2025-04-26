import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("moneytracker_user");

  // If no user in localStorage, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Else, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
