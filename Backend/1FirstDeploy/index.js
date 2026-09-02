require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/twitter", (req, res)=>{
    res.send("divyanshutiwari");
})

app.listen(port , ()=>{
    console.log(`app is listening on port no : ${port}`);
})