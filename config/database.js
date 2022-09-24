const mySQL = require('mysql2')
const user = require('../controller/user')

const con = mySQL.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'node_proj'
    }
);



con.query('SELECT * from User',
    function(err, results, fields){
        console.log(results);
        console.log(fields);
    }
);

//using pool

// var pool = mySQL.createPool({
//     connectionLimit: 20,
//     host : "localhost",
//     user : "root",
//     password : "",
//     database : "node_sql"
// });

// module.exports = pool.promise();