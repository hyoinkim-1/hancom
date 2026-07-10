const Menu = ({data})=>{
    return (
        <>
            <nav className="flex justify-around bg-gray-200 gap-4 p-4">
                {data.map((item, index) => (
                    <div className="bg-white w-40 h-10 flex items-center justify-center" key={index}>{item}</div>
                ))}
            </nav>
        </>
    )
}
export default Menu