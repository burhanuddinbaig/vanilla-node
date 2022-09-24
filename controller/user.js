const Users = require('../model/users');

let user = new Users();

const fetchall = (req, res, next) => {
    user.getall().then(([data])=>{

    }).catch();
}

var Arr = [];

const addUser = (req,res,next)=>{
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <h1>Home Page</h1>
        <form action='/api/user/create' method='POST'>
            <input type='text' name='name' />
            <button type='submit'>add user</button>
        </form>
    `);
    res.end();
};

const getInfo = (req,res,next)=>{
    console.log("test");

    res.end();
};

const create = (req, res, next)=>{
    var name = req.body.name
    if(Arr.includes(name)){
        res.redirect("/api/user/addUser")
    }
    else{
        Arr.push(name);
        res.redirect("/home")
    }
    res.end();
};

const deleteUser = (req, res, next)=>{
    const { id } = req.params
    Arr.splice(id, 1)
    res.redirect("/home")
}

module.exports = { 
    addUser : addUser,
    getInfo : getInfo,
    create : create,
    delete : deleteUser,
    Arr : Arr
}