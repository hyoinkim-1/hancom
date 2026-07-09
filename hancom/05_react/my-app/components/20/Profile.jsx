import './profile.css'

const Profile = ({name="효인", job = "개발자"})=>{
    return (
        <>  
            <p className="box">{name}</p>
            <p className="box">{job}</p>
        </>
    );
}

export default Profile