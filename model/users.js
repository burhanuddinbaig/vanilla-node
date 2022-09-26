const db = require("../config/database");

module.exports = class User {
    getall(cb){
        return db.query("SELECT * from User", (error, data, filleddata)=>{
             cb(data);
        });
    }
};
