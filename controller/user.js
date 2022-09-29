                    //--------User.js Controller-----------//

const bodyParser = require('body-parser');
const Users = require('../model/users');    // to import user model

let user = new Users();     // to initialize a user model instance
const entity = "User";

// create user controller
const create = (req, res, next)=>{
    let payload = req.body;

    user.create(payload)
    .then(()=>{
        res.status(201)
        res.send({'msg':`${entity} created sucessfully`})
        res.end();
    })
    .catch((err)=>{
        console.log(err);
    });
};

// to fetch all users from db
const fetchall = (req, res, next) => {
    let dataArr = [];

    user.getall()           // calling getall from model
    .then(([data])=>{
        data.forEach((rowData)=>{
            let obj = {
                id : rowData.id,
                name : rowData.name
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

// add user controller
const addUser = (req,res,next)=>{
    // let payload = req.body;

    // res.end();
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

// to export controller objects
module.exports = { 
    addUser : addUser,
    create : create,
    getInfo : getInfo,
    fetchall : fetchall,
    update : update,
    delete : deleteUser,
}