const { query } = require('express');
const mySQL = require('mysql2')
const user = require('../controller/user')

// using pool


var pool = mySQL.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "node_proj",
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

module.exports = pool.promise();

// pool.query("SELECT * from User", function(err, rows, fields){
//     console.log([rows])
// })



// module.exports = pool.promise();

// Simple Connection

// const con = mySQL.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         database: 'node_proj'
//     }
// );

// con.query('SELECT * from User',
//     function(err, results, fields){
//         console.log(results);
//         console.log(fields);
//     }
// );