const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req,res)=>{
    res.send("This is main page !");
})

app.get('/about',(req,res)=>{
    res.send("This is about page of " + req.query.name + "!");
})

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})