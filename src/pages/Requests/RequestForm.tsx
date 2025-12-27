import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Button';
import type { MaintenanceRequest, Priority, MaintenanceType } from '../../types';

interface RequestFormProps {
    initialData?: MaintenanceRequest | null;
    onClose: () => void;
}

export default function RequestForm({ initialData, onClose }: RequestFormProps) {
    const { addRequest, updateRequest, equipment } = useApp();

    const [formData, setFormData] = useState<Partial<MaintenanceRequest>>({
        subject: '',
        equipmentId: '',
        priority: 'Medium',
        type: 'Corrective',
        description: '',
        status: 'New Request',
        createdBy: 'Mitchell Admin',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject || !formData.equipmentId) return;

        const requestData = {
            id: initialData?.id || crypto.randomUUID(),
            requestDate: initialData?.requestDate || new Date().toISOString(),
            ...formData,
        } as MaintenanceRequest;

        if (initialData) {
            updateRequest(requestData);
        } else {
            addRequest(requestData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Subject</label>
                <input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g. Motor Failure"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Equipment</label>
                    <select
                        value={formData.equipmentId}
                        onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="">Select Equipment</option>
                        {equipment.map(eq => (
                            <option key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as MaintenanceType })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="Corrective">Corrective</option>
                        <option value="Preventive">Preventive</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Describe the issue..."
                />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">{initialData ? 'Update Request' : 'Submit Request'}</Button>
            </div>
        </form>
    );
}
