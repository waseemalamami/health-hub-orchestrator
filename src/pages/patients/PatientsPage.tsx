
import { useState } from "react";
import { Link } from "react-router-dom";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Search, MoreVertical, FileEdit, Trash2, Eye } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  phone: string;
  email: string;
  bloodType: string;
  lastVisit: string;
}

const patients: Patient[] = [
  { 
    id: 1, 
    name: "John Smith", 
    gender: "Male", 
    age: 45, 
    phone: "555-123-4567", 
    email: "john.smith@example.com",
    bloodType: "A+",
    lastVisit: "2025-03-15"
  },
  { 
    id: 2, 
    name: "Emily Johnson", 
    gender: "Female", 
    age: 32, 
    phone: "555-234-5678", 
    email: "emily.johnson@example.com",
    bloodType: "O-",
    lastVisit: "2025-04-02"
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    gender: "Male", 
    age: 58, 
    phone: "555-345-6789", 
    email: "michael.brown@example.com",
    bloodType: "B+",
    lastVisit: "2025-03-28"
  },
  { 
    id: 4, 
    name: "Sarah Davis", 
    gender: "Female", 
    age: 27, 
    phone: "555-456-7890", 
    email: "sarah.davis@example.com",
    bloodType: "AB+",
    lastVisit: "2025-04-05"
  },
  { 
    id: 5, 
    name: "David Wilson", 
    gender: "Male", 
    age: 63, 
    phone: "555-567-8901", 
    email: "david.wilson@example.com",
    bloodType: "A-",
    lastVisit: "2025-03-20"
  },
  { 
    id: 6, 
    name: "Jennifer Taylor", 
    gender: "Female", 
    age: 41, 
    phone: "555-678-9012", 
    email: "jennifer.taylor@example.com",
    bloodType: "O+",
    lastVisit: "2025-04-01"
  },
  { 
    id: 7, 
    name: "Robert Martinez", 
    gender: "Male", 
    age: 52, 
    phone: "555-789-0123", 
    email: "robert.martinez@example.com",
    bloodType: "B-",
    lastVisit: "2025-03-25"
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="hms-title">Patients</h1>
          <p className="text-muted-foreground">
            Manage and view patient information
          </p>
        </div>
        
        <Button asChild>
          <Link to="/patients/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/patients/${patient.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/patients/${patient.id}/edit`}>
                            <FileEdit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No patients found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
