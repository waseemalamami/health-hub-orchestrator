
import { useState } from "react";
import { Plus, Edit, Trash, Check, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock roles data
const ROLES_DATA = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access",
    usersCount: 3,
    permissions: [
      { module: "Patients", create: true, read: true, update: true, delete: true },
      { module: "Appointments", create: true, read: true, update: true, delete: true },
      { module: "Prescriptions", create: true, read: true, update: true, delete: true },
      { module: "Lab Requests", create: true, read: true, update: true, delete: true },
      { module: "Invoices", create: true, read: true, update: true, delete: true },
      { module: "Users", create: true, read: true, update: true, delete: true },
      { module: "Roles", create: true, read: true, update: true, delete: true },
      { module: "Settings", create: true, read: true, update: true, delete: true },
    ]
  },
  {
    id: "2",
    name: "Doctor",
    description: "Medical staff with patient care responsibilities",
    usersCount: 8,
    permissions: [
      { module: "Patients", create: true, read: true, update: true, delete: false },
      { module: "Appointments", create: true, read: true, update: true, delete: true },
      { module: "Prescriptions", create: true, read: true, update: true, delete: false },
      { module: "Lab Requests", create: true, read: true, update: true, delete: false },
      { module: "Invoices", create: false, read: true, update: false, delete: false },
      { module: "Users", create: false, read: false, update: false, delete: false },
      { module: "Roles", create: false, read: false, update: false, delete: false },
      { module: "Settings", create: false, read: false, update: false, delete: false },
    ]
  },
  {
    id: "3",
    name: "Nurse",
    description: "Clinical support staff",
    usersCount: 12,
    permissions: [
      { module: "Patients", create: false, read: true, update: true, delete: false },
      { module: "Appointments", create: true, read: true, update: true, delete: false },
      { module: "Prescriptions", create: false, read: true, update: false, delete: false },
      { module: "Lab Requests", create: true, read: true, update: true, delete: false },
      { module: "Invoices", create: false, read: true, update: false, delete: false },
      { module: "Users", create: false, read: false, update: false, delete: false },
      { module: "Roles", create: false, read: false, update: false, delete: false },
      { module: "Settings", create: false, read: false, update: false, delete: false },
    ]
  },
  {
    id: "4",
    name: "Receptionist",
    description: "Front desk and administration staff",
    usersCount: 5,
    permissions: [
      { module: "Patients", create: true, read: true, update: false, delete: false },
      { module: "Appointments", create: true, read: true, update: true, delete: false },
      { module: "Prescriptions", create: false, read: true, update: false, delete: false },
      { module: "Lab Requests", create: false, read: true, update: false, delete: false },
      { module: "Invoices", create: true, read: true, update: true, delete: false },
      { module: "Users", create: false, read: false, update: false, delete: false },
      { module: "Roles", create: false, read: false, update: false, delete: false },
      { module: "Settings", create: false, read: false, update: false, delete: false },
    ]
  }
];

export default function RolesPage() {
  const [roles, setRoles] = useState(ROLES_DATA);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  const viewRoleDetails = (role: any) => {
    setSelectedRole(role);
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roles & Permissions</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Roles List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.usersCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewRoleDetails(role)}
                        >
                          View Permissions
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              {selectedRole?.name} - Permissions
            </DialogTitle>
            <DialogDescription>
              View and manage permissions for this role.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead className="text-center">Create</TableHead>
                    <TableHead className="text-center">Read</TableHead>
                    <TableHead className="text-center">Update</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRole.permissions.map((permission: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{permission.module}</TableCell>
                      <TableCell className="text-center">
                        {permission.create ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {permission.read ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {permission.update ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {permission.delete ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
