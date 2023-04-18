const tools = require('../utils/tools');
const db = require('../utils/db');

const load = (app) => {
    app.post('/api/save-verification', async (req, res) => {
        const originalText = req.body.originalText;
        const sign = req.body.sign;

        if (!originalText || !sign) {
            res.status(400).send('Missing params.');
            return;
        }

        const originAddr = await tools.verifySignAndGetAddr(originalText, sign);

        if (!originAddr) {
            res.status(400).send('Sign is invalid.');
            return;
        }

        const identities = await tools.getAddrIdentities(originAddr);

        if (identities.length === 0) {
            res.status(400).send('No valid identities found for sign owner.');
            return;
        }

        const randKey = tools.generateRandKey(50);

        await db.createSignedText(randKey, originalText, sign, originAddr);

        res.send({
            key: randKey
        });
    });
}

module.exports = load;