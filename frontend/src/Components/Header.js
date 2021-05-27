import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Profilemodal from "../Components/Profilemodal";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import jwt from "jsonwebtoken";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import "../Styles/Header.css";

function Header() {

    const [modal,setmodal] = useState(false);
    const [modal_register,setmodal_register] = useState(false);
    const [full_name,setfull_name] = useState("")
    const [email,setemail] = useState("")
    const [pass,setpass] = useState("")
    const [login_error,setlogin_error] = useState("");
    const [register_error,setregister_error] = useState("");
    //const [user,setuser] = useState(null)
    const [profile,setprofile] = useState(false)
    const history = useHistory();

    const user = JSON.parse(sessionStorage.getItem("userInfo"));

    const sign_open = () => {
        if(modal==true)
        {
            setlogin_error("")
            setmodal(false);
            setmodal_register(true);    
        }
        if(modal_register==true)
        {
            setlogin_error("")
            setmodal_register(false)
            setmodal(true)
        }
    }

    

    const submit_register = (e) => {
        e.preventDefault();
        if(!full_name || !email || !pass)
        {
            setregister_error("Please enter all the details");
        }
        else
        {
            const body = {fullname: full_name,email: email,password: pass}
            console.log(body);
            axios.post("http://127.0.0.1:5000/api/register",body)
            .then((res) => {
                console.log(res)
                setemail("")
                setfull_name("")
                setpass("")
            }
            )
            .catch((err) => console.log(err))
        }
    }

    const  submit_login = async (e) => {
        e.preventDefault();
        if(!email || !pass)
        {
            setlogin_error("Please enter all the details")
        }
        else
        {
            const body = {email: email,password: pass}
            await axios.post("http://127.0.0.1:5000/api/login",body)
            .then((res) => {
                jwt.verify(res.data.token, 'Secrettoken', async function(err, decoded) {
                    //console.log(decoded)
                    setemail("")
                    setpass("")
                    await axios.get(`http://127.0.0.1:5000/api/${decoded?._id}`,{
                        headers:{
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${res.data.token}`
                        }
                    })
                    .then((response) => {
                        sessionStorage.setItem("userInfo",JSON.stringify(response.data))
                        //setuser(JSON.parse(localStorage.getItem("userInfo")))
                        setTimeout(() => {
                            setmodal(false)
                        },2000)    
                    })
                    .catch((error) => console.log(error))
                  });
            })
            .catch((err) => console.log(err))
        }
    }

    const open_modal = () => {
        setlogin_error("")
        setregister_error("")
        setmodal(!modal)
    }

    
    
    return (
        <div className="Header">
            <div className="Header_main">
                <div className="Header_left">
                    <img src="https://logos-download.com/wp-content/uploads/2016/09/Flipkart_logo.png"></img>
                    <div className="search">
                    <input placeholder="Search for products"></input>
                    <SearchIcon/>
                    </div>
                    
                </div>
                <div className="Header_right">
                        {user?
                        (<div style={{ display: "flex",justifyContent: "center",alignItems: "center",cursor: "pointer" }} onClick={() => setprofile(!profile)}>
                            <p style={{ fontWeight: "bolder",color: "white",fontSize: "18px",width: "150px",margin: "2% 0" }}>My Account</p>
                            {profile?<ExpandLessIcon style={{ color: "white" }}/>:<ExpandMoreIcon style={{ color: "white" }}/>}
                        </div>)
                        :
                        
                        (
                            <IconButton onClick={open_modal}>
                                <AccountCircleIcon style={{ color: "white" }} fontSize="large"/>
                            </IconButton>
                        )
                        }
                        
                            
                    
                    
                    <IconButton>
                        <ShoppingCartIcon style={{ color: "white" }} fontSize="large"/>
                    </IconButton>
                    
                </div>
            </div>
            <Modal
      show={modal}
      onHide={() => {
          setmodal(!modal)
          setemail("")
          setpass("")
      }}
      centered
      animation={true}
      className="loginmodal"
      style={{ display: "flex" }}
    >
      
      <Modal.Body
      style={{ margin: "0 !important" }}>
        <div className="modal_left" style={{ flex: "0.4",backgroundColor: "#2874f0",maxWidth: "40%",height: "100%",padding: "4% 0 2% 1%",marginRight: "auto" }}>
            <h1 style={{ fontWeight: "bolder",padding: "4%",fontSize: "30px" }}>Login</h1>
            <p style={{ fontSize: "20px",padding: "4%",fontWeight: "bolder" }}>Get access to your Orders, Wishlist and Recommendations</p>
            <img src="../ecom.png" style={{ height: "250px",paddingRight: "20%",margin: "auto" }}></img>
        </div>
        <div className="modal_right" style={{ flex: "0.6",height: "100%",marginLeft: "auto",backgroundColor: "white" }}>
            {(login_error) &&
            <p style={{ color: "red",marginLeft: "22%",marginTop: "12px" }}>{login_error}</p>}
        <form noValidate onSubmit={submit_login}>
                <TextField id="standard-basic" label="Enter email" style={{ display: "block",width: "50%",margin: "10% auto" }} value={email} onChange={(e) => setemail(e.target.value)}/>
                <TextField id="standard-basic" label="Enter password" style={{ display: "block",width: "50%",margin: "10% auto" }} value={pass} onChange={(e) => setpass(e.target.value)} type="password"/>
                <button type="submit" style={{ backgroundColor: "#fb641b",color: "white",fontWeight: "bolder",padding : "2% 35%",outline: "none",margin: "10% 8%",border: "none",cursor: "pointer" }}>Log in</button>
                
        </form>
        <span style={{ width: "80%",margin: "0 auto",color: "blue",padding: "10% 5%",cursor: "pointer",display: "block" }} onClick={sign_open}>New to Flipkart?Create an account</span>
        </div>
        
        
      </Modal.Body>
    </Modal>
    <Modal
      show={modal_register}
      onHide={() => {
          setmodal_register(!modal_register)
          setemail("")
          setpass("")
          setfull_name("")
      }}
      centered
      animation={true}
      className="registermodal"
      style={{ display: "flex" }}
    >
      
      <Modal.Body
      style={{ margin: "0 !important" }}>
        <div className="modal_left" style={{ flex: "0.4",backgroundColor: "#2874f0",maxWidth: "40%",height: "100%",padding: "4% 0 2% 1%",marginRight: "auto" }}>
            <h1 style={{ fontWeight: "bolder",padding: "4%",fontSize: "30px" }}>Looks like you're new here!</h1>
            <p style={{ fontSize: "20px",padding: "4%",fontWeight: "bolder" }}>Sign up with email to get started</p>
            <img src="../ecom.png" style={{ height: "250px",paddingRight: "20%",margin: "auto" }}></img>
        </div>
        <div className="modal_right" style={{ flex: "0.6",height: "100%",marginLeft: "auto",backgroundColor: "white" }}>
        {(register_error) &&
            <p style={{ color: "red",marginLeft: "22%",marginTop: "12px" }}>{register_error}</p>}
        <form  onSubmit={submit_register} noValidate>
                <TextField id="standard-basic" label="Enter full name" style={{ display: "block",width: "50%",margin: "5% auto" }} value={full_name} onChange={(e) => setfull_name(e.target.value)}/>            
                <TextField id="standard-basic" label="Enter email" style={{ display: "block",width: "50%",margin: "5% auto" }} value={email} onChange={(e) => setemail(e.target.value)}/>
                <TextField id="standard-basic" label="Enter password" style={{ display: "block",width: "50%",margin: "5% auto" }} value={pass} onChange={(e) => setpass(e.target.value)} type="password"/>
                <button type="submit" style={{ backgroundColor: "#fb641b",color: "white",fontWeight: "bolder",padding : "2% 35%",outline: "none",margin: "10% 8%",border: "none",cursor: "pointer" }} >Register</button>
                
        </form>
        <span style={{ width: "80%",margin: "0 auto",color: "blue",padding: "10% 20%",cursor: "pointer",display: "block" }} onClick={sign_open}>Existing User?Log in</span>
        </div>
        
        
      </Modal.Body>
    </Modal>

    <div className="profile" style={{ position: "absolute",top: "8%",left: "70%",zIndex: "2",width: "300px",display: profile?"block":"none" }}>
            <p style={{ marginTop: "5%" }}><AccountCircleIcon/> My Profile</p>
            <hr/>
            <p><FavoriteIcon/> Wishlist</p>
            <hr/>
            <p><ShoppingBasketIcon/> Orders</p>
            <hr/>
            <p><PowerSettingsNewIcon/> Logout</p>
            <hr style={{ marginBottom: "0"}}/>
            {(user?.role=="Admin") &&
            (<>
                <p onClick={() => history.push("/admin")}><SupervisorAccountIcon/> Admin</p>
                <hr style={{ marginBottom: "0"}}/>
            </>)    
        }
    </div>
        </div>
    )
}

export default Header
