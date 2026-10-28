import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getRepairById } from '../services/api';
import type { Repair } from '../types/repair';
import RepairIssues from '../components/RepairIssues';
import RepairParts from '../components/RepairParts';
import RepairLog from '../components/RepairLog';

export default function RepairDetail() {
    const { repairId } = useParams<{ repairId: string }>();

    const [repair, setRepair] = useState<Repair | null>(null);
    const [loading, setLoading] = useState(true);

    const numericId = repairId ? parseInt(repairId, 10) : NaN;

    if (isNaN(numericId)) {
        return <p className="p-6 text-sm text-red-500">Invalid Repair ID</p>;
    }

    useEffect(() => {
        if (repairId) {
            getRepairById(numericId)
                .then((data) => setRepair(data))
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [repairId]);

    if (loading) return <p className="p-6 text-sm text-gray-500">Loading repair details...</p>;
    if (!repair) return <p className="p-6 text-sm text-red-500">404 Repair not found.</p>;

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <h1 className="text-xl font-bold">Repair: {repair.device.name}</h1>

            {/* 3 column wrapper */}
            <div className="mx-auto mt-4 flex min-h-0 w-full max-w-7xl flex-1 flex-col lg:flex-row xl:px-2">
                {/* Left sidebar & main wrapper */}
                <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
                    <div className="border px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
                        {/* Left column area */}
                        <RepairIssues />
                    </div>

                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                        {/* Main area */}
                        <RepairLog />
                    </div>
                </div>

                <div className="shrink-0 border px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
                    {/* Right column area */}
                    <RepairParts />
                </div>
            </div>
        </div>
    )
}