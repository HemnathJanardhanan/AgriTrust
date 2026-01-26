// api/reference.js
import api from "./client";

export async function fetchReference() {
    const res = await api.get("/reference");
    return res.data;
}
