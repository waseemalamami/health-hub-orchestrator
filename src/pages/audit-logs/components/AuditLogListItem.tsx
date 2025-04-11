
import React from "react";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  FileText,
  Shield,
  ShieldAlert,
  User
} from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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

interface AuditLogListItemProps {
  log: AuditLogType;
  onViewDetails: (log: AuditLogType) => void;
}

export function AuditLogListItem({ log, onViewDetails }: AuditLogListItemProps) {
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
    <TableRow>
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
                onClick={() => onViewDetails(log)}
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
  );
}
