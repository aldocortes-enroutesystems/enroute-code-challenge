const mysql = require('mysql');

require('dotenv').config();

const database = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const applyQuery = (sqlQuery) => {
    return new Promise((resolve, reject) => {
        database.query(sqlQuery, (err, result) => {
            if(err) { return reject(err); }
            var resultArray = Object.values(JSON.parse(JSON.stringify(result)))
            return resolve(resultArray);
        });
    });
};


module.exports = {
    database,
    applyQuery
};