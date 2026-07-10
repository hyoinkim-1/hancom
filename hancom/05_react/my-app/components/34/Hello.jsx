import { useEffect } from "react"


export const Hello = () => {
  useEffect(()=>{
    console.log('hi');
  },[]);
  
  return (
    <div>Hello</div>
  )
}
