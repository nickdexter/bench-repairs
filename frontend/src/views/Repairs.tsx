import { useEffect, useState } from "react";
import RepairsTable from "../components/RepairsTable";
import type { Repair } from "../types/repair";
import { getRepairs } from "../services/api";

export default function Repairs() {
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getRepairs()
            .then((data) => setRepairs(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading devices...</p>;

    return (
        <div>
            <h1 className="text-xl font-bold">Repairs</h1>
            <RepairsTable repairs={repairs} />
        </div>
    );
}