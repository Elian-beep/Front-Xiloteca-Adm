import axios from "axios";

export const http = axios.create({
    baseURL: 'https://back-api-xiloteca.vercel.app'
    // URL LOCAL:       http://localhost:8083
    // URL OFICIAL:     https://back-api-xiloteca.vercel.app
});