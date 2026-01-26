import api from "./client";

export async function createPlot({ farmId, payload }) {
    const res = await api.post(`/farms/${farmId}/plots`, payload);
    return res.data;
}
