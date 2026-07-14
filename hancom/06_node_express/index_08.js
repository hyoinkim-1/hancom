import express from 'express'

const app = express();
// app.use(express.json());

let users = [
    {id:1,name: "lee"},
    {id:2,name: "lee2"},
    {id:3,name: "lee3"},
]

app.delete('/api/users/:id',(req,res)=>{
    const targetUser = users.find(u=>u.id===Number(req.params.id));
    if(!targetUser) return res.status(404).json({error : '없는 유저'})
    users = users.filter(u=>u!==targetUser);
    res.json({ok:true, 남은 : users})
})

app.listen(3000, async ()=>{
    const res = await fetch('http://localhost:3000/api/users/3',{method: 'DELETE'})
    console.log(await res.json());
})