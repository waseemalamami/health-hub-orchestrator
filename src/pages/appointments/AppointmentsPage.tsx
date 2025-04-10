
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";

interface Appointment {
  id: number;
  patientName: string;
  patientId: number;
  time: string;
  duration: number;
  type: string;
  doctor: string;
  status: string;
}

// Mock appointments data
const appointmentsData: Record<string, Appointment[]> = {
  "2025-04-10": [
    { 
      id: 1, 
      patientName: "John Smith", 
      patientId: 1, 
      time: "09:00 AM", 
      duration: 30, 
      type: "Check-up", 
      doctor: "Dr. Williams", 
      status: "Confirmed" 
    },
    { 
      id: 2, 
      patientName: "Emily Johnson", 
      patientId: 2, 
      time: "10:15 AM", 
      duration: 45, 
      type: "Follow-up", 
      doctor: "Dr. Williams", 
      status: "Confirmed" 
    },
    { 
      id: 3, 
      patientName: "David Wilson", 
      patientId: 5, 
      time: "11:30 AM", 
      duration: 30, 
      type: "Check-up", 
      doctor: "Dr. Williams", 
      status: "Confirmed" 
    },
    { 
      id: 4, 
      patientName: "Sarah Davis", 
      patientId: 4, 
      time: "02:00 PM", 
      duration: 60, 
      type: "Consultation", 
      doctor: "Dr. Williams", 
      status: "Confirmed" 
    },
  ],
  "2025-04-11": [
    { 
      id: 5, 
      patientName: "Michael Brown", 
      patientId: 3, 
      time: "09:30 AM", 
      duration: 30, 
      type: "Check-up", 
      doctor: "Dr. Garcia", 
      status: "Confirmed" 
    },
    { 
      id: 6, 
      patientName: "Jennifer Taylor", 
      patientId: 6, 
      time: "11:00 AM", 
      duration: 45, 
      type: "Follow-up", 
      doctor: "Dr. Garcia", 
      status: "Confirmed" 
    },
  ],
  "2025-04-12": [
    { 
      id: 7, 
      patientName: "Robert Martinez", 
      patientId: 7, 
      time: "10:00 AM", 
      duration: 30, 
      type: "Check-up", 
      doctor: "Dr. Chen", 
      status: "Confirmed" 
    },
  ],
};

const doctors = [
  "All Doctors",
  "Dr. Williams",
  "Dr. Garcia",
  "Dr. Chen",
];

export default function AppointmentsPage() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [selectedDoctor, setSelectedDoctor] = useState("All Doctors");
  const [view, setView] = useState<"day" | "week" | "month">("day");
  
  const formattedDate = date ? date.toISOString().split('T')[0] : '';
  
  const getAppointmentsForDate = (date: string) => {
    return appointmentsData[date] || [];
  };
  
  const filteredAppointments = getAppointmentsForDate(formattedDate).filter(
    (appointment) => selectedDoctor === "All Doctors" || appointment.doctor === selectedDoctor
  );
  
  // Format date for display
  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handlePrevDay = () => {
    if (date) {
      const prevDay = new Date(date);
      prevDay.setDate(prevDay.getDate() - 1);
      setDate(prevDay);
    }
  };
  
  const handleNextDay = () => {
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setDate(nextDay);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="hms-title">Appointments</h1>
          <p className="text-muted-foreground">
            Manage and schedule patient appointments
          </p>
        </div>
        
        <Button asChild>
          <Link to="/appointments/new">
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Appointment
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Doctor</label>
                <Select
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">View</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={view === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView("day")}
                  >
                    Day
                  </Button>
                  <Button
                    variant={view === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={view === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setView("month")}
                  >
                    Month
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button size="icon" variant="ghost" onClick={handlePrevDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="font-semibold">
                  {date ? formatDisplayDate(date) : "Today"}
                </h2>
                <Button size="icon" variant="ghost" onClick={handleNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {filteredAppointments.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {filteredAppointments.length} appointments
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center p-4 border rounded-md bg-card"
                  >
                    <div className="min-w-24 text-center">
                      <div className="text-sm font-medium">{appointment.time}</div>
                      <div className="text-xs text-muted-foreground">
                        {appointment.duration} min
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="font-medium">
                        <Link to={`/patients/${appointment.patientId}`} className="hover:underline">
                          {appointment.patientName}
                        </Link>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.type} with {appointment.doctor}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 border rounded-md bg-muted/20">
                <div className="text-center">
                  <CalendarPlus className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No appointments for this date</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    asChild
                  >
                    <Link to="/appointments/new">
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
