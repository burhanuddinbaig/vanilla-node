        //---------- User Model -----------//

const db = require("../config/database");       // to import database.js

module.exports = class User {                       // User model class
    create({name, password, email})                                     // create new user
    {
        // Insert Query
        let qry = "INSERT INTO User(name, password, email) ";
        qry += `values('${name}', '${password}', '${email}')`;
        return temp;
    };
    getall(){                                       // get all users function
        return db.query("SELECT * from User");
    };
    getsingle(id){                                  // get single user
        return db.query(`SELECT * from User where id = ${id}`);
    };

    // UPDATE a user
    update(id, {name, password, email})                                     
    {
        // UPDATE Query
        return db.query(`UPDATE User 
            SET name = '${name}', password = '${password}', email = '${email}'
            WHERE id = ${id}`);
    };
    delete(id){                                     // delete a user
        return db.query(`DELETE from User where id = ${id}`);
    };
};