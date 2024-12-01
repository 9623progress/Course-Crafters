import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"; // use Navigate for redirection

export const IsAuthenticatedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Use the correct key (isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" />; // Navigate to login if not logged in
  }

  return children; // If logged in, render the children (protected content)
};

export const IsAdminRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin); // Access both isLoggedIn and isAdmin

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin) {
    return <Navigate to="/" />; // Redirect to home if not an admin
  }

  return children; // If logged in and an admin, render the children (protected content)
};
