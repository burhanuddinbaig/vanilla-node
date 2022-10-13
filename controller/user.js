                    //--------User.js Controller-----------//

const bodyParser = require('body-parser');
const Users = require('../model/users');    // to import user model
const bcrypt = require('bcrypt');           // to use bcrypt for password hashing
const { body, validationResult } = require('express-validator')   // usser express-validator for form validations
const jwt = require('jsonwebtoken');            // for json authentication
const dotenv = require('dotenv');               // dot env

let user = new Users();     // to initialize a user model instance

// constants
const entity = "User";
const salt = 10;
const SECRET_KEY = 'this is my secret dont tell';
var Arr = [];

// login controller
const login = async (req, res, next)=>{
    let payload = req.body;
    try {
        const [data] = await user.login(payload.name);      // calling getsingle from model
        let row = data[0];

        // promt error if username not found
        if(!row){
            return next({code:401, msg:'Username or Password Incorrect'})
        };
        // compare passwords
        
        const match = await bcrypt.compare(payload.password, row.password);

        if (match){
            const token = generateAccessToken({ username: payload.name });
            res.status(200);
            res.send({'msg' : 'Login successfull', 'token' : token});
        }
        else{
            return next({code:400, msg:'Login Failed'})
        }
        res.end();
        // bcrypt.compare(payload.password, row.password, (err, result) => {
        //     if(result){
        //         const token = generateAccessToken({ username: payload.name });
                
        //         res.status(200);
        //         res.send({'msg' : 'Login successfull', 'token' : token});
        //     }
        //     else{
        //         return next({code:400, msg:'Login not Successfull'})
        //     }
        //     res.end();
        // })
    }
    catch (error) {
        return next({code:400, msg:'Operation Failed'})
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
            return next({code:400, msg:'Operation Failed'})
        });
    });
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
                            password : rowData.password,
                            image : rowData.image,
                        };
                        dataArr.push(obj)
                    })
                    res.status(200);
                    res.send(dataArr)
                    res.end() 
        } catch (error) {
            return next({code:400, msg:'Operation Failed'})
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
        return next({code:400, msg:'Operation Failed'})
    }
};

// Update Controller
const update = async (req, res, next)=>{
    let payload = req.body;
    const { id } = payload;
    if(!id) return next({code:400, msg:'Please enter id'})

    try {
        const result = await user.update(id, payload);

        if(!result) return next({code:400, msg:'User cannot be Updated'})

        return res.status(200).json({'msg': 'User Updated sucessfully'})

    } catch (error) {
        return next({code:400, msg:'User cannot be Updated'})
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
        return next({code:400, msg:'User cannot be Deleted'})
    }
}

// Upload profile image user controller
const upload = async (req, res, next)=>{
    const filename = req.file.filename
    const { id } = req.params

    try {
        const result = await user.upload(id, filename);
        if(!result)  return next({code:400, msg:'Pic cannot be uploaded'})
        
        return res.status(200).json({'msg': 'file uploaded sucessfully'})
        
    } catch (error) {
        return next({code:400, msg:'Pic cannot be uploaded'})
    }
}

//-----------------------------FUNCTIONS-----------------------------//

// to generate access key token
function generateAccessToken(username){
    return jwt.sign(username, SECRET_KEY, {expiresIn: '1800s'})
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return next({code:400, msg:'Invalid Token'})
      req.user = user
      next()
    })
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
    upload : upload,
    authenticateToken : authenticateToken,
}

//<<<<<<<<<<<<//////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>
//<<<<<<<<////////-----------WITHOUT ASYNC AWAIT------------///////>>>>>>>>>>>>>>>
//<<<<<<<<<<<<//////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>

/*
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