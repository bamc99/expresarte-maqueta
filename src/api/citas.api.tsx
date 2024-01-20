import axios from "axios";


const baseURL = 'http://localhost:8081/api/v1';
const citasApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default citasApi;