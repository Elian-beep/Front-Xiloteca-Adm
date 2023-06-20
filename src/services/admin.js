import { http } from './config.js';

export default {
    authLogin: (admin) => {
        return http.post('/auth/login', admin);
    },
    redirectAdmin: (token, id) => {
        return http.get(
            `/user/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    },
    checkAndListToken: (token) => {
        return http.get(`/user/token/${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    delToken: (token) => {
        return http.delete(`/user/token/${token._id}`, {
            headers: {
                'Authorization': `Bearer ${token.token}`
            }
        });
    }
}