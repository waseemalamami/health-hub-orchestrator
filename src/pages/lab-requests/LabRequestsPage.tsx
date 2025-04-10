
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
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

// Mock data for lab requests
const LAB_REQUESTS_DATA = [
  {
    id: "1",
    patientName: "John Doe",
    doctor: "Dr. Smith",
    testName: "Complete Blood Count",
    priority: "Routine",
    status: "Pending",
    requestDate: "2025-04-05"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    doctor: "Dr. Johnson",
    testName: "Lipid Panel",
    priority: "Urgent",
    status: "Completed",
    requestDate: "2025-04-03"
  },
  {
    id: "3",
    patientName: "Robert Brown",
    doctor: "Dr. Williams",
    testName: "Urinalysis",
    priority: "Routine",
    status: "Processing",
    requestDate: "2025-04-06"
  },
  {
    id: "4",
    patientName: "Emily Davis",
    doctor: "Dr. Garcia",
    testName: "Liver Function Test",
    priority: "STAT",
    status: "Pending",
    requestDate: "2025-04-07"
  }
];

export default function LabRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter lab requests based on search term and status filter
  const filteredRequests = LAB_REQUESTS_DATA.filter(request => {
    const matchesSearch = 
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.testName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lab Requests</h1>
        <Button asChild>
          <Link to="/lab-requests/new">
            <Plus className="mr-2 h-4 w-4" /> New Lab Request
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lab Requests List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lab requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No lab requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>{request.testName}</TableCell>
                      <TableCell>{request.doctor}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${request.priority === 'STAT' ? 'bg-red-100 text-red-800' : 
                            request.priority === 'Urgent' ? 'bg-amber-100 text-amber-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {request.priority}
                        </div>
                      </TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${request.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            request.status === 'Processing' ? 'bg-purple-100 text-purple-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {request.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <Link to={`/lab-requests/${request.id}`}>
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
