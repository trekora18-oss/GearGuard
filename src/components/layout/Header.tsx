import { Bell, Search, User } from 'lucide-react';
import { Button } from '../common/Button';

export function Header() {
    return (
        <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
            <div className="flex items-center flex-1">
                <div className="relative w-64">
                    {/* Search placeholder */}
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search equipment, requests..."
                        className="w-full pl-9 h-9 rounded-md border border-input bg-background/50 text-sm outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                        <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="text-sm">
                        <p className="font-medium leading-none">Mitchell Admin</p>
                        <p className="text-xs text-muted-foreground">Manager</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
