
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  Trash, 
  FileText,
  Calendar,
  User,
  Pill
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock prescription data
const PRESCRIPTIONS = [
  {
    id: "1",
    patientName: "John Doe",
    patientId: "1",
    doctorName: "Dr. Smith",
    doctorId: "1",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    duration: "7 days",
    instructions: "Take with food",
    status: "Active",
    createdAt: "2025-04-05",
    notes: [
      { id: "1", text: "Patient allergic to penicillin, prescribed alternative.", date: "2025-04-05" },
      { id: "2", text: "Follow-up recommended after course completion.", date: "2025-04-05" }
    ]
  },
  {
    id: "2",
    patientName: "Jane Smith",
    patientId: "2",
    doctorName: "Dr. Johnson",
    doctorId: "2",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take in the morning",
    status: "Active",
    createdAt: "2025-04-03",
    notes: [
      { id: "1", text: "Blood pressure to be monitored weekly.", date: "2025-04-03" }
    ]
  }
];

export default function PrescriptionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedPrescription = PRESCRIPTIONS.find(p => p.id === id);
    if (fetchedPrescription) {
      setPrescription(fetchedPrescription);
    } else {
      toast.error("Prescription not found");
      navigate("/prescriptions");
    }
  }, [id, navigate]);
  
  if (!prescription) {
    return (
      <div className="flex items-center justify-center h-48">
        <p>Loading prescription details...</p>
      </div>
    );
  }
  
  const handleDelete = () => {
    // In a real app, this would be an API call
    console.log("Deleting prescription:", id);
    toast.success("Prescription deleted successfully");
    navigate("/prescriptions");
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/prescriptions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Prescription Details</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to={`/prescriptions/${id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5" />
              Prescription Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Medication</p>
                <p className="font-medium">{prescription.medication}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Dosage</p>
                <p>{prescription.dosage}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Frequency</p>
                <p>{prescription.frequency}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Duration</p>
                <p>{prescription.duration}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Instructions</p>
                <p>{prescription.instructions}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(prescription.status)}`}>
                  {prescription.status}
                </span>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Created Date</p>
                <p>{prescription.createdAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient & Doctor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Patient</p>
              <p className="font-medium">{prescription.patientName}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto" 
                asChild
              >
                <Link to={`/patients/${prescription.patientId}`}>
                  View Patient Record
                </Link>
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Doctor</p>
              <p>{prescription.doctorName}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prescription.notes.length > 0 ? (
              <div className="space-y-4">
                {prescription.notes.map((note: any) => (
                  <div key={note.id} className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{note.date}</p>
                    </div>
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No notes available for this prescription</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Prescription</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this prescription? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
