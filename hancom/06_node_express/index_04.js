const express = require('express');
const app = express();

app.get('/api/users',(req,res)=>{
    res.json([
        {id:1, name:"kim"},
        {id:2, name: "lee"}
    ]);
});

app.listen(3000,()=>{
    console.log("http://localhost:3000/api/users")
});