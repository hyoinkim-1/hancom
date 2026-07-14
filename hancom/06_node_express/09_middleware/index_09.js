import express from 'express';
import cors from 'cors';

const app = express();
// 미들웨어 2개
app.use(cors());
app.use(express.json());

// 커스텀 미들웨어
app.use((req,res,next)=>{
    const start = Date.now()
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`)
    })
    next();
})

// 미들웨어 다 거친 후에 라우트 실행
app.get('/api/users', (req, res)=>{
    res.json([{id:1, name:'kim'}])
});

app.listen(3000, ()=>{
    console.log("http://localhost:3000/api/users")
})