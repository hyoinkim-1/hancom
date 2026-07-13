import { createContext, useState } from 'react'

export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [name, setNameState] = useState(() => localStorage.getItem('userName') ?? '')

  const setName = (value) => {
    setNameState(value)
    localStorage.setItem('userName', value)
  }

  const clearName = () => {
    setNameState('')
    localStorage.removeItem('userName')
  }

  return (
    <UserContext.Provider value={{ name, setName, clearName }}>
      {children}
    </UserContext.Provider>
  )
}
