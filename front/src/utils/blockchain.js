import {Buffer} from 'buffer';

import api from '../services/api';

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

const getAccounts = async () => {
    let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
    });

    for (let i = 0; i < accounts.length; i++) {
        const assets = await api.getIdentitiesList(accounts[i]);

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