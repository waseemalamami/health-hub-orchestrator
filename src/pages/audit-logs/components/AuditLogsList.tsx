
import { useState } from "react";
import { Download } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AuditLogDetails } from "./AuditLogDetails";
import { AuditLogListItem } from "./AuditLogListItem";
import { mockAuditLogs } from "../mockData";
import { exportLogsToCSV, exportLogsToJSON } from "../utils/exportUtils";

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

  const handleExport = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      exportLogsToCSV(filteredLogs as AuditLogType[]);
    } else {
      exportLogsToJSON(filteredLogs as AuditLogType[]);
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
                <AuditLogListItem 
                  key={log.id} 
                  log={log as AuditLogType} 
                  onViewDetails={setSelectedLog} 
                />
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
