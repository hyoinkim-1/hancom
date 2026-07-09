import './greeting.css'

const Greeting = (props)=>{
    return (
        <>
            <p className='hi'>{props.name}</p>
        </>
    )
};

export default Greeting