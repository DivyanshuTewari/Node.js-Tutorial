const User = require("../models/user.js");
async function handleGetAllUser(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({error :"user not found"});
    }
    return res.json(user);
}

async function handleUpdateUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({
            msg : "User not found"
        })
    }
    const body = req.body;
    const UpdatedData = {...user.toObject(),...body};
    const UpdatedUser = await User.findByIdAndUpdate(req.params.id,UpdatedData,{new:true});
    console.log(UpdatedUser);
    return res.status(200).json({
        msg : "User updated successfully",
        user : UpdatedUser
    });
}

async function handleDeleteUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return res.status(404).json({
            msg : "User not found"
        })
    }
    await User.findByIdAndDelete(req.params.id);
    return res.json({
        msg : "Sucessfully Deleted"
    });
}

async function handleCreateNewUser(req,res) {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title 
    ){
        return res.status(400).json({
            msg: "All fields are required"
        });
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name, 
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });
    console.log(result);
    return res.status(201).json({
        msg : "User created successfully",
        user: result
    });
}

module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,

};