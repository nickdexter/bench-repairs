import { useEffect, useState } from "react";
import PartsTable from "../components/PartsTable";
import type { Part } from "../types/part";
import { getParts } from "../services/api";
import PartsModal from "../components/PartsModal";

export default function Parts() {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [partToEdit, setPartToEdit] = useState<Part | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchParts = () => {
        getParts()
            .then((data) => setParts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchParts();
    }, []);

    if (loading) return <p className="p-6 text-sm text-gray-500">Loading parts...</p>;

    return (
        <div>
            <h1 className="text-xl font-bold">Parts</h1>
            <div className="py-6">
                <PartsTable
                    parts={parts}
                    onAddClick={() => {
                        setPartToEdit(null); // Clear any edit state
                        setIsModalOpen(true);
                    }}
                    onDeleted={(deletedId) => {
                        setParts(prevParts => prevParts.filter(p => p.id !== deletedId));
                    }}
                    onEditClick={(part) => {
                        setPartToEdit(part); // Set the part to edit
                        setIsModalOpen(true);   // Open the modal
                    }}
                />

                <PartsModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setPartToEdit(null);
                    }}
                    onSuccess={fetchParts}
                    partToEdit={partToEdit} />
            </div>
        </div>
    );
}