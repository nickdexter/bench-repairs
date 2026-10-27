import { useEffect, useState } from 'react';
import { getDevices } from '../services/api';
import type { Device } from '../types/device';
import DevicesTable from '../components/DevicesTable';
import DeviceModal from '../components/DeviceModal';

export default function Devices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deviceToEdit, setDeviceToEdit] = useState<Device | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDevices = () => {
        getDevices()
            .then((data) => setDevices(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    if (loading) return <p className="p-6 text-sm text-gray-500">Loading devices...</p>;

    return (
        <div>
            <h1 className="text-xl font-bold">Devices</h1>
            <div className="py-6">
                <DevicesTable
                    devices={devices}
                    onAddClick={() => {
                        setDeviceToEdit(null); // Clear any edit state
                        setIsModalOpen(true);
                    }}
                    onDeleted={(deletedId) => {
                        setDevices(prevDevices => prevDevices.filter(d => d.id !== deletedId));
                    }}
                    onEditClick={(device) => {
                        setDeviceToEdit(device); // Set the device to edit
                        setIsModalOpen(true);   // Open the modal
                    }}
                />

                <DeviceModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setDeviceToEdit(null);
                    }}
                    onSuccess={fetchDevices}
                    deviceToEdit={deviceToEdit}
                />
            </div>
        </div>
    );
}