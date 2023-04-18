const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`));
const axios = require('axios');

const config = {
    raribleApi: process.env.RARIBLE_API_URL,
    raribleApiKey: process.env.RARIBLE_API_KEY,
    collectionName: process.env.COLLECTION_NAME,
    collectionNetwork: process.env.COLLECTION_NETWORK
};

const _raribleManager = {
    getNfts: async (addr) => {
        let reqConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${config.raribleApi}/items/byOwner?owner=${config.collectionNetwork}:${addr}`,
          headers: { 
            'X-API-KEY': config.raribleApiKey
          }
        };

        const response = await axios.request(reqConfig);

        return response.data;
    }
};

const verifySignAndGetAddr = async (text, sign) => {
    const msg = `0x${Buffer.from(text, 'utf8').toString('hex')}`;
    try {
        const ecRecoverAddr = await web3.eth.accounts.recover(msg, sign);
        return ecRecoverAddr;
    } catch (e) {
        return null;
    }
}

const getAddrIdentities = async (addr) => {
    const data = await _raribleManager.getNfts(addr);

    return data.items.filter(nft => nft.itemCollection.name === config.collectionName).map((nft) => {
        return {
            name: nft.meta.name,
            image: nft.meta.content[0].url,
            tokenId: nft.meta.tokenId,
            contractAddress: nft.contract.split(':')[1]
        };
    });
}

const generateRandKey = length => {
    const list = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789abcdefghijklmnpqrstuvwxyz';
    var res = '';
    for(var i = 0; i < length; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
}

module.exports = {
    verifySignAndGetAddr,
    getAddrIdentities,
    generateRandKey
};