                    //--------User.js Controller-----------//

const bodyParser = require('body-parser');
const Users = require('../model/users');    // to import user model
const bcrypt = require('bcrypt');           // to use bcrypt for password hashing
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

const { body, validationResult } = require('express-validator')   // usser express-validator for form validations

let user = new Users();     // to initialize a user model instance

// constants
const entity = "User";
const salt = 11;
var Arr = [];

// login controller
const login = async (req, res, next)=>{
    let payload = req.body;
    let row = data[0];

    try {
        const [data] = await user.login(payload.name);      // calling getsingle from model
        // promt error if username not found
        if(!row){
            res.status(401);
            res.send({'msg' : 'Incorrect username or password'});
            res.end();
        };

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
        })
    }
    catch (error) {
        console.log(error);
    }
}

// create user controller
const create = async (req, res, next)=>{
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

// fetchall router
const fetchall = async (req, res, next) => {
        let dataArr = [];

        try {
            const [data] = await user.getall()           // calling getall from model
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
        } catch (error) {
            console.log(error);
        }
    }

// get single users
const getInfo = async (req,res,next)=>{
    const { id } = req.params
    let dataArr = [];

    try {
        [data] = await user.getsingle(id)
        
        let row = data[0]
        obj = {
            id : row.id,
            name : row.name,
            email : row.email
        }
        res.status(200)
        res.send(obj)
        res.end();

    } catch (error) {
        console.log(error);
    }
};

// Update Controller
const update = async (req, res, next)=>{
    let payload = req.body;
    const { id } = req.params

    try {
        await user.update(id, payload);

        res.status(201)
        res.send({'msg':`${entity} updated sucessfully`})
        res.end();
    } catch (error) {
        console.log(error);
    }
};

// delete user controller
const deleteUser = async (req, res, next)=>{
    const { id } = req.params

    try {
        await user.delete(id)      // calling getsingle from model
        
        let obj = {
            id : id             // to indicate that such id has been deleted
        }

        res.status(200)
        res.send(obj)
        res.end();
    } catch (error) {
        console.log(error);
    }
}

/*
//<<<<<<<<<<<<//////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>
//<<<<<<<<////////-----------WITHOUT ASYNC AWAIT------------///////>>>>>>>>>>>>>>>
//<<<<<<<<<<<<//////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>

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
const create = async (req, res, next)=>{
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

const fetchall = async (req, res, next) => {
        let dataArr = [];

        try {
            const [data] = await user.getall()           // calling getall from model
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
        } catch (error) {
            console.log(error);
        }
    }

// get single users
const getInfo = async (req,res,next)=>{
    const { id } = req.params
    let dataArr = [];

    try {
        [data] = user.getsingle(id)
        
        let row = data[0]
        obj = {
            id : row.id,
            name : row.name,
            email : row.email
        }
        res.status(200)
        res.send(obj)
        res.end();

    } catch (error) {
        console.log(error);
    }
};
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

*/


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