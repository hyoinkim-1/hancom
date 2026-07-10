const Tag = ({tags})=>{
    return (
        <div>
            {tags.map((tag)=>{
                return <span key={tag}>#{tag}</span>
            })}
        </div>
    )
}
export default Tag