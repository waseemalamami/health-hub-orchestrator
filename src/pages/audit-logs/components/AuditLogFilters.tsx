
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function AuditLogFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">User</label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="nurse">Nurse</SelectItem>
            <SelectItem value="receptionist">Receptionist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Action Type</label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="view">View</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Resource</label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Resources</SelectItem>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="appointment">Appointment</SelectItem>
            <SelectItem value="prescription">Prescription</SelectItem>
            <SelectItem value="lab_request">Lab Request</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="role">Role</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-medium">Status</label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failure">Failure</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-1 md:col-span-4 flex justify-end gap-3">
        <Button variant="outline">Reset</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
}
