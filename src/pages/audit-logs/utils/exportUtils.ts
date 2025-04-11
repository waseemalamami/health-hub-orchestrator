
import { saveAs } from 'file-saver';

interface AuditLog {
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
}

/**
 * Exports audit logs to a CSV file
 */
export const exportLogsToCSV = (logs: AuditLog[]): void => {
  // Create CSV headers
  const headers = [
    'ID',
    'Timestamp', 
    'User', 
    'User Role', 
    'Action', 
    'Resource', 
    'Resource ID', 
    'Status', 
    'Category', 
    'IP Address'
  ];
  
  // Convert logs to CSV rows
  const rows = logs.map(log => [
    log.id,
    new Date(log.timestamp).toLocaleString(),
    log.user,
    log.userRole,
    log.action,
    log.resource,
    log.resourceId || '',
    log.status,
    log.category,
    log.ipAddress
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create Blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `audit-logs-export-${new Date().toISOString().slice(0, 10)}.csv`);
};

/**
 * Exports audit logs to a JSON file
 */
export const exportLogsToJSON = (logs: AuditLog[]): void => {
  const jsonContent = JSON.stringify(logs, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  saveAs(blob, `audit-logs-export-${new Date().toISOString().slice(0, 10)}.json`);
};
