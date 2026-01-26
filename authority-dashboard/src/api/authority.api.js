import api from "./axios";

export const login = async (data) => {
    const res = await api.post("/auth/login", data);
    return res;
}
export const getPendingFarms = async () =>{
    const res=await api.get("/authority/farms/pending");
    console.log(res);
    return res.data;
}
export const decideFarm = async (farmId, payload) => {
    const res= await api.post(`/authority/farms/${farmId}/decision`, payload);
    return res;
}