import { http } from "./config.js";

export default {
    listAll: () => {
        return http.get('usuarios');
    },
}