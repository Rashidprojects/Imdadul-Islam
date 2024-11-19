import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/providers/AuthCOntext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // Redirect to admin-portal if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/admin-portal" replace />;
    }

    return children;
};

export default ProtectedRoute;
