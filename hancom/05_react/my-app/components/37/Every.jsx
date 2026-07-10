import { useEffect, useState } from 'react'

export const Every = () => {
  const [count, setCount] = useState(0);

  useEffect(()=>{
    console.log('렌더링할 때 마다 실행');
  });
  
    return (
    <button onClick={()=>{setCount(c=>c+1)}}>{count}</button>
  )
}
