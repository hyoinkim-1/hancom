import { useEffect, useState } from "react"

export const Counter36 = () => {
    const [count, setCount] = useState(0);
    useEffect(()=>{
        console.log(`count 바뀜 : ${count}`)
    },[count])

  return (
    <button onClick={()=>{setCount(c=>c+1)}}>{count}</button>
  )
}
