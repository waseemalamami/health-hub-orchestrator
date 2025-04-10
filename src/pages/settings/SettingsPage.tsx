
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Building, 
  Globe, 
  LockKeyhole, 
  Mail, 
  Settings, 
  Shield, 
  User, 
  UserCog 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GeneralSettings } from "./components/GeneralSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { NotificationSettings } from "./components/NotificationSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your system settings and preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-12 md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={18} className="text-primary" />
              Settings
            </CardTitle>
            <CardDescription>
              Configure system settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              <Button 
                variant={activeTab === "general" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2" 
                onClick={() => setActiveTab("general")}
              >
                <Building size={16} />
                General
              </Button>
              <Button 
                variant={activeTab === "security" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("security")}
              >
                <Shield size={16} />
                Security
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={16} />
                Notifications
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User size={16} />
                Account
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <UserCog size={16} />
                Preferences
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Mail size={16} />
                Email
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Globe size={16} />
                Integrations
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LockKeyhole size={16} />
                API Access
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-12 md:col-span-9">
          <CardContent className="p-6">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
