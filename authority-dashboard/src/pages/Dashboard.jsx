import { useEffect, useState } from "react";
import { getPendingFarms } from "../api/authority.api";
import FarmCard from "../components/FarmCard";

export default function Dashboard() {
    const [farms, setFarms] = useState([]);

    const load = async () => {
        const res = await getPendingFarms();
        setFarms(res.farms);
    };

    useEffect(() => { load(); }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pending Farms</h1>

            <div className="grid gap-4">
                {farms.map(f => (
                    <FarmCard key={f.farm_id} farm={f} onDecided={load} />
                ))}
            </div>
        </div>
    );
}
