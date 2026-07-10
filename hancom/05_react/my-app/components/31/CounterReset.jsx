const CounterReset = ({setCount})=>{
    return (
        <>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded" onClick={()=>{setCount(()=>0);}}>
                reset
            </button>
        </>
        )
}
export default CounterReset