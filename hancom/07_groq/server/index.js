import express from 'express'
import cors from 'cors'
import groq from './groq.js';

const url = "http://localhost:3000"
const app = express();
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    const start = Date.now()
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`)
    })
    next();
})

app.post(`/api/groq`,async (req, res)=>{
    const question = req.body.question
    const groqRes = await groq(question)
    res.json({answer: groqRes});
});

app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})