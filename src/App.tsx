
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./components/auth/AuthRoute";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/patients/PatientsPage";
import PatientForm from "./pages/patients/PatientForm";
import PatientDetails from "./pages/patients/PatientDetails";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentForm from "./pages/appointments/AppointmentForm";
import NotFound from "./pages/NotFound";

// Prescription Module
import PrescriptionsPage from "./pages/prescriptions/PrescriptionsPage";
import PrescriptionForm from "./pages/prescriptions/PrescriptionForm";
import PrescriptionDetails from "./pages/prescriptions/PrescriptionDetails";

// Lab Requests Module
import LabRequestsPage from "./pages/lab-requests/LabRequestsPage";

// Invoices Module
import InvoicesPage from "./pages/invoices/InvoicesPage";

// Notifications Module
import NotificationsPage from "./pages/notifications/NotificationsPage";

// Roles Module
import RolesPage from "./pages/roles/RolesPage";

// Attendance Module
import AttendancePage from "./pages/attendance/AttendancePage";
import AttendanceForm from "./pages/attendance/AttendanceForm";
import AttendanceDetail from "./pages/attendance/AttendanceDetail";
import AttendanceReport from "./pages/attendance/AttendanceReport";

// Audit Logs Module
import AuditLogsPage from "./pages/audit-logs/AuditLogsPage";

// Settings Module
import SettingsPage from "./pages/settings/SettingsPage";

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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route element={<AuthRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Patient routes */}
              <Route path="/patients" element={<PatientsPage />} />
              <Route path="/patients/new" element={<PatientForm />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route path="/patients/:id/edit" element={<PatientForm />} />
              
              {/* Appointment routes */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/appointments/new" element={<AppointmentForm />} />
              <Route path="/appointments/:id" element={<AppointmentForm />} />
              
              {/* Prescription routes */}
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/prescriptions/new" element={<PrescriptionForm />} />
              <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
              <Route path="/prescriptions/:id/edit" element={<PrescriptionForm />} />
              
              {/* Lab Requests routes */}
              <Route path="/lab-requests" element={<LabRequestsPage />} />
              
              {/* Invoices routes */}
              <Route path="/invoices" element={<InvoicesPage />} />
              
              {/* Notifications routes */}
              <Route path="/notifications" element={<NotificationsPage />} />
              
              {/* Roles routes */}
              <Route path="/roles" element={<RolesPage />} />
              
              {/* Attendance routes */}
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/attendance/new" element={<AttendanceForm />} />
              <Route path="/attendance/:id" element={<AttendanceDetail />} />
              <Route path="/attendance/:id/edit" element={<AttendanceForm />} />
              <Route path="/attendance/report" element={<AttendanceReport />} />
              
              {/* Audit Logs routes */}
              <Route path="/audit-logs" element={<AuditLogsPage />} />
              
              {/* Settings routes */}
              <Route path="/settings" element={<SettingsPage />} />
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
