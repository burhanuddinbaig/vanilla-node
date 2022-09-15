const { Console } = require("console");
const express = require("express");
const router = express.Router();

var Arr = [];

router.get("/addUser", (req,res,next)=>{
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <h1>Home Page</h1>
        <form action='/api/user/create' method='POST'>
            <input type='text' name='name' />
            <button type='submit'>add user</button>
        </form>
    `);

    res.end();
});

router.get("/getinfo", (req,res,next)=>{
    console.log("test");

    res.end();
});

router.post("/create",(req, res, next)=>{
    var name = req.body.name
    if(Arr.includes(name)){
        res.redirect("/api/user/addUser")
    }
    else{
        Arr.push(name);
        res.redirect("/home")
    }
    res.end();
});

router.get("/delete/:id",(req, res, next)=>{
    const { id } = req.params
    Arr.splice(id, 1)
    res.redirect("/home")
});


module.exports = {router,Arr};