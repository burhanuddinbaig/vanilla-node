const db = require("../config/database");

module.exports = class User {

    
    getall(){
        return db.query("SELECT * from User");
    }
};
