import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Part } from '../types/part';
import { createPart, updatePart } from '../services/api';
import { useToast } from '../context/ToastContext';

interface PartsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    partToEdit?: Part | null;
}

export default function PartsModal({ isOpen, onClose, onSuccess, partToEdit }: PartsModalProps) {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    // Form state matching your Part interface
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cost, setCost] = useState('');

    // Whenever partToEdit changes (or modal opens), prefill form if editing
    useEffect(() => {
        if (partToEdit) {
            setName(partToEdit.name);
            setQuantity(partToEdit.quantity.toString());
            setCost(partToEdit.cost.toString());
        } else {
            // Reset to defaults for "Add" mode
            setName('');
            setQuantity('');
            setCost('');
        }
    }, [partToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name,
            quantity: Number(quantity),
            cost: Number(cost),
        };

        try {
            if (partToEdit) {
                await updatePart(partToEdit.id, payload);
                showToast(`Updated ${name} successfully`, 'success');
            } else {
                await createPart(payload);
                showToast(`Created ${name} successfully`, 'success');
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            showToast(err.message || 'Failed to save part', 'error');
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
                            {partToEdit ? 'Edit Part' : 'Add New Part'}
                        </Dialog.Title>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Part Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. GBA IPS Backlight Screen"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
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
                                    {loading ? 'Saving...' : partToEdit ? 'Save Changes' : 'Add Part'}
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