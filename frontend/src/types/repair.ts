import type { Device } from "./device";

export type RepairStatus = 'queue' | 'in_progress' | 'waiting_for_parts' | 'completed';

export interface Repair {
    id: number;
    device_id: number;
    description: string | null;
    status: RepairStatus;
    created_at: string;
    device: Device;
}