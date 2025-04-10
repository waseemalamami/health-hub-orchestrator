
import { 
  UserRound,
  CalendarClock, 
  Stethoscope, 
  FlaskConical, 
  Receipt, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Patients Today",
      value: "42",
      change: "+12%",
      trend: "up",
      icon: <UserRound className="h-5 w-5" />
    },
    {
      title: "Appointments",
      value: "28",
      change: "+5%",
      trend: "up",
      icon: <CalendarClock className="h-5 w-5" />
    },
    {
      title: "Lab Tests",
      value: "17",
      change: "-3%",
      trend: "down",
      icon: <FlaskConical className="h-5 w-5" />
    },
    {
      title: "Revenue",
      value: "$9,432",
      change: "+18%",
      trend: "up",
      icon: <Receipt className="h-5 w-5" />
    }
  ];
  
  // Mock data for recent patients
  const recentPatients = [
    { id: 1, name: "John Smith", age: 45, gender: "Male", status: "Awaiting", doctor: "Dr. Williams" },
    { id: 2, name: "Emily Johnson", age: 32, gender: "Female", status: "In Treatment", doctor: "Dr. Garcia" },
    { id: 3, name: "Michael Brown", age: 58, gender: "Male", status: "Completed", doctor: "Dr. Chen" },
    { id: 4, name: "Sarah Davis", age: 27, gender: "Female", status: "Awaiting", doctor: "Dr. Williams" },
    { id: 5, name: "David Wilson", age: 63, gender: "Male", status: "In Treatment", doctor: "Dr. Garcia" },
  ];
  
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { id: 1, patient: "John Smith", time: "09:30 AM", doctor: "Dr. Williams", type: "Check-up" },
    { id: 2, patient: "Emily Johnson", time: "10:15 AM", doctor: "Dr. Garcia", type: "Follow-up" },
    { id: 3, patient: "Michael Brown", time: "11:00 AM", doctor: "Dr. Chen", type: "Consultation" },
    { id: 4, patient: "Sarah Davis", time: "01:30 PM", doctor: "Dr. Williams", type: "Check-up" },
    { id: 5, patient: "David Wilson", time: "02:45 PM", doctor: "Dr. Garcia", type: "Follow-up" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="hms-title">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="p-1 bg-primary/10 rounded-md text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs mt-1 ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>{stat.change} from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Occupancy rate card */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Hospital Occupancy
            </CardTitle>
            <CardDescription>Current bed utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  General Ward <span className="text-muted-foreground">(75%)</span>
                </div>
                <div className="font-medium">24/32</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  ICU <span className="text-muted-foreground">(60%)</span>
                </div>
                <div className="font-medium">6/10</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  Pediatric <span className="text-muted-foreground">(40%)</span>
                </div>
                <div className="font-medium">8/20</div>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  Maternity <span className="text-muted-foreground">(80%)</span>
                </div>
                <div className="font-medium">12/15</div>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <TrendingUp className="mr-2 h-4 w-4" />
              View detailed report
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="patients" className="w-full">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <TabsList>
                  <TabsTrigger value="patients">Patients</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patients" className="w-full">
              <TabsContent value="patients" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Name</th>
                          <th className="h-10 px-4 text-left font-medium">Age</th>
                          <th className="h-10 px-4 text-left font-medium">Gender</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                          <th className="h-10 px-4 text-left font-medium">Doctor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPatients.map((patient) => (
                          <tr key={patient.id} className="border-b">
                            <td className="p-4">{patient.name}</td>
                            <td className="p-4">{patient.age}</td>
                            <td className="p-4">{patient.gender}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                patient.status === "Awaiting" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : patient.status === "In Treatment" 
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {patient.status}
                              </span>
                            </td>
                            <td className="p-4">{patient.doctor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appointments" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Patient</th>
                          <th className="h-10 px-4 text-left font-medium">Time</th>
                          <th className="h-10 px-4 text-left font-medium">Doctor</th>
                          <th className="h-10 px-4 text-left font-medium">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingAppointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="p-4">{appointment.patient}</td>
                            <td className="p-4">{appointment.time}</td>
                            <td className="p-4">{appointment.doctor}</td>
                            <td className="p-4">{appointment.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              See all
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
