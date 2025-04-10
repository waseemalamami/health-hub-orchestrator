
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function TopBar() {
  const { user } = useAuth();

  return (
    <div className="h-16 border-b flex items-center justify-between px-6 bg-background">
      <div className="flex items-center gap-4 w-full max-w-md">
        <Search className="text-muted-foreground" size={20} />
        <Input 
          placeholder="Search patients, appointments..." 
          className="h-9 md:w-[300px] lg:w-[400px]" 
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="font-medium text-sm hidden md:block">
            <span>Welcome, </span>
            <span className="text-accent">{user?.name}</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
            {user?.name.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
