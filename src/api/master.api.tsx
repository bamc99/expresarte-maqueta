import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';
const masterApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default masterApi;