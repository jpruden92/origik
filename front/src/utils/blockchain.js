import openseaManager from '../services/openseaManager';
import config from '../config';

const signText = async (text, addr) => {
    try {
      const msg = `0x${Buffer.from(text, 'utf8').toString('hex')}`;
      const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [msg, addr],
      });
      
      return sign;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

const getAssets = async (addr) => {
    const data = await openseaManager.getAssets(addr);
    
    return data.assets.filter(asset => asset.collection.name === config.collectionName).map((asset) => {
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
}

const getAccounts = async () => {
    let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
    });

    for (let i = 0; i < accounts.length; i++) {
        const assets = await getAssets(accounts[i]);

        accounts[i] = {
            addr: accounts[i],
            assets: assets
        };
    }

    return accounts;
}


export default {
    signText,
    getAccounts
}