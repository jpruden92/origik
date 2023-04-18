const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/dfcc6b8e94b34acfa93beb8e95db336c'));
const axios = require('axios');

const config = {
    openseaApi: 'https://testnets-api.opensea.io/api/v1',
    collectionName: 'Pru Test Collection'
};

const _openseaManager = {
    getAssets: async (addr) => {
        const response = await axios.get(`${config.openseaApi}/assets?owner=${addr}`);
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

const getAddrIdentities = async (addr) =>{
    const openseaAssets = await _openseaManager.getAssets(addr);

    return openseaAssets.assets.filter(asset => asset.collection.name === config.collectionName).map((asset) => {
        return {
            name: asset.name,
            image: asset.image_url,
            tokenId: asset.token_id,
            contractAddress: asset.asset_contract.address,
            properties: asset.traits.map((trait) => {
                return {
                    type: trait.trait_type,
                    value: trait.value
                }
            })
        };
    });
};

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