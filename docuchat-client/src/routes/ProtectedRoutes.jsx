import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("user : ", user);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
