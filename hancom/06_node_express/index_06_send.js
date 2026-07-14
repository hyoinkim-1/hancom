import readline from 'readline'

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question('메시지: ', (message)=>{
    // 192.168.20.19
    fetch('http://192.168.20.19:3001/api/chat',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({message})
    })
        .then(r => r.json())
        .then(data=>console.log(`data: ${JSON.stringify(data)}`))
        .catch((err)=>console.log('서버안 켜짐', err))
        .finally(()=>rl.close());
})