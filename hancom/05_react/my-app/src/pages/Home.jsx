import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
  
    return (
    <div>Home
        <Link to={"/about"}>소개로 가기</Link>
        <button onClick={()=>navigate("/about")}>소개로가기(onclick)</button>
    </div>
  )
}

export default Home