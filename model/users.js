const db = require("../config/database");
const user = require("../controller/user");

module.exports = class User {
    getall(cb){
        return db.query("SELECT * from User", (error, data, filleddata)=>{
             cb(data)   
        })
    }
};

