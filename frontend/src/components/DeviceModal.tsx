import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Device, DeviceStatus } from '../types/device';
import { createDevice, updateDevice } from '../services/api';
import { useToast } from '../context/ToastContext';

interface DeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    deviceToEdit?: Device | null;
}

const CATEGORY_OPTIONS = ['Console', 'Handheld', 'Controller', 'Accessory'];

export default function DeviceModal({ isOpen, onClose, onSuccess, deviceToEdit }: DeviceModalProps) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [category, setCategory] = useState<string>(CATEGORY_OPTIONS[0]);
    const [serialNumber, setSerialNumber] = useState('');
    const [status, setStatus] = useState<DeviceStatus>('acquired');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [soldPrice, setSoldPrice] = useState('');

    // Whenever deviceToEdit changes (or modal opens), prefill form if editing
    useEffect(() => {
        if (deviceToEdit) {
            setName(deviceToEdit.name);
            setCategory(deviceToEdit.category);
            setSerialNumber(deviceToEdit.serial_number || '');
            setStatus(deviceToEdit.status);
            setPurchasePrice(deviceToEdit.purchase_price.toString());
            setSoldPrice(deviceToEdit.sold_price !== null && deviceToEdit.sold_price !== undefined ? deviceToEdit.sold_price.toString() : '');
        } else {
            // Reset to defaults for "Add" mode
            setName('');
            setCategory(CATEGORY_OPTIONS[0]);
            setSerialNumber('');
            setStatus('acquired');
            setPurchasePrice('');
            setSoldPrice('');
        }
    }, [deviceToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            category,
            serial_number: serialNumber.trim() || null,
            status,
            purchase_price: Number(purchasePrice),
            sold_price: soldPrice ? Number(soldPrice) : null,
        };

        try {
            if (deviceToEdit) {
                await updateDevice(deviceToEdit.id, payload);
                showToast(`Updated ${name} successfully`, 'success');
            } else {
                await createDevice(payload);
                showToast(`Created ${name} successfully`, 'success');
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            showToast(err.message || 'Failed to save device', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 bg-black/50" />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mb-4">
                            {deviceToEdit ? 'Edit Device' : 'Add New Device'}
                        </Dialog.Title>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Serial Number (Optional)</label>
                                <input
                                    type="text"
                                    value={serialNumber}
                                    onChange={(e) => setSerialNumber(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as DeviceStatus)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="acquired">Acquired</option>
                                    <option value="broken">Broken</option>
                                    <option value="in_repair">In Repair</option>
                                    <option value="refurbished">Refurbished</option>
                                    <option value="listed">Listed</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Purchase Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={purchasePrice}
                                        onChange={(e) => setPurchasePrice(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sold Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={soldPrice}
                                        onChange={(e) => setSoldPrice(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : deviceToEdit ? 'Save Changes' : 'Add Device'}
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}