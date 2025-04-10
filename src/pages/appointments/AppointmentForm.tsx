
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Save, Search, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock doctor data
const doctors = [
  { id: "1", name: "Dr. Williams", specialization: "General Practice" },
  { id: "2", name: "Dr. Garcia", specialization: "Cardiology" },
  { id: "3", name: "Dr. Chen", specialization: "Pediatrics" },
  { id: "4", name: "Dr. Wilson", specialization: "Neurology" },
  { id: "5", name: "Dr. Anderson", specialization: "Orthopedics" },
];

// Mock patient data
const patients = [
  { id: "P001", name: "John Smith", email: "john.smith@example.com", phone: "1234567890" },
  { id: "P002", name: "Emily Johnson", email: "emily.johnson@example.com", phone: "2345678901" },
  { id: "P003", name: "Michael Brown", email: "michael.brown@example.com", phone: "3456789012" },
  { id: "P004", name: "Sarah Davis", email: "sarah.davis@example.com", phone: "4567890123" },
  { id: "P005", name: "David Wilson", email: "david.wilson@example.com", phone: "5678901234" }
];

// Mock appointment types
const appointmentTypes = [
  { id: "1", name: "Check-up" },
  { id: "2", name: "Follow-up" },
  { id: "3", name: "Consultation" },
  { id: "4", name: "Procedure" },
  { id: "5", name: "Emergency" }
];

// Mock appointment durations (minutes)
const appointmentDurations = [15, 30, 45, 60, 90, 120];

// Validation schema for appointment form
const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  doctorId: z.string().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.string().min(1, "Appointment type is required"),
  duration: z.coerce.number().min(15, "Duration is required"),
  notes: z.string().optional(),
  status: z.string().min(1, "Status is required")
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const mockAppointment = {
  id: "1",
  patientId: "P001",
  doctorId: "1",
  date: format(new Date(), "yyyy-MM-dd"),
  time: "09:30",
  type: "1", // ID of appointment type
  duration: 30,
  notes: "Regular check-up appointment",
  status: "Scheduled"
};

export default function AppointmentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  
  // Determine if we're editing an existing appointment
  const isEditing = Boolean(id);
  
  // Initialize the form with default values or values from the appointment being edited
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: isEditing ? mockAppointment : {
      patientId: "",
      doctorId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "",
      type: "",
      duration: 30,
      notes: "",
      status: "Scheduled"
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success(isEditing ? "Appointment updated successfully" : "Appointment scheduled successfully");
      
      // Navigate back to appointments list
      navigate("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error("Failed to save appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get patient name by ID
  const getPatientName = (id: string) => {
    const patient = patients.find(p => p.id === id);
    return patient ? patient.name : "Unknown Patient";
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(patientSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Edit Appointment" : "Schedule New Appointment"}
        </h1>
        <Button variant="outline" size="sm" onClick={() => navigate("/appointments")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appointments
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name="patientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input 
                                placeholder="Select patient" 
                                value={field.value ? getPatientName(field.value) : ""} 
                                readOnly 
                              />
                            </FormControl>
                            <Dialog open={isPatientDialogOpen} onOpenChange={setIsPatientDialogOpen}>
                              <DialogTrigger asChild>
                                <Button type="button" size="icon" variant="outline">
                                  <Search className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Select Patient</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <Input 
                                    placeholder="Search patients..." 
                                    value={patientSearchTerm}
                                    onChange={(e) => setPatientSearchTerm(e.target.value)}
                                    className="mb-2"
                                  />
                                  <div className="max-h-[300px] overflow-auto">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>ID</TableHead>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Contact</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {filteredPatients.map((patient) => (
                                          <TableRow 
                                            key={patient.id}
                                            className="cursor-pointer hover:bg-muted"
                                            onClick={() => {
                                              form.setValue("patientId", patient.id);
                                              setIsPatientDialogOpen(false);
                                            }}
                                          >
                                            <TableCell>{patient.id}</TableCell>
                                            <TableCell className="font-medium">{patient.name}</TableCell>
                                            <TableCell>{patient.phone}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="doctorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doctor</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select doctor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor.id} value={doctor.id}>
                                  {doctor.name} ({doctor.specialization})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input 
                                type="date" 
                                {...field} 
                                min={format(new Date(), "yyyy-MM-dd")} 
                              />
                              <Button type="button" size="icon" variant="outline">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {appointmentTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {appointmentDurations.map((duration) => (
                              <SelectItem key={duration} value={duration.toString()}>
                                {duration} minutes
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add any additional notes or instructions" 
                          className="resize-none h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Include any specific instructions or details about this appointment.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => navigate("/appointments")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : isEditing ? "Update Appointment" : "Schedule Appointment"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
