import { useEffect, useState } from "react"

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then((res)=>res.json())
        //     .then((data)=>setUsers(()=>{
        //         console.log(JSON.stringify(data));
        //         return data
        //     }))
        //     .catch(error=>console.log('데이터 로딩 실패 : ', error))
    const fetched = async () => {
        try{
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json()
            setUsers(()=>data);
            console.log(data);
        }catch(err){
            console.log('error:',err);
        }
    }
    fetched()
        
        },[])

    // const fetched = async () => {
    //     try{
    //         const res = await fetch('https://jsonplaceholder.typicode.com/users')
    //         const data = await res.json()
    //         setUsers(()=>data);
    //         console.log('페칭 성공');
    //     }catch(err){
    //         console.log('error:',err);
    //     }
    // }
    // fetched()

    return (
        <ul>
            {users.map((u)=>{
                return <li key={u.id}>{u.name} -------- {u.company.name}</li>
            })}
        </ul>
  )
}

export default Users