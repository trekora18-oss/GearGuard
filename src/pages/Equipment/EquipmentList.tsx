import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Plus, Search, MoreHorizontal, Filter } from 'lucide-react';
import type { EquipmentStatus, Equipment } from '../../types';
import { Dialog } from '../../components/common/Dialog';
import EquipmentForm from './EquipmentForm';

export default function EquipmentList() {
    const { equipment } = useApp();
    const [searchTerm, setSearchTerm] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    const filteredEquipment = equipment.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: EquipmentStatus) => {
        switch (status) {
            case 'Operational': return 'success';
            case 'Down': return 'destructive';
            case 'Maintenance': return 'warning';
            default: return 'default';
        }
    };

    const getHealthColor = (score: number) => {
        if (score >= 80) return 'text-success';
        if (score >= 50) return 'text-warning';
        return 'text-destructive';
    };

    const handleEdit = (item: Equipment) => {
        setSelectedEquipment(item);
        setIsDialogOpen(true);
    };

    const handleCreate = () => {
        setSelectedEquipment(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Equipment Catalog</h1>
                    <p className="text-muted-foreground mt-1">Manage infrastructure assets and machines.</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> New Equipment
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Asset List</CardTitle>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                className="h-9 w-64 rounded-md border border-input bg-background pl-9 text-sm focus:ring-1 focus:ring-primary outline-none"
                                placeholder="Search assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="p-4">Name / Serial</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Health</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredEquipment.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No equipment found. <span role="img" aria-label="sad">🔍</span>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredEquipment.map((item) => (
                                        <tr key={item.id} className="hover:bg-muted/50 transition-colors group cursor-pointer" onClick={() => handleEdit(item)}>
                                            <td className="p-4">
                                                <div className="font-medium text-foreground">{item.name}</div>
                                                <div className="text-xs text-muted-foreground">{item.serialNumber}</div>
                                            </td>
                                            <td className="p-4">{item.category}</td>
                                            <td className="p-4">
                                                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <div className="w-full bg-secondary h-2 rounded-full max-w-[100px] mr-3 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${item.healthScore >= 80 ? 'bg-success' : item.healthScore >= 50 ? 'bg-warning' : 'bg-destructive'
                                                                }`}
                                                            style={{ width: `${item.healthScore}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-xs font-semibold ${getHealthColor(item.healthScore)}`}>{item.healthScore}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleEdit(item); }}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={selectedEquipment ? "Edit Equipment" : "Add New Equipment"}
                description={selectedEquipment ? "Modify equipment details." : "Register a new asset in the system."}
            >
                <EquipmentForm
                    initialData={selectedEquipment}
                    onClose={() => setIsDialogOpen(false)}
                />
            </Dialog>
        </div>
    );
}
