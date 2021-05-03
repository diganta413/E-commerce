import React,{useState} from 'react'
import "../Styles/Signin.css";

function Modal({dis}) {
    const [name,setname] = useState("");
    const [password,setpassword] = useState("");

    return (
        <form className={dis?"Modal_display":"Modal"}>
            <input placeholder="Enter name" value={name} onChange={(e) => setname(e.target.value)}></input>
            <input placeholder="Enter passwerd" value={password} onChange={(e) => setpassword(e.target.value)}></input>
            <button type="submit">Log in</button>
        </form>
    )
}

export default Modal
