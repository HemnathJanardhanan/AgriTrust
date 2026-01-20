import axios from 'axios';

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL;

export const askRag = async (question) => {
    const response = await axios.post(`${FASTAPI_BASE_URL}/ask`, {
        question,
    });

    return response.data;
};
