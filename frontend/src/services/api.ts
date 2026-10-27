import type { ApiResponse } from "../types/api";
import type { Device } from "../types/device";
import type { Part } from "../types/part";
import type { Repair } from "../types/repair";

const API_BASE = '/api';

// DRY helper to handle fetch responses and envelope validation
async function handleResponse<T>(response: Response): Promise<T> {
    const result: ApiResponse<T> = await response.json();
    if (result.success && result.data !== undefined) {
        return result.data;
    }
    throw new Error(result.error?.message || 'API request failed');
}

// ==========================
// DEVICES API
// ==========================

export async function getDevices(): Promise<Device[]> {
    const res = await fetch(`${API_BASE}/devices`);
    return handleResponse<Device[]>(res);
}

export async function getDeviceById(id: number): Promise<Device> {
    const res = await fetch(`${API_BASE}/devices/${id}`);
    return handleResponse<Device>(res);
}

export async function createDevice(data: Omit<Device, 'id' | 'created_at'>): Promise<Device> {
    const res = await fetch(`${API_BASE}/devices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Device>(res);
}

export async function updateDevice(id: number, data: Partial<Device>): Promise<Device> {
    const res = await fetch(`${API_BASE}/devices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Device>(res);
}

export async function deleteDevice(id: number | string): Promise<void> {
    const res = await fetch(`${API_BASE}/devices/${id}`, {
        method: 'DELETE',
    });
    await handleResponse<null>(res);
}

// ==========================
// REPAIRS API
// ==========================

export async function getRepairs(): Promise<Repair[]> {
    const res = await fetch(`${API_BASE}/repairs`);
    return handleResponse<Repair[]>(res);
}

export async function getRepairById(id: number): Promise<Repair> {
    const res = await fetch(`${API_BASE}/repairs/${id}`);
    return handleResponse<Repair>(res);
}

export async function createRepair(data: Omit<Repair, 'id' | 'created_at'>): Promise<Repair> {
    const res = await fetch(`${API_BASE}/repairs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Repair>(res);
}

export async function updateRepair(id: number, data: Partial<Repair>): Promise<Repair> {
    const res = await fetch(`${API_BASE}/repairs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Repair>(res);
}

export async function deleteRepair(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/repairs/${id}`, {
        method: 'DELETE',
    });
    await handleResponse<null>(res);
}

// ==========================
// PARTS API
// ==========================

export async function getParts(): Promise<Part[]> {
    const res = await fetch(`${API_BASE}/parts`);
    return handleResponse<Part[]>(res);
}

export async function createPart(data: Omit<Part, 'id' | 'created_at'>): Promise<Part> {
    const res = await fetch(`${API_BASE}/parts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Part>(res);
}

export async function updatePart(id: number, data: Partial<Part>): Promise<Part> {
    const res = await fetch(`${API_BASE}/parts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse<Part>(res);
}

export async function deletePart(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/parts/${id}`, {
        method: 'DELETE',
    });
    await handleResponse<null>(res);
}