import 'dotenv/config'

const key = process.env.GROQ_API_KEY;
const url = 'https://api.groq.com/openai/v1/chat/completions';

const main = async ()=>{
    const groqRes = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            // 키로 "나 사용 권한 있어요" 증명
            'Authorization': 'Bearer ' + key
        },
        body : JSON.stringify({
            // 쓸 AI 모델 (무료·빠름)
            model: 'llama-3.1-8b-instant',
            // 보낼 질문
            messages: [{ role: 'user', content: '브레인롯 유행의 캐릭터 이야기야. "트랄랄랄로 트랄랄라"랑 "퉁퉁퉁퉁퉁 사후르"가 싸우면 누가 이길까' }]
        })
    })

    
    const data = await groqRes.json()
    console.log(data.choices?.[0]?.message?.content || data);
}

main()