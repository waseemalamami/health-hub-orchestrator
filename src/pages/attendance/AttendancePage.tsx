
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Filter, Plus, Search, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Mock data for attendance records
const ATTENDANCE_DATA = [
  {
    id: "1",
    employeeName: "John Smith",
    role: "Doctor",
    checkInTime: "2025-04-10T08:05:23",
    checkOutTime: "2025-04-10T17:12:45",
    status: "Present",
    department: "Cardiology"
  },
  {
    id: "2",
    employeeName: "Sarah Johnson",
    role: "Nurse",
    checkInTime: "2025-04-10T08:32:10",
    checkOutTime: "2025-04-10T16:45:30",
    status: "Present",
    department: "Pediatrics"
  },
  {
    id: "3",
    employeeName: "Michael Brown",
    role: "Lab Technician",
    checkInTime: "2025-04-10T09:15:00",
    checkOutTime: "2025-04-10T18:20:15",
    status: "Late",
    department: "Laboratory"
  },
  {
    id: "4",
    employeeName: "Emily Wilson",
    role: "Receptionist",
    checkInTime: null,
    checkOutTime: null,
    status: "Absent",
    department: "Administration"
  },
  {
    id: "5",
    employeeName: "Robert Garcia",
    role: "Pharmacist",
    checkInTime: "2025-04-10T08:00:12",
    checkOutTime: "2025-04-10T16:05:30",
    status: "Present",
    department: "Pharmacy"
  }
];

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const formattedDate = date ? format(date, "PPP") : "Select date";

  // Filter attendance records based on search term and status filter
  const filteredAttendance = ATTENDANCE_DATA.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleCheckInOut = (id: string, action: "in" | "out") => {
    const record = ATTENDANCE_DATA.find(r => r.id === id);
    if (!record) return;

    const employeeName = record.employeeName;
    const currentTime = new Date().toLocaleTimeString();
    
    if (action === "in") {
      toast.success(`${employeeName} checked in at ${currentTime}`);
    } else {
      toast.success(`${employeeName} checked out at ${currentTime}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/attendance/report">
              <Filter className="mr-2 h-4 w-4" /> Generate Report
            </Link>
          </Button>
          <Button asChild>
            <Link to="/attendance/new">
              <Plus className="mr-2 h-4 w-4" /> Manual Entry
            </Link>
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full md:w-[240px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <div className="w-full md:w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-[180px]">
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.role}</TableCell>
                      <TableCell>{record.department}</TableCell>
                      <TableCell>
                        {record.checkInTime 
                          ? format(new Date(record.checkInTime), "hh:mm a") 
                          : "Not checked in"}
                      </TableCell>
                      <TableCell>
                        {record.checkOutTime 
                          ? format(new Date(record.checkOutTime), "hh:mm a") 
                          : "Not checked out"}
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                            record.status === 'Late' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {record.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {!record.checkInTime && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCheckInOut(record.id, "in")}
                            className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                          >
                            <Clock className="mr-1 h-3 w-3" /> Check In
                          </Button>
                        )}
                        {record.checkInTime && !record.checkOutTime && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCheckInOut(record.id, "out")}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                          >
                            <Clock className="mr-1 h-3 w-3" /> Check Out
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/attendance/${record.id}`}>
                            <UserCheck className="mr-1 h-3 w-3" /> Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
