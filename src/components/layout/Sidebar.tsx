
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  Receipt,
  Bell,
  ShieldCheck,
  Clock,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn("hms-sidebar-item", active && "hms-sidebar-item-active")}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <Users size={20} />, label: "Patients", href: "/patients" },
    { icon: <CalendarDays size={20} />, label: "Appointments", href: "/appointments" },
    { icon: <ClipboardList size={20} />, label: "Prescriptions", href: "/prescriptions" },
    { icon: <FlaskConical size={20} />, label: "Lab Requests", href: "/lab-requests" },
    { icon: <Receipt size={20} />, label: "Invoices", href: "/invoices" },
    { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
    { icon: <ShieldCheck size={20} />, label: "Roles", href: "/roles" },
    { icon: <Clock size={20} />, label: "Attendance", href: "/attendance" },
    { icon: <FileText size={20} />, label: "Audit Logs", href: "/audit-logs" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" }
  ];
  
  return (
    <div className="h-screen flex flex-col bg-sidebar fixed w-64 border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground flex items-center">
          <span className="text-accent mr-2">●</span> 
          HMS System
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </div>
      
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={logout}
          className="hms-sidebar-item w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
