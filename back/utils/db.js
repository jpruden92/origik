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
            owner_address VARCHAR(255) NOT NULL,
            url VARCHAR(255)
        )
    `;
    await pool.query(query);
};

const createSignedText = async (key, text, signature, ownerAddress, url) => {
    return new Promise(async (resolve, reject) => {
        // Create table if not exists
        await _createSignedTexts();

        pool.query(
            `INSERT INTO signed_texts (key, text, signature, owner_address, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [key, text, signature, ownerAddress, url],
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
            `SELECT * FROM signed_texts WHERE key = $1`,
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

const getAllUrls = async () => {
    return new Promise(async (resolve, reject) => {
        // Create table if not exists
        await _createSignedTexts();

        pool.query(
            // Select only not null urls, group by url and join keys and owners with array_agg into the same array
            `SELECT url, array_agg(key) as keys, array_agg(owner_address) as owners FROM signed_texts WHERE url IS NOT NULL GROUP BY url`,
            async (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            }
        );
    });
};

module.exports = {
    createSignedText,
    getSignedText,
    getAllUrls
};
