
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appointmentReminders, setAppointmentReminders] = useState({
    email: true,
    sms: false,
    days: "1"
  });
  const [patientPortalNotifications, setPatientPortalNotifications] = useState(true);
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving notification settings...");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure how notifications are sent to staff and patients
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Methods</h3>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Send notifications via email
            </div>
          </div>
          <Switch
            id="emailNotifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="smsNotifications">SMS Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Send notifications via text message
            </div>
          </div>
          <Switch
            id="smsNotifications"
            checked={smsNotifications}
            onCheckedChange={setSmsNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="patientPortalNotifications">Patient Portal Notifications</Label>
            <div className="text-sm text-muted-foreground">
              Send notifications through the patient portal
            </div>
          </div>
          <Switch
            id="patientPortalNotifications"
            checked={patientPortalNotifications}
            onCheckedChange={setPatientPortalNotifications}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Appointment Reminders</h3>
        
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="appointmentEmail" 
                checked={appointmentReminders.email}
                onCheckedChange={(checked) => 
                  setAppointmentReminders({...appointmentReminders, email: !!checked})
                }
              />
              <Label htmlFor="appointmentEmail">Send email reminders</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="appointmentSms" 
                checked={appointmentReminders.sms}
                onCheckedChange={(checked) => 
                  setAppointmentReminders({...appointmentReminders, sms: !!checked})
                }
              />
              <Label htmlFor="appointmentSms">Send SMS reminders</Label>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reminderDays">Send reminders</Label>
              <Select 
                value={appointmentReminders.days}
                onValueChange={(value) => 
                  setAppointmentReminders({...appointmentReminders, days: value})
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="2">2 days before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                  <SelectItem value="7">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Staff Notifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>On new appointment:</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyDoctor" />
                <Label htmlFor="notifyDoctor">Notify assigned doctor</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyNurse" defaultChecked />
                <Label htmlFor="notifyNurse">Notify department nurse</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyReception" defaultChecked />
                <Label htmlFor="notifyReception">Notify reception</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>On test results:</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyDoctorResults" defaultChecked />
                <Label htmlFor="notifyDoctorResults">Notify ordering doctor</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyPatientResults" />
                <Label htmlFor="notifyPatientResults">Notify patient</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="notifyAbnormal" defaultChecked />
                <Label htmlFor="notifyAbnormal">Priority for abnormal results</Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emailTemplate">Email Template Directory</Label>
          <Input
            id="emailTemplate"
            defaultValue="/templates/email/"
          />
          <p className="text-sm text-muted-foreground">
            Directory where email templates are stored
          </p>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
