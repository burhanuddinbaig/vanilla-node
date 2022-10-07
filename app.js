const express = require("express");
const body_parser = require("body-parser");
const app = express();          //to call function reference express()

const PORT = 3000 || 4000;          //Port may be 3000 or 4000
app.use(body_parser.urlencoded({extended:false}))

const userController = require("./controller/user");        //to import User Controller
const userRouter = require("./routes/users")                //to import User Router

// User Routes
app.use("/api/user", userRouter.router);

// Home Route
app.use("/home", (req,res,next)=>{
    let Arr = userController.Arr
    let arrLen = Arr.length
    if(arrLen > 0){
        res.setHeader("Content-Type", "text/html");
        res.write("<h1>Home Page</h1>")
        for (let i = 0; i < arrLen; i++){
            res.write(`
                <h4>
                    - ${Arr[i]}

                    <form action='/api/user/Delete/${i}' method='Get'>
                    <button type='submit'>DELETE</button>
                </form>
                </h4>
            `)
        }
        res.write("<a href='/api/user/addUser'>Add New</a>")
    }
    else{                              // to redirect to add user if no user found
        res.redirect("/api/user/addUser")
    }
    res.end();
});

// Error Route for all errors
app.use((err, req, res, next)=>{
    // for Tocken Validation
    // if (err.name === "UnauthorizedError") {
    //     return res.status(401).send("invalid token...");
    // }

    return res.status(err.code).json({'msg': err.msg})
});

// Not found route
app.all("*", function(req,res){
    res.write("Not Found");
    res.end();
});

// To log the server running status
app.listen(PORT, console.log(`Server is running at localhost:${PORT}`));