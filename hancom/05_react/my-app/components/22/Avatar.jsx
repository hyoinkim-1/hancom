const Avatar = ({name, online})=>{
    return (
        <>
            <h1>{name}</h1>
            {online && <p>online</p>}
        </>
    )
}

export default Avatar