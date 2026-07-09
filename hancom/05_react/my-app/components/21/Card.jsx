const Card = ({title, emoji, desc})=>{
    return (
        <>
            <p>{title}</p>
            <p>{emoji}</p>
            <p>{desc}</p>
        </>
    );
}

export default Card