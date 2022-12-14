        //---------- User Model -----------//

const db = require("../config/database");       // to import database.js

module.exports = class User {                       // User model class
    login(name)                                                       // login function
    {
        return db.query(`SELECT id, name, password, email               
            FROM User WHERE name = '${name}'`)                            // db query for login
    };

    findByEmail(email)                                                       // login function
    {
        return db.query(`SELECT id 
            FROM User WHERE email = ${email}`)                            // db query for login
    };

    create({name, password, email})                                     // create new user
    {
        // Insert Query
        return db.query(`INSERT INTO User(name, password, email) 
            values('${name}', '${password}', '${email}')`);
    };

    getall(){                                       // get all users Function
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

    // Upload Image file name to a user
    upload(id, image)
    {
        // UPDATE Query
        return db.query(`UPDATE User 
            SET image = '${image}'
            WHERE id = ${id}`);
    };
};