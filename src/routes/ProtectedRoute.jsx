import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/providers/SigninContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or similar
    }

    return isAuthenticated ? children : <Navigate to="/admin-portal" />;
};

export default ProtectedRoute;
