
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { FileText, Filter, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { AuditLogsList } from "./components/AuditLogsList";
import { AuditLogFilters } from "./components/AuditLogFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { exportLogsToCSV, exportLogsToJSON } from "./utils/exportUtils";

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Audit Logs</h1>
          <p className="text-muted-foreground">Track and review system activities</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1.5">
              <Download size={16} />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => exportLogsToCSV([])}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportLogsToJSON([])}>
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="mb-6">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Activity Log
            </CardTitle>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <Select defaultValue="30">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        {showFilters && (
          <CardContent className="py-3 border-t">
            <AuditLogFilters />
          </CardContent>
        )}
      </Card>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="user">User Actions</TabsTrigger>
          <TabsTrigger value="system">System Events</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>
        
        <Separator className="my-4" />
        
        <TabsContent value="all" className="pt-2">
          <AuditLogsList tab="all" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="user" className="pt-2">
          <AuditLogsList tab="user" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="system" className="pt-2">
          <AuditLogsList tab="system" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="security" className="pt-2">
          <AuditLogsList tab="security" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="errors" className="pt-2">
          <AuditLogsList tab="errors" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
