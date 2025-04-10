
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Filter, Plus, Search, User } from "lucide-react";
import { format, addDays, startOfToday } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock appointment data
const appointments = [
  {
    id: "1",
    patientName: "John Smith",
    patientId: "P001",
    doctorName: "Dr. Williams",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    time: "09:30 AM",
    type: "Check-up",
    status: "Scheduled",
  },
  {
    id: "2",
    patientName: "Emily Johnson",
    patientId: "P002",
    doctorName: "Dr. Garcia",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:15 AM",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientId: "P003",
    doctorName: "Dr. Chen",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "11:00 AM",
    type: "Consultation",
    status: "Completed",
  },
  {
    id: "4",
    patientName: "Sarah Davis",
    patientId: "P004",
    doctorName: "Dr. Williams",
    date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
    time: "01:30 PM",
    type: "Check-up",
    status: "Scheduled",
  },
  {
    id: "5",
    patientName: "David Wilson",
    patientId: "P005",
    doctorName: "Dr. Garcia",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
    time: "02:45 PM",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "6",
    patientName: "James Miller",
    patientId: "P006",
    doctorName: "Dr. Wilson",
    date: format(addDays(new Date(), -1), "yyyy-MM-dd"),
    time: "09:00 AM",
    type: "Check-up",
    status: "Cancelled",
  },
  {
    id: "7",
    patientName: "Jennifer Taylor",
    patientId: "P007",
    doctorName: "Dr. Anderson",
    date: format(addDays(new Date(), -2), "yyyy-MM-dd"),
    time: "11:30 AM",
    type: "Consultation",
    status: "Completed",
  },
];

// Mock doctors for filter
const doctors = [
  { id: "1", name: "Dr. Williams" },
  { id: "2", name: "Dr. Garcia" },
  { id: "3", name: "Dr. Chen" },
  { id: "4", name: "Dr. Wilson" },
  { id: "5", name: "Dr. Anderson" },
];

// Status badge color mapping
const statusColorMap: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  
  // Filter appointments based on search term and filters
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDoctor = !selectedDoctor || appointment.doctorName === selectedDoctor;
    const matchesStatus = !selectedStatus || appointment.status === selectedStatus;
    
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  // Group appointments by date
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const todayAppointments = filteredAppointments.filter((appointment) => appointment.date === todayDate);
  const upcomingAppointments = filteredAppointments.filter((appointment) => appointment.date > todayDate);
  const pastAppointments = filteredAppointments.filter((appointment) => appointment.date < todayDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
        <Button onClick={() => navigate("/appointments/new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
              <h3 className="text-2xl font-bold">{todayAppointments.length}</h3>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold">{upcomingAppointments.length}</h3>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Patients Seen</p>
              <h3 className="text-2xl font-bold">{pastAppointments.length}</h3>
            </div>
            <User className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground hidden sm:block">Filter by:</p>
        </div>
        
        <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Doctors</SelectItem>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.name}>
                {doctor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={setSelectedStatus} value={selectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <AppointmentTable appointments={filteredAppointments} />
        </TabsContent>
        
        <TabsContent value="today" className="mt-6">
          <AppointmentTable appointments={todayAppointments} />
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          <AppointmentTable appointments={upcomingAppointments} />
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <AppointmentTable appointments={pastAppointments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AppointmentTableProps {
  appointments: typeof appointments;
}

function AppointmentTable({ appointments }: AppointmentTableProps) {
  const navigate = useNavigate();
  
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-muted/10">
        <p className="text-muted-foreground">No appointments found</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">#{appointment.patientId}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p>{format(new Date(appointment.date), "MMM dd, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                </div>
              </TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.type}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={statusColorMap[appointment.status]}
                >
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate(`/appointments/${appointment.id}/edit`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => alert("Cancel " + appointment.id)}
                    >
                      Cancel Appointment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
