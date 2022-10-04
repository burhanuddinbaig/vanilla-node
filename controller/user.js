                    //--------User.js Controller-----------//

const bodyParser = require('body-parser');
const Users = require('../model/users');    // to import user model
const bcrypt = require('bcrypt');           // to use bcrypt for password hashing

const { body, validationResult } = require('express-validator')   // usser express-validator for form validations

let user = new Users();     // to initialize a user model instance

// constants
const entity = "User";
const salt = 11;

// login controller
const login = (req, res, next)=>{
    let payload = req.body;

    user.login(payload.name)      // calling getsingle from model
    .then(([data])=>{
        let row = data[0]

        // promt error if username not found
        if(!row){
            res.status(401);
            res.send({'msg' : 'Incorrect username or password'});
            res.end();
        }

        // compare password
        bcrypt.compare(payload.password, row.password, (err, result) => {
            if(result){
                res.status(200);
                res.send({'msg' : 'Login successfull'});
            }
            else{
                res.status(401);
                res.send({'msg' : 'Incorrect username or password'});
            }
            res.end();
        });
    })
    .catch((err)=>{
        console.log(err);
    });
}

// create user controller
const create = (req, res, next)=>{
    let payload = req.body;

    bcrypt.hash(payload.password, salt).then((hash) => {
        payload.password = hash;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
        }

        user.create(payload)
        .then(()=>{
            res.status(201)
            res.send({'msg':`${entity} created sucessfully`})
            res.end();
        })
        .catch((err)=>{
            console.log(err);
        });
    });
    // console.log(payload.password + 'this');
};

// to fetch all users from db
const fetchall = (req, res, next) => {
    let dataArr = [];

    user.getall()           // calling getall from model
    .then(([data])=>{
        data.forEach((rowData)=>{
            let obj = {
                id : rowData.id,
                name : rowData.name,
                password : rowData.password
            };
            dataArr.push(obj)
        })
        res.status(200);
        res.send(dataArr)
        res.end()
    }).catch((err)=>{
        console.log(err);
    });
}

// get single users
const getInfo = (req,res,next)=>{
    const { id } = req.params
    let dataArr = [];

    user.getsingle(id)      // calling getsingle from model
    .then(([data])=>{
        let row = data[0]
        obj = {
            id : row.id,
            name : row.name,
            email : row.email
        }

        res.status(200)
        res.send(obj)
        res.end();
    })
    .catch((err)=>{
        console.log(err);
    });
};

var Arr = [];

// Update
const update = (req, res, next)=>{
    let payload = req.body;
    const { id } = req.params

    user.update(id, payload)
    .then(()=>{
        console.log(res);
        res.status(201)
        res.send({'msg':`${entity} updated sucessfully`})
        res.end();
    })
    .catch((err)=>{
        console.log(err);
    });
};

// delete user controller
const deleteUser = (req, res, next)=>{
    const { id } = req.params

    user.delete(id)      // calling getsingle from model
    .then(([data])=>{

        let obj = {
            id : id             // to indicate that such id has been deleted
        }

        res.status(200)
        res.send(obj)
        res.end();
    })
    .catch((err)=>{
        console.log(err);
    });

    // res.redirect("/home")
}

// to export controller objects
module.exports = { 
    login : login,
    create : create,
    getInfo : getInfo,
    fetchall : fetchall,
    update : update,
    delete : deleteUser,
    body : body,                // body for validation
}