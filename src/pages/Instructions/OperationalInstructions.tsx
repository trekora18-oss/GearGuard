import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FileText, Download, Plus } from 'lucide-react';

const procedures = [
    { id: 1, title: 'Lathe Spindle Alignment', category: 'Mechanical', updated: '2 days ago' },
    { id: 2, title: 'CNC Coolant Flush Protocol', category: 'Fluid', updated: '1 week ago' },
    { id: 3, title: 'Hydraulic Press Safety Check', category: 'Safety', updated: '1 month ago' },
    { id: 4, title: 'Emergency Shutoff Testing', category: 'Safety', updated: '3 months ago' },
];

export default function OperationalInstructions() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Operational Instructions</h1>
                    <p className="text-muted-foreground mt-1">Standard Operating Procedures and Maintenance Guides.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Procedure
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {procedures.map(proc => (
                    <Card key={proc.id} className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center space-x-2">
                                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{proc.title}</CardTitle>
                                    <CardDescription>{proc.category} • Updated {proc.updated}</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Visual guide and checklist for {proc.title.toLowerCase()}. Follow strict safety protocols.
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
