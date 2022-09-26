const express = require("express");
const body_parser = require("body-parser");
const userController = require("./controller/user");
const app = express();

const PORT = 3000 || 4000;
app.use(body_parser.urlencoded({extended:false}))

const userRouter = require("./routes/users")

app.use("/api/user", userRouter.router);

// Home Route
app.use("/home",(req,res,next)=>{
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
    else{
        res.redirect("/api/user/addUser")
    }
    res.end();
});

// Not found route
app.all("*", function(req,res){
    res.write("Not Found");
    res.end();
});

app.listen(PORT, console.log(`Server is running at ${PORT}`));