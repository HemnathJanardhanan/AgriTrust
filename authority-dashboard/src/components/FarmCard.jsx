import { decideFarm } from "../api/authority.api";

export default function FarmCard({ farm, onDecided }) {
    const decide = async (decision) => {
        await decideFarm(farm.farm_id, { decision });
        onDecided();
    };

    return (
        <div className="border p-4 rounded bg-white">
            <h2 className="font-semibold">{farm.farm_name}</h2>
            <p className="text-sm text-gray-600">
                {farm.district}, {farm.state}
            </p>
            <p className="text-sm">Farmer: {farm.farmer_name}</p>

            <div className="mt-3 flex gap-2">
                <button
                    onClick={() => decide("APPROVE")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                >
                    Approve
                </button>

                <button
                    onClick={() => decide("REJECT")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                >
                    Reject
                </button>
            </div>
        </div>
    );
}
