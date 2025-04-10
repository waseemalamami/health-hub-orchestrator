
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function SecuritySettings() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [loginAttempts, setLoginAttempts] = useState(5);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [logFailedLogins, setLogFailedLogins] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState("90");
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    console.log("Saving security settings...");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure security policies and authentication settings
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Password Policy</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Minimum Password Length: {passwordLength} characters</Label>
          </div>
          <Slider 
            defaultValue={[passwordLength]} 
            min={8} 
            max={16} 
            step={1} 
            onValueChange={(values) => setPasswordLength(values[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="passwordExpiry">Password Expiration</Label>
          <Select value={passwordExpiry} onValueChange={setPasswordExpiry}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Every 30 days</SelectItem>
              <SelectItem value="60">Every 60 days</SelectItem>
              <SelectItem value="90">Every 90 days</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label>Password complexity requirements</Label>
            <div className="text-sm text-muted-foreground">
              Require uppercase, lowercase, numbers and special characters
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Authentication Settings</h3>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="mfa">Multi-Factor Authentication</Label>
            <div className="text-sm text-muted-foreground">
              Require two-factor authentication for all users
            </div>
          </div>
          <Switch
            id="mfa"
            checked={mfaEnabled}
            onCheckedChange={setMfaEnabled}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Maximum Login Attempts: {loginAttempts}</Label>
          </div>
          <Slider 
            defaultValue={[loginAttempts]} 
            min={3} 
            max={10} 
            step={1} 
            onValueChange={(values) => setLoginAttempts(values[0])}
          />
          <p className="text-sm text-muted-foreground">
            Account will be locked after {loginAttempts} failed attempts
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Session Timeout: {sessionTimeout} minutes</Label>
          </div>
          <Slider 
            defaultValue={[sessionTimeout]} 
            min={5} 
            max={60} 
            step={5} 
            onValueChange={(values) => setSessionTimeout(values[0])}
          />
          <p className="text-sm text-muted-foreground">
            Users will be logged out after {sessionTimeout} minutes of inactivity
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Audit & Logging</h3>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label>Log failed login attempts</Label>
            <div className="text-sm text-muted-foreground">
              Record all failed login attempts in the audit log
            </div>
          </div>
          <Switch
            checked={logFailedLogins}
            onCheckedChange={setLogFailedLogins}
          />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label>Log sensitive data access</Label>
            <div className="text-sm text-muted-foreground">
              Record when users access sensitive patient data
            </div>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
