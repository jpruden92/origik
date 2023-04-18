const pg = require('pg');
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
console.info(params);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1]
};

const pool = new pg.Pool(config);

const _createSignedTexts = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS signed_texts (
            key VARCHAR(255) PRIMARY KEY,
            text TEXT NOT NULL,
            signature VARCHAR(255) NOT NULL,
            owner_address VARCHAR(255) NOT NULL
        )
    `;
    await pool.query(query);
};

const createSignedText = async (key, text, signature, ownerAddress) => {
    return new Promise(async (resolve, reject) => {
        // Create table if not exists
        await _createSignedTexts();

        pool.query(
            `INSERT INTO signed_texts (key, text, signature, owner_address) VALUES ($1, $2, $3, $4) RETURNING *`,
            [key, text, signature, ownerAddress],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            }
        );
    });
};

const getSignedText = async (key) => {
    return new Promise(async (resolve, reject) => {
        // Create table if not exists
        await _createSignedTexts();

        pool.query(
            `SELECT * FROM contacts WHERE key = $1`,
            [key],
            async (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
            }
        );
    });
};

module.exports = {
    createSignedText,
    getSignedText
};
