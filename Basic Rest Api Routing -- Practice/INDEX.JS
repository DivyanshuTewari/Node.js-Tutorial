const express = require('express');
const app = express();
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const port = 3000;
//Middleware -->  Form data ko body mein convert karne ke liye
app.use(express.urlencoded({extended : false})); 

app.get('/users', (req, res) => {
    const html = `<ul>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
    res.send(html);
})

app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.route('/api/users/:id').get((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    return res.json(user);
}).patch((req, res) => {
    const id =  req.params.id;
    const body = req.body;
    const index = users.findIndex((user)=> user.id == id);
    if(id !== -1)
    {
        users[index] = {...users[index],...body};
     
    }
    
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err, data)=>{})
    console.log({id , ...body});
    return res.json({ status: "success" });
}).delete((req, res) => {
    const id = req.params.id;
    const index = users.findIndex((user)=>user.id ==id);
    if(index !== -1)
    {
        users.splice(index,1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err , data)=>{})
        console.log("User deleted with id " + id);
    }
    return res.json({ status: "success" });
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({id: users.length + 1 , ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err, data)=>{})
    console.log({id : users.length , ...body});
    return res.json({status :"success" , id : users.length , ...body });
})


app.listen(port, () => {
    console.log("Server started at port " + port);
});
