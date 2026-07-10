const Alert = ({type, text})=>{
    const map = {
        success : {icon : 'check_circle', color : 'green'},
        error : {icon : 'error', color : 'red'},
        warning : {icon : 'warning', color : 'orange'},
    }

    const cfg = map[type];

    return (
        <>
            <p style={{ color: cfg.color }}>{cfg.icon}{text}</p>
        </>
    )
}
export default Alert