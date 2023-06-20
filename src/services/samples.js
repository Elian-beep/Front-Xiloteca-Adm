import { http } from './config.js';

export default {
    listAll: () => {
        return http.get('amostras');
    },
    findAllPage: (urlDestination = 'amostras/page') => {
        return http.get(urlDestination);
    },
    deleteSample: (sample, token) => {
        return http.delete(`amostras/${sample._id}`,
            {
                data: sample,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    },
    saveSample: (sample, token) => {
        return http.post("amostras", sample,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    },
    editSample: (sample, token) => {
        return http.put(`amostras/${sample._id}`, sample,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }
}