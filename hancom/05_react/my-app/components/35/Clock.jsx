import { useEffect, useState } from 'react'

export const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(()=>{
    const timer = setInterval(()=>{
        setTime(new Date().toLocaleTimeString());
    },1000)

    return ()=>clearInterval(timer);
  },[])
  return (
    <div>{time}</div>
  )
}
