import { useState } from 'react';

const App = () => {

  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const url = 'http://localhost:3000'

  const postFetchTest = async (str: string) => {
    const data = await fetch(`${url}/api/groq`,{
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({question : str})
    })
    const res = await data.json();

    setAnswers((arr)=>[...arr, res.answer]);
    setInputValue(()=>"");
    }

  return (
    <div>
      <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} >
        
      </input>
      <button onClick={()=>postFetchTest(inputValue)}>보내기</button>
      {answers.map((answer:string, i:number)=>{
        return <div key={i}>{answer}</div>
      })}
    </div>
  )
}

export default App