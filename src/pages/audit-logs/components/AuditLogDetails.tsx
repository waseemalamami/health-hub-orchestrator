
import { 
  AlertTriangle, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  Globe, 
  Laptop, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AuditLogDetailsProps {
  log: {
    id: string;
    timestamp: string;
    user: string;
    userRole: string;
    action: string;
    resource: string;
    resourceId: string;
    details: string;
    status: "success" | "failure" | "warning";
    category: string;
    ipAddress: string;
  };
  onClose: () => void;
}

export function AuditLogDetails({ log, onClose }: AuditLogDetailsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg">Audit Log Details</CardTitle>
          </div>
          <Badge 
            variant={
              log.status === "success" ? "default" : 
              log.status === "failure" ? "destructive" : "outline"
            }
            className="capitalize"
          >
            {log.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Log ID
              </h3>
              <p className="font-mono text-sm">{log.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Timestamp
              </h3>
              <p>{new Date(log.timestamp).toLocaleString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <User className="h-4 w-4" /> User
              </h3>
              <p>{log.user} <span className="text-sm text-muted-foreground">({log.userRole})</span></p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Action
              </h3>
              <p>{log.action}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Resource
              </h3>
              <p>{log.resource} {log.resourceId ? `#${log.resourceId}` : ""}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <Globe className="h-4 w-4" /> IP Address
              </h3>
              <p className="font-mono text-sm">{log.ipAddress}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <Laptop className="h-4 w-4" /> User Agent
              </h3>
              <p className="text-sm">Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Details
              </h3>
              <ScrollArea className="h-36 rounded-md border p-3">
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {log.details}
                </pre>
              </ScrollArea>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
