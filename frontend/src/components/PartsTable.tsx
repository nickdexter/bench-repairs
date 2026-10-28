import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import { useToast } from "../context/ToastContext"
import DeleteConfirmationModal from './DeleteConfirmationModal'
import type { Part } from '../types/part'
import { deletePart } from '../services/api'

interface PartsTableProps {
    onEditClick(part: Part): void
    parts: Part[]
    onAddClick: () => void
    onDeleted: (id: number | string) => void
}

export default function PartsTable(props: PartsTableProps) {
    const { showToast } = useToast();
    const [partToDelete, setPartToDelete] = useState<{ id: number, name: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteConfirm = async () => {
        if (!partToDelete) return;

        setIsDeleting(true);
        try {
            await deletePart(partToDelete.id);
            props.onDeleted(partToDelete.id);
            showToast(`Deleted ${partToDelete.name} successfully`, 'success');
            setPartToDelete(null);
        } catch (err: any) {
            showToast(err.message || 'Failed to delete device', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all parts.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={props.onAddClick}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add part
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Cost
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Quantity
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Delete</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {props.parts.map((part) => (
                                    <tr key={part.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11" src={reactLogo} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{part.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">${part.cost}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{part.quantity}</td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                onClick={() => props.onEditClick(part)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit<span className="sr-only">, {part.name}</span>
                                            </button>
                                        </td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                onClick={() => setPartToDelete({ id: part.id, name: part.name })}
                                                className="text-rose-600 hover:text-rose-900"
                                            >
                                                Delete<span className="sr-only">, {part.name}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={!!partToDelete}
                onClose={() => setPartToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Delete Part"
                message={`Are you sure you want to delete ${partToDelete?.name}? This action cannot be undone and will permanently remove this part from your database.`}
                confirmText="Delete"
                isDeleting={isDeleting}
            />
        </div>
    )
}