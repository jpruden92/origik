const tools = require('../utils/tools');
const db = require('../utils/db');

const load = (app) => {
    app.post('/api/verification', async (req, res) => {
        const originalText = req.body.originalText;
        const sign = req.body.sign;
        const url = req.body.url;

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

        await db.createSignedText(randKey, originalText, sign, originAddr, url);

        res.send({
            key: randKey
        });
    });

    app.get('/api/verification', async (req, res) => {
        const key = req.query.key;

        if (!key) {
            res.status(400).send('Missing params.');
            return;
        }

        const signedTextData = await db.getSignedText(key);

        if (!signedTextData) {
            res.status(400).send('No signed text found for key.');
            return;
        }

        res.send(signedTextData);
    });

    app.get('/api/url_list', async (req, res) => {
        const urls = await db.getAllUrls();

        res.send(urls);
    });
}

module.exports = load;