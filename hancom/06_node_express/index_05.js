// const express = require('express');
// cjs버전

import express from 'express';
// esm 버전

const app = express();

const users = [
        {id:1, name:"kim"},
        {id:2, name: "lee"},
        {id:3, name: "park"}
    ];

app.get('/api/users/:id',(req,res)=>{
    const user = users.find(u=>u.id===Number(req.params.id));
    // find에서 못 찾으면 undefined. 아래 조건문으로 분기처리
    if (!user) return res.status(404).json({error : '없는 유저'})
    res.json(user);
});

app.listen(3000,()=>{
    console.log("http://localhost:3000/api/users")
});