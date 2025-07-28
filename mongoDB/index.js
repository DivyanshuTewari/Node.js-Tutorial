const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT  = 3000;

// Connecting to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/MongoDB-Tutorial").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("mongoDb connection Failed " , err);
});

// Schema - Define the structure

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle: {
        type:String,
    },
    gender: {
        type:String,
    }
}, {timestamps:true});

//Model - Using schema to do CRUD Operations
const User = mongoose.model("user", userSchema);

//Middleware --> Form data ko body mein convert karne ke liye

app.use(express.urlencoded({extended:false}));


app.get('/users' , async(req, res)=>{
    const allDbUsers = await User.find({});
    const html = `<ul>${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}</ul>`
    res.send(html);
})

app.get('/api/users' , async(req,res)=>{
    const allDbUsers = await User.find({});
    return res.status(200).json(allDbUsers);
})


app.route('api/users/:id').get(async(req, res)=>{
    const id = await User.findById(req.params.id);
    if(!id){
        return res.status(404).json({
            msg: "User not found"
        })
    }
    return res.status(200).json(user);
})


app.post('/api/users' , async (req ,res)=>{
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title 

    )
    {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }
    const result  = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });
    console.log(result);
    return res.status(201).json({
        msg: "User created successfully",
        user: result
    });

})


app.listen(PORT ,()=> {
    console.log("Server started on Port: "+ PORT);
});