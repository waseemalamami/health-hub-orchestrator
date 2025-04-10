import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileEdit, Calendar, Pill, Microscope, Receipt, FileText } from "lucide-react";

// Mock patient data
const patientData = {
  id: 1,
  firstName: "John",
  lastName: "Smith",
  gender: "Male",
  dateOfBirth: "1980-06-15",
  age: 45,
  phone: "555-123-4567",
  email: "john.smith@example.com",
  address: "123 Main Street",
  city: "Springfield",
  state: "IL",
  postalCode: "62704",
  bloodType: "A+",
  allergies: "Penicillin, Peanuts",
  medicalHistory: "Hypertension (diagnosed 2018), Appendectomy (2010)",
  
  appointments: [
    { id: 1, date: "2025-03-15", time: "09:30 AM", reason: "Annual checkup", doctor: "Dr. Williams", status: "Completed" },
    { id: 2, date: "2025-02-10", time: "10:15 AM", reason: "Flu symptoms", doctor: "Dr. Garcia", status: "Completed" },
    { id: 3, date: "2025-04-20", time: "02:00 PM", reason: "Follow-up", doctor: "Dr. Williams", status: "Scheduled" }
  ],
  
  prescriptions: [
    { id: 1, date: "2025-03-15", medication: "Lisinopril 10mg", instructions: "Take once daily", doctor: "Dr. Williams", status: "Active" },
    { id: 2, date: "2025-02-10", medication: "Amoxicillin 500mg", instructions: "Take twice daily for 10 days", doctor: "Dr. Garcia", status: "Completed" }
  ],
  
  labResults: [
    { id: 1, date: "2025-03-15", test: "Complete Blood Count", result: "Normal", status: "Completed" },
    { id: 2, date: "2025-03-15", test: "Lipid Panel", result: "Elevated LDL", status: "Completed" },
    { id: 3, date: "2025-04-20", test: "A1C", status: "Pending" }
  ],
  
  invoices: [
    { id: 1, date: "2025-03-15", amount: "$150.00", description: "Annual checkup", status: "Paid" },
    { id: 2, date: "2025-02-10", amount: "$85.00", description: "Urgent care visit", status: "Paid" }
  ]
};

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch the patient data based on the ID
  // const patient = useFetchPatient(id);
  const patient = patientData;
  
  if (!patient) {
    return <div>Loading patient data...</div>;
  }
  
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/patients")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="hms-title">{patient.firstName} {patient.lastName}</h1>
            <p className="text-muted-foreground">Patient ID: #{patient.id}</p>
          </div>
        </div>
        
        <Button onClick={() => navigate(`/patients/${id}/edit`)}>
          <FileEdit className="mr-2 h-4 w-4" />
          Edit Patient
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Basic Info</p>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm">Gender:</div>
                  <div className="text-sm font-medium">{patient.gender}</div>
                  
                  <div className="text-sm">Age:</div>
                  <div className="text-sm font-medium">{calculateAge(patient.dateOfBirth)}</div>
                  
                  <div className="text-sm">DOB:</div>
                  <div className="text-sm font-medium">{new Date(patient.dateOfBirth).toLocaleDateString()}</div>
                  
                  <div className="text-sm">Blood Type:</div>
                  <div className="text-sm font-medium">{patient.bloodType}</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Contact</p>
                <div className="grid grid-cols-1 gap-1">
                  <div className="text-sm">Phone:</div>
                  <div className="text-sm font-medium">{patient.phone}</div>
                  
                  <div className="text-sm">Email:</div>
                  <div className="text-sm font-medium">{patient.email}</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <div className="grid grid-cols-1 gap-1">
                  <div className="text-sm font-medium">
                    {patient.address}<br />
                    {patient.city}, {patient.state} {patient.postalCode}
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Medical</p>
                <div className="grid grid-cols-1 gap-1">
                  <div className="text-sm">Allergies:</div>
                  <div className="text-sm font-medium">{patient.allergies}</div>
                  
                  <div className="text-sm">Medical History:</div>
                  <div className="text-sm font-medium">{patient.medicalHistory}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <Tabs defaultValue="appointments">
              <TabsList>
                <TabsTrigger value="appointments" className="flex gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Appointments</span>
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="flex gap-1">
                  <Pill className="h-4 w-4" />
                  <span>Prescriptions</span>
                </TabsTrigger>
                <TabsTrigger value="lab-results" className="flex gap-1">
                  <Microscope className="h-4 w-4" />
                  <span>Lab Results</span>
                </TabsTrigger>
                <TabsTrigger value="invoices" className="flex gap-1">
                  <Receipt className="h-4 w-4" />
                  <span>Invoices</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Documents</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments">
              <TabsContent value="appointments" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Date</th>
                          <th className="h-10 px-4 text-left font-medium">Time</th>
                          <th className="h-10 px-4 text-left font-medium">Reason</th>
                          <th className="h-10 px-4 text-left font-medium">Doctor</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.appointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b">
                            <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                            <td className="p-4">{appointment.time}</td>
                            <td className="p-4">{appointment.reason}</td>
                            <td className="p-4">{appointment.doctor}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                appointment.status === "Scheduled" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {appointment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="prescriptions" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Date</th>
                          <th className="h-10 px-4 text-left font-medium">Medication</th>
                          <th className="h-10 px-4 text-left font-medium">Instructions</th>
                          <th className="h-10 px-4 text-left font-medium">Doctor</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.prescriptions.map((prescription) => (
                          <tr key={prescription.id} className="border-b">
                            <td className="p-4">{new Date(prescription.date).toLocaleDateString()}</td>
                            <td className="p-4">{prescription.medication}</td>
                            <td className="p-4">{prescription.instructions}</td>
                            <td className="p-4">{prescription.doctor}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                prescription.status === "Active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {prescription.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="lab-results" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Date</th>
                          <th className="h-10 px-4 text-left font-medium">Test</th>
                          <th className="h-10 px-4 text-left font-medium">Result</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.labResults.map((lab) => (
                          <tr key={lab.id} className="border-b">
                            <td className="p-4">{new Date(lab.date).toLocaleDateString()}</td>
                            <td className="p-4">{lab.test}</td>
                            <td className="p-4">{lab.result || "—"}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                lab.status === "Pending" 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {lab.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="invoices" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Date</th>
                          <th className="h-10 px-4 text-left font-medium">Description</th>
                          <th className="h-10 px-4 text-left font-medium">Amount</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b">
                            <td className="p-4">{new Date(invoice.date).toLocaleDateString()}</td>
                            <td className="p-4">{invoice.description}</td>
                            <td className="p-4">{invoice.amount}</td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                invoice.status === "Paid" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {invoice.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <div className="flex items-center justify-center h-48 border rounded-md bg-muted/20">
                  <div className="text-center">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No documents available</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
