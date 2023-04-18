import axios from 'axios';

import config from '../config';

const openseaManager = {
    getAssets: async (addr) => {
        const response = await axios.get(`${config.openseaApi}/assets?owner=${addr}`);
        return response.data;
    }
};

export default openseaManager;