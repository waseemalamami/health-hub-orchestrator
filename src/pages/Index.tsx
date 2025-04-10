
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is logged in, so we don't need to navigate
        // The AuthRoute will handle displaying the dashboard
      } else {
        // If not logged in, redirect to login
        navigate("/login", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  // This is just a loading state while checking authentication
  // The actual rendering is handled by the AuthRoute
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse-subtle text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
