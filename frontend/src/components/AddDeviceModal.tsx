import { useState } from 'react';
import { createDevice } from '../services/api';
import type { DeviceStatus } from '../types/device';
import { useToast } from '../context/ToastContext';

interface AddDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeviceAdded: () => void;
}

export default function AddDeviceModal({ isOpen, onClose, onDeviceAdded }: AddDeviceModalProps) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [status, setStatus] = useState<DeviceStatus>('acquired');
    const [purchasePrice, setPurchasePrice] = useState('0.00');
    const [soldPrice, setSoldPrice] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { showToast } = useToast();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await createDevice({
                name,
                category,
                serial_number: serialNumber || null,
                status,
                purchase_price: purchasePrice || '0.00',
                sold_price: soldPrice || null,
            });
            showToast('Device successfully created!', 'success');
            onDeviceAdded();
            onClose();
            // Reset form
            setName('');
            setCategory('');
            setSerialNumber('');
            setStatus('acquired');
            setPurchasePrice('0.00');
            setSoldPrice('');
        } catch (err: any) {
            setError(err.message || 'Failed to create device');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Add New Device</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
                </div>

                {error && <div className="mb-4 p-2 text-sm text-red-700 bg-red-50 rounded border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Device Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g. Game Boy Color"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g. Handheld"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Serial Number (Optional)</label>
                        <input
                            type="text"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g. GBC-12345"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as DeviceStatus)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="acquired">Acquired</option>
                            <option value="broken">Broken</option>
                            <option value="in_repair">In Repair</option>
                            <option value="refurbished">Refurbished</option>
                            <option value="listed">Listed</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Purchase Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            required
                            value={purchasePrice}
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Add Device'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}