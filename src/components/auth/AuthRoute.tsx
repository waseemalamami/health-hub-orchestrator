
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PageLayout } from "@/components/layout/PageLayout";

export default function AuthRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle text-center">
          <div className="mb-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 mx-auto" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if accessing the root path
  if (location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
