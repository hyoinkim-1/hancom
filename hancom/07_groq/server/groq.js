import 'dotenv/config'

const key = process.env.GROQ_API_KEY;
const url = 'https://api.groq.com/openai/v1/chat/completions';

const groq = async (question)=>{
    const groqRes = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key
        },
        body : JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: question }]
        })
    })
    const data = await groqRes.json()

    if (!groqRes.ok || data.error) {
        throw new Error(data.error?.message || `Groq API error (${groqRes.status})`)
    }

    return data.choices?.[0]?.message?.content
}

// console.log(await groq("hi"));

export default groq