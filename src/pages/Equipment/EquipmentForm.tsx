import { useState, useEffect } from 'react';
import type { Equipment, EquipmentStatus } from '../../types';
import { Button } from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

interface EquipmentFormProps {
    initialData?: Equipment | null;
    onClose: () => void;
}

export default function EquipmentForm({ initialData, onClose }: EquipmentFormProps) {
    const { addEquipment, updateEquipment } = useApp();

    const [formData, setFormData] = useState<Partial<Equipment>>({
        name: '',
        serialNumber: '',
        category: '',
        location: '',
        assignedCompany: 'GearGuard Inc.',
        status: 'Operational',
        healthScore: 100,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.serialNumber) return; // Basic validation

        const equipmentData = {
            id: initialData?.id || crypto.randomUUID(),
            ...formData,
        } as Equipment;

        if (initialData) {
            updateEquipment(equipmentData);
        } else {
            addEquipment(equipmentData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Equipment Name</label>
                    <input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="e.g. Lathe M-1"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Serial Number</label>
                    <input
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-input ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. SN-12345"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Category</label>
                    <input
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-input ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. Machinery"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Location</label>
                    <input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-input ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. Zone A"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as EquipmentStatus })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="Operational">Operational</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Healh Score (%)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.healthScore}
                        onChange={(e) => setFormData({ ...formData, healthScore: Number(e.target.value) })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm border-input ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">{initialData ? 'Update Equipment' : 'Create Equipment'}</Button>
            </div>
        </form>
    );
}
