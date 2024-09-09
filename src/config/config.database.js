require('dotenv').config();

module.exports = {
    development: {
        dialect: 'mysql',
        host: 'localhost',
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    test: {
        dialect: 'mysql',
        host: process.env.HOST,
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
    production: {
        dialect: 'mysql',
        host: process.env.HOST,
        username: process.env.DATABASE_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
 }