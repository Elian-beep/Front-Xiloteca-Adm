import { http } from './config.js';

export default {
    listAll: () => {
        return http.get(process.env.VUE_APP_ROUTE_SAMPLE);
    },
    findAllPage: (urlDestination = `${process.env.VUE_APP_ROUTE_SAMPLE}/${process.env.VUE_APP_ROUTE_PAGE}`) => {
        return http.get(urlDestination);
    },
    findSearchPage: (urlDestination = `${process.env.VUE_APP_ROUTE_SAMPLE}/${process.env.VUE_APP_ROUTE_PAGE}/${process.env.VUE_APP_ROUTE_SEARCH}`, samples) => {
        return http.post(urlDestination, samples);
    },
    deleteSample: (sample, token) => {
        return http.delete(`${process.env.VUE_APP_ROUTE_SAMPLE}/${sample._id}`,
            {
                data: sample,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    },
    saveSample: (sample, token) => {
        return http.post(process.env.VUE_APP_ROUTE_SAMPLE, sample,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    },
    editSample: (sample, token) => {
        return http.put(`${process.env.VUE_APP_ROUTE_SAMPLE}/${sample._id}`, sample,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }
}