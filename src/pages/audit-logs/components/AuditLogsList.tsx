import { useState } from "react";
import { 
  CircleAlert, 
  CircleCheck, 
  Clock, 
  Download, 
  FileText, 
  Shield, 
  ShieldAlert, 
  User
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AuditLogDetails } from "./AuditLogDetails";
import { Badge } from "@/components/ui/badge";
import { mockAuditLogs } from "../mockData";

interface AuditLogType {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  status: "success" | "failure" | "warning";
  category: "user" | "system" | "security" | "error";
  ipAddress: string;
}

interface AuditLogsListProps {
  tab: string;
  searchQuery: string;
}

export function AuditLogsList({ tab, searchQuery }: AuditLogsListProps) {
  const [selectedLog, setSelectedLog] = useState<AuditLogType | null>(null);

  // Filter logs based on tab and search query
  const filteredLogs = mockAuditLogs.filter(log => {
    // Filter by tab
    if (tab !== "all" && log.category !== tab && 
        !(tab === "errors" && log.status === "failure")) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.resource.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CircleCheck className="h-4 w-4 text-success" />;
      case "failure":
        return <CircleAlert className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4 text-accent" />;
      case "user":
        return <User className="h-4 w-4 text-primary" />;
      case "error":
        return <ShieldAlert className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div>
      {selectedLog ? (
        <div className="mb-6">
          <AuditLogDetails log={selectedLog} onClose={() => setSelectedLog(null)} />
        </div>
      ) : null}
      
      <div className="bg-card rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px] text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-medium">{log.user}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({log.userRole})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getCategoryIcon(log.category)}
                      <span>{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {log.resource} {log.resourceId ? `#${log.resourceId}` : ""}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(log.status)}
                      <span className="capitalize">{log.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7"
                            onClick={() => setSelectedLog(log as AuditLogType)}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View log details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No logs found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="py-3 px-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <b>{filteredLogs.length}</b> of <b>{mockAuditLogs.length}</b> logs
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
