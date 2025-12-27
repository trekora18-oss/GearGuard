import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import type { RequestStatus, MaintenanceRequest } from '../../types';
import { Dialog } from '../../components/common/Dialog';
import RequestForm from './RequestForm';

const statuses: RequestStatus[] = ['New Request', 'In Progress', 'Repaired', 'Scrap'];

export default function RequestBoard() {
    const { requests, equipment } = useApp();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'text-destructive';
            case 'High': return 'text-warning';
            default: return 'text-muted-foreground';
        }
    };

    const handleEdit = (request: MaintenanceRequest) => {
        setSelectedRequest(request);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedRequest(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maintenance Pipeline</h1>
                    <p className="text-muted-foreground mt-1">Track and manage maintenance requests.</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> New Request
                </Button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex space-x-4 min-w-[1000px] h-full pb-4">
                    {statuses.map((status) => {
                        const statusRequests = requests.filter(r => r.status === status);
                        return (
                            <div key={status} className="w-80 flex flex-col bg-muted/40 rounded-lg border border-border">
                                <div className="p-4 border-b border-border font-semibold flex justify-between items-center">
                                    <span>{status}</span>
                                    <Badge variant="secondary">{statusRequests.length}</Badge>
                                </div>
                                <div className="p-4 space-y-3 overflow-y-auto flex-1 max-h-[calc(100vh-250px)]">
                                    {statusRequests.map(req => {
                                        const eq = equipment.find(e => e.id === req.equipmentId);
                                        return (
                                            <Card key={req.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleEdit(req)}>
                                                <CardContent className="p-4 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <Badge variant="outline" className="text-[10px]">{req.id}</Badge>
                                                        <AlertCircle className={`h-4 w-4 ${getPriorityColor(req.priority)}`} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-sm line-clamp-2">{req.subject}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1">{eq?.name}</p>
                                                    </div>
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {new Date(req.requestDate).toLocaleDateString()}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={selectedRequest ? "Edit Request" : "New Maintenance Request"}
            >
                <RequestForm
                    initialData={selectedRequest}
                    onClose={() => setIsDialogOpen(false)}
                />
            </Dialog>
        </div>
    );
}
