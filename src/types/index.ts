export type EquipmentStatus = 'Operational' | 'Down' | 'Maintenance';

export interface Equipment {
    id: string;
    name: string;
    serialNumber: string;
    category: string;
    location: string;
    assignedCompany: string;
    status: EquipmentStatus;
    healthScore: number; // 0-100
    image?: string;
}

export type RequestStatus = 'New Request' | 'In Progress' | 'Repaired' | 'Scrap';
export type MaintenanceType = 'Corrective' | 'Preventive';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MaintenanceRequest {
    id: string;
    subject: string;
    equipmentId: string;
    category: string;
    requestDate: string; // ISO date string
    scheduledDate?: string;
    duration?: number; // in hours
    type: MaintenanceType;
    status: RequestStatus;
    priority: Priority;
    description?: string;
    createdBy: string;
    assignedTechnicianId?: string;
}

export interface Technician {
    id: string;
    name: string;
    teamId: string;
    email: string;
    specialization: string;
    avatar?: string;
    utilization: number; // 0-100
}

export interface Team {
    id: string;
    name: string;
    leadId?: string;
}
