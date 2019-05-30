/* eslint-disable import/no-unresolved */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
    },
    test: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.TEST_DATABASE,
        host: process.env.HOST,
        dialect: process.env.DIALECT,
    },
    production: {
        use_env_variable:"DATABASE_URL",
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "postgres",
    },
};
