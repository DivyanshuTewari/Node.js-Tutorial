const express = require("express");
const app = express();
const {connectMongoDb} = require("./connection");
const {logReqRes} = require("./middlewares/index.js");
const userRouter = require("./routes/user");

const PORT = 3000;

//Connection 
connectMongoDb("mongodb://127.0.0.1:27017/MVC");

//Middlewares
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users",userRouter);


app.listen(PORT , () =>{
    console.log(`Server started at  : ${PORT}`);

})