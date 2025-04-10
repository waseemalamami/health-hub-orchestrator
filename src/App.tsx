
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./components/auth/AuthRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/patients/PatientsPage";
import PatientForm from "./pages/patients/PatientForm";
import PatientDetails from "./pages/patients/PatientDetails";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route element={<AuthRoute />}>
              <Route path="/" element={<DashboardPage />} />
              
              {/* Patient routes */}
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/patients/new" element={<PatientForm />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/patients/:id/edit" element={<PatientForm />} />
              
              {/* Appointment routes */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              
              {/* Add placeholder routes for other modules */}
              <Route path="/prescriptions" element={<div className="p-4">Prescriptions Module (Coming Soon)</div>} />
              <Route path="/lab-requests" element={<div className="p-4">Lab Requests Module (Coming Soon)</div>} />
              <Route path="/invoices" element={<div className="p-4">Invoices Module (Coming Soon)</div>} />
              <Route path="/notifications" element={<div className="p-4">Notifications Module (Coming Soon)</div>} />
              <Route path="/roles" element={<div className="p-4">Roles & Permissions Module (Coming Soon)</div>} />
              <Route path="/attendance" element={<div className="p-4">Attendance Module (Coming Soon)</div>} />
              <Route path="/audit-logs" element={<div className="p-4">Audit Logs Module (Coming Soon)</div>} />
              <Route path="/settings" element={<div className="p-4">Settings Module (Coming Soon)</div>} />
            </Route>
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
