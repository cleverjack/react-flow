const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    jwtSecret: JWTSECRET,
    mongodburi: 'mongodb+srv://tjrichter2:jupiter12345@cluster0.mjsfv.mongodb.net/flowreact'
};