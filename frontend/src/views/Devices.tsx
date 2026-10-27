import { useEffect, useState } from 'react';
import { getDevices } from '../services/api';
import type { Device } from '../types/device';
import DevicesTable from '../components/DevicesTable';
import AddDeviceModal from '../components/AddDeviceModal';

export default function Devices() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const fetchDevices = () => {
        getDevices()
            .then((data) => setDevices(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    if (loading) return <p className="p-6">Loading devices...</p>;

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900">Devices</h1>
            </div>

            <div className="max-w-7xl mx-auto mt-4">
                <DevicesTable devices={devices} onAddClick={() => setIsAddModalOpen(true)} />
            </div>

            <AddDeviceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onDeviceAdded={fetchDevices}
            />
        </div>
    );
}