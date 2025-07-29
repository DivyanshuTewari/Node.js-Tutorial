const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/MongoDB-Tutorial").then(() => {
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("MongoDB connection failed", err);
});

//Schema - Define the structure
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
},{timestamps:true});


//Model - Using schema to do CRUD Operations
const User = mongoose.model("user", userSchema);