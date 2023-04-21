import axios from 'axios';

import config from 'config';

const apiManager = {
    setVerification: async (text, sign) => {
        const response = await axios.post(`${config.apiUrl}/api/verification`, {
            originalText: text,
            sign: sign
        });

        return response.data;
    },
    getVerification: async (key) => {
        const response = await axios.get(`${config.apiUrl}/api/verification?key=${key}`);

        return response.data;
    }
};

export default apiManager;