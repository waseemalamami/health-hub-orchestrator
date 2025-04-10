
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// Mock data for prescriptions
const PRESCRIPTIONS_DATA = [
  {
    id: "1",
    patientName: "John Doe",
    doctor: "Dr. Smith",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    duration: "7 days",
    status: "Active",
    date: "2025-04-05"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctor: "Dr. Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    status: "Active",
    date: "2025-04-03"
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctor: "Dr. Williams",
    medication: "Metformin",
    dosage: "850mg",
    frequency: "Twice daily",
    duration: "90 days",
    status: "Completed",
    date: "2025-03-20"
  },
  {
    id: "4",
    patientName: "Emily Davis",
    doctor: "Dr. Garcia",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    duration: "30 days",
    status: "Active",
    date: "2025-04-01"
  },
  {
    id: "5",
    patientName: "Michael Wilson",
    doctor: "Dr. Smith",
    medication: "Albuterol",
    dosage: "90mcg",
    frequency: "As needed",
    duration: "30 days",
    status: "Expired",
    date: "2025-02-15"
  }
];

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const { toast } = useToast();

  // Filter prescriptions based on search term and filters
  const filteredPrescriptions = PRESCRIPTIONS_DATA.filter(prescription => {
    const matchesSearch = 
      prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || prescription.status === statusFilter;
    const matchesDoctor = doctorFilter === "all" || prescription.doctor === doctorFilter;
    
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // Get unique doctors for filter
  const doctors = [...new Set(PRESCRIPTIONS_DATA.map(p => p.doctor))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <Button asChild>
          <Link to="/prescriptions/new">
            <Plus className="mr-2 h-4 w-4" /> New Prescription
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Prescriptions List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-[180px]">
                <Select
                  value={doctorFilter}
                  onValueChange={setDoctorFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[180px]">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No prescriptions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>{prescription.patientName}</TableCell>
                      <TableCell>{prescription.medication}</TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.doctor}</TableCell>
                      <TableCell>{prescription.date}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            prescription.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {prescription.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link to={`/prescriptions/${prescription.id}`}>
                            View
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
