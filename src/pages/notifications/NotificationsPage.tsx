
import { useState } from "react";
import { Check, Bell, Clock, AlertCircle, Calendar } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock notification data
const NOTIFICATIONS_DATA = [
  {
    id: "1",
    title: "New appointment scheduled",
    message: "Appointment scheduled with John Doe at 2:00 PM tomorrow",
    type: "appointment",
    isRead: false,
    date: "2025-04-10 09:15 AM"
  },
  {
    id: "2",
    title: "Lab results ready",
    message: "Lab results for patient Jane Smith are now available",
    type: "lab",
    isRead: false,
    date: "2025-04-09 03:45 PM"
  },
  {
    id: "3",
    title: "Prescription renewal",
    message: "Robert Brown requested a prescription renewal",
    type: "prescription",
    isRead: true,
    date: "2025-04-08 11:20 AM"
  },
  {
    id: "4",
    title: "Emergency alert",
    message: "Emergency room needs assistance immediately",
    type: "alert",
    isRead: true,
    date: "2025-04-07 08:30 PM"
  },
  {
    id: "5",
    title: "System maintenance",
    message: "Scheduled system maintenance on April 15, 2025",
    type: "system",
    isRead: true,
    date: "2025-04-05 02:15 PM"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter notifications based on selected filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "read" && notification.isRead) || 
      (statusFilter === "unread" && !notification.isRead);
    
    return matchesType && matchesStatus;
  });

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "lab":
        return <Clock className="h-4 w-4 text-purple-500" />;
      case "prescription":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-[180px]">
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="appointment">Appointments</SelectItem>
                  <SelectItem value="lab">Lab Results</SelectItem>
                  <SelectItem value="prescription">Prescriptions</SelectItem>
                  <SelectItem value="alert">Alerts</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Notification</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No notifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TableRow 
                      key={notification.id}
                      className={notification.isRead ? "" : "bg-muted/20"}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">{notification.message}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{notification.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${notification.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                          {notification.isRead ? 'Read' : 'Unread'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {!notification.isRead && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
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
