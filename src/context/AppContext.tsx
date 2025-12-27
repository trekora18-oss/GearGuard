import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Equipment, MaintenanceRequest, Technician, Team } from '../types';

interface AppContextType {
    equipment: Equipment[];
    requests: MaintenanceRequest[];
    technicians: Technician[];
    teams: Team[];
    addEquipment: (item: Equipment) => void;
    updateEquipment: (item: Equipment) => void;
    deleteEquipment: (id: string) => void;
    addRequest: (request: MaintenanceRequest) => void;
    updateRequest: (request: MaintenanceRequest) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialEquipment: Equipment[] = [
    {
        id: '1',
        name: 'Industrial Lathe M-1',
        serialNumber: 'LATHE-2023-001',
        category: 'Machinery',
        location: 'Zone A',
        assignedCompany: 'GearCorp',
        status: 'Operational',
        healthScore: 88,
    },
    {
        id: '2',
        name: 'CNC Milling Unit X4',
        serialNumber: 'CNC-2022-X4',
        category: 'Machinery',
        location: 'Zone B',
        assignedCompany: 'GearCorp',
        status: 'Maintenance',
        healthScore: 45,
    },
    {
        id: '3',
        name: 'Hydraulic Press HP-500',
        serialNumber: 'HP-500-002',
        category: 'Hydraulics',
        location: 'Zone A',
        assignedCompany: 'GearCorp',
        status: 'Down',
        healthScore: 12,
    },
];

const initialRequests: MaintenanceRequest[] = [
    {
        id: 'REQ-101',
        subject: 'Lathe Alignment Issue',
        equipmentId: '1',
        category: 'Mechanical',
        requestDate: new Date().toISOString(),
        type: 'Corrective',
        status: 'New Request',
        priority: 'Medium',
        description: 'Spindle seems misaligned causing vibration.',
        createdBy: 'Mitchell Admin',
    },
    {
        id: 'REQ-102',
        subject: 'CNC Coolant Leak',
        equipmentId: '2',
        category: 'Fluid',
        requestDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        type: 'Corrective',
        status: 'In Progress',
        priority: 'High',
        description: 'Coolant leaking from main tank.',
        createdBy: 'Mitchell Admin',
        assignedTechnicianId: 'TECH-1',
    }
];

const initialTeams: Team[] = [
    { id: 'TEAM-1', name: 'Internal Maintenance', leadId: 'TECH-1' },
    { id: 'TEAM-2', name: 'Metrology', leadId: 'TECH-2' },
];

const initialTechnicians: Technician[] = [
    { id: 'TECH-1', name: 'Anas Makari', teamId: 'TEAM-1', email: 'anas@gearcorp.com', specialization: 'Mechanical', utilization: 85 },
    { id: 'TECH-2', name: 'Maggie Davidson', teamId: 'TEAM-2', email: 'maggie@gearcorp.com', specialization: 'Calibration', utilization: 40 },
];

export function AppProvider({ children }: { children: ReactNode }) {
    const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
    const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
    const [technicians] = useState<Technician[]>(initialTechnicians);
    const [teams] = useState<Team[]>(initialTeams);

    const addEquipment = (item: Equipment) => {
        setEquipment([...equipment, item]);
    };

    const updateEquipment = (item: Equipment) => {
        setEquipment(equipment.map((e) => (e.id === item.id ? item : e)));
    };

    const deleteEquipment = (id: string) => {
        setEquipment(equipment.filter((e) => e.id !== id));
    };

    const addRequest = (request: MaintenanceRequest) => {
        setRequests([...requests, request]);
    };

    const updateRequest = (request: MaintenanceRequest) => {
        setRequests(requests.map((r) => (r.id === request.id ? request : r)));
    };

    return (
        <AppContext.Provider value={{
            equipment,
            requests,
            technicians,
            teams,
            addEquipment,
            updateEquipment,
            deleteEquipment,
            addRequest,
            updateRequest
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
