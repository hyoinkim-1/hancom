import { useState } from 'react'

export const NameForm = () => {
  const [name, setName] = useState("");
    
  return (
    <>
      <input type="text"
        className="border-red-500 border"
        value={name}
        onInput={(e)=>{setName(e.target.value)}}
        placeholder='이름입력'
      />
      <p>안녕, {name}</p>
    </>
  )
}