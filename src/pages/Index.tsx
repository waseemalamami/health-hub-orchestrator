
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [user, isLoading, navigate]);

  // This is just a loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse-subtle text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
