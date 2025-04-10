
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Edit2, MoreVertical, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data for attendance record (would come from API in real app)
const getAttendanceRecord = (id: string) => {
  return {
    id,
    employeeName: "John Smith",
    employeeId: "EMP-123456",
    role: "Doctor",
    department: "Cardiology",
    date: "2025-04-10",
    checkInTime: "2025-04-10T08:05:23",
    checkOutTime: "2025-04-10T17:12:45",
    status: "Present",
    totalHours: "9.12",
    notes: "Arrived slightly late due to traffic congestion.",
    createdBy: "Admin User",
    createdAt: "2025-04-10T08:10:00",
    modifiedAt: "2025-04-10T17:15:00"
  };
};

// Mock data for attendance history
const ATTENDANCE_HISTORY = [
  { date: "2025-04-09", status: "Present", checkIn: "08:00", checkOut: "17:00", hours: "9.00" },
  { date: "2025-04-08", status: "Present", checkIn: "08:15", checkOut: "17:30", hours: "9.25" },
  { date: "2025-04-07", status: "Late", checkIn: "09:30", checkOut: "18:00", hours: "8.50" },
  { date: "2025-04-06", status: "Absent", checkIn: "-", checkOut: "-", hours: "0.00" },
  { date: "2025-04-05", status: "Present", checkIn: "08:05", checkOut: "17:10", hours: "9.08" }
];

export default function AttendanceDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const record = getAttendanceRecord(id || "1");

  const handleDelete = () => {
    toast.success("Attendance record deleted");
    navigate("/attendance");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigate("/attendance")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Attendance
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/attendance/record.pdf" download target="_blank">
              Print Record
            </a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/attendance/${id}/edit`)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Record
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">Employee</p>
                  <p className="text-base font-medium">{record.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="text-base font-medium">{record.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="text-base font-medium">{record.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="text-base font-medium">{record.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-base font-medium">
                    {format(new Date(record.date), "PPP")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                    ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                      record.status === 'Late' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {record.status}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-in Time</p>
                  <p className="text-base font-medium flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    {format(new Date(record.checkInTime), "hh:mm a")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check-out Time</p>
                  <p className="text-base font-medium flex items-center">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    {format(new Date(record.checkOutTime), "hh:mm a")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-base font-medium">{record.totalHours} hrs</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes</p>
                <p className="text-sm">{record.notes || "No notes available"}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Record Information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Created By</p>
                    <p>{record.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created At</p>
                    <p>{format(new Date(record.createdAt), "PPP 'at' p")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Modified</p>
                    <p>{format(new Date(record.modifiedAt), "PPP 'at' p")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Check-in</th>
                      <th className="text-left py-3 px-4">Check-out</th>
                      <th className="text-right py-3 px-4">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ATTENDANCE_HISTORY.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                            ${item.status === 'Present' ? 'bg-green-100 text-green-800' : 
                              item.status === 'Late' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {item.status}
                          </div>
                        </td>
                        <td className="py-3 px-4">{item.checkIn}</td>
                        <td className="py-3 px-4">{item.checkOut}</td>
                        <td className="py-3 px-4 text-right">{item.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <User className="h-10 w-10" />
                </div>
                <h3 className="font-medium text-lg">{record.employeeName}</h3>
                <p className="text-muted-foreground">{record.role}</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{record.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p className="font-medium">{record.employeeId}</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/employee/profile/1">View Full Profile</a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">April 2025</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present</span>
                    <span className="font-medium">18 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Late</span>
                    <span className="font-medium">2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent</span>
                    <span className="font-medium">1 day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">On Leave</span>
                    <span className="font-medium">0 days</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Work Hours</span>
                    <span className="font-medium">168.5 hrs</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
