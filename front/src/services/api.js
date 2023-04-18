import axios from 'axios';

import config from 'config';

const apiManager = {
    setVerification: async (text, sign, url) => {
        const response = await axios.post(`${config.apiUrl}/api/verification`, {
            originalText: text,
            sign: sign,
            url: url
        });

        return response.data;
    },
    getVerification: async (key) => {
        const response = await axios.get(`${config.apiUrl}/api/verification?key=${key}`);

        return response.data;
    },
    getIdentitiesList: async (addr) => {
        const response = await axios.get(`${config.apiUrl}/api/identities_list?addr=${addr}`);

        return response.data;
    }
};

export default apiManager;