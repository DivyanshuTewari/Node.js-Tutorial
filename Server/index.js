const http = require('http');
const fs = require('fs');
const url = require('url');
/*const express = require('express');

const app = express();

app.get('/', (req,res) =>{
    return res.send("Hello from Home Page");
})
app.get('/about',(req,res)=>{
    return res.send("hello from About Page ! hi --> "+ req.query.name);
})*/

function myHandler(req,res)
{
    if(req.url==='/favicon.ico') {
        return res.end();
    }
    const log = `${Date.now()} : ${req.method} ${req.url} New ReQ Received \n\n\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile('log.txt', log , (err, data)=>{
        switch(myUrl.pathname)
        {
            case '/': 
                res.end("HomePage");
                break;
            case '/about':
                const username = myUrl.query.name; 
                const search_results = myUrl.query.search;
                res.end(`AboutPage of ${username} and search results for ${search_results}`);
                break;
            case '/contact' : 
                res.end("ConatctPage");
                break;

            default:res.end("404 Not Found");

        }
        
    })
}

const myServer = http.createServer(myHandler);

myServer.listen(8000, ()=> {
    console.log("Server Started on port 8000");
})
