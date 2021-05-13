import React,{useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import "../Styles/Header.css";
import Profilemodal from "../Components/Profilemodal";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';

function Header() {

    const [modal,setmodal] = useState(false);
    const [modal_register,setmodal_register] = useState(false);

    const sign_open = () => {
        if(modal==true)
        {
            setmodal(false);
            setmodal_register(true);
        }
        if(modal_register==true)
        {
            setmodal_register(false)
            setmodal(true)
        }
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
                    <IconButton onClick={() => setmodal(true)}>
                        <AccountCircleIcon style={{ color: "white" }} fontSize="large"/>
                    </IconButton>
                    <IconButton>
                        <ShoppingCartIcon style={{ color: "white" }} fontSize="large"/>
                    </IconButton>
                    
                </div>
            </div>
            <Modal
      show={modal}
      onHide={() => setmodal(!modal)}
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
        <form className="modal_right" style={{ flex: "0.6",height: "100%",marginLeft: "auto",backgroundColor: "white" }}>
                <TextField id="standard-basic" label="Enter email" style={{ display: "block",width: "50%",margin: "10% auto" }}/>
                <TextField id="standard-basic" label="Enter password" style={{ display: "block",width: "50%",margin: "10% auto" }}/>
                <button type="submit" style={{ backgroundColor: "#fb641b",color: "white",fontWeight: "bolder",padding : "2% 35%",outline: "none",margin: "10% 8%",border: "none",cursor: "pointer" }}>Log in</button>
                <a style={{ width: "80%",margin: "10% auto",color: "blue",padding: "25% 20% 5% 20%",cursor: "pointer" }} onClick={sign_open}>New to Flipkart?Create an account</a>
        </form>
      </Modal.Body>
    </Modal>
    <Modal
      show={modal_register}
      onHide={() => setmodal_register(!modal_register)}
      centered
      animation={true}
      className="loginmodal"
      style={{ display: "flex" }}
    >
      
      <Modal.Body
      style={{ margin: "0 !important" }}>
        <div className="modal_left" style={{ flex: "0.4",backgroundColor: "#2874f0",maxWidth: "40%",height: "100%",padding: "4% 0 2% 1%",marginRight: "auto" }}>
            <h1 style={{ fontWeight: "bolder",padding: "4%",fontSize: "30px" }}>Looks like you're new here!</h1>
            <p style={{ fontSize: "20px",padding: "4%",fontWeight: "bolder" }}>Sign up with email to get started</p>
            <img src="../ecom.png" style={{ height: "250px",paddingRight: "20%",margin: "auto" }}></img>
        </div>
        <form className="modal_right" style={{ flex: "0.6",height: "100%",marginLeft: "auto",backgroundColor: "white" }}>
                <TextField id="standard-basic" label="Enter full name" style={{ display: "block",width: "50%",margin: "5% auto" }}/>            
                <TextField id="standard-basic" label="Enter email" style={{ display: "block",width: "50%",margin: "5% auto" }}/>
                <TextField id="standard-basic" label="Enter password" style={{ display: "block",width: "50%",margin: "5% auto" }}/>
                <button type="submit" style={{ backgroundColor: "#fb641b",color: "white",fontWeight: "bolder",padding : "2% 35%",outline: "none",margin: "10% 8%",border: "none",cursor: "pointer" }}>Register</button>
                <a style={{ width: "80%",margin: "10% auto",color: "blue",padding: "25% 20% 5% 33%",cursor: "pointer" }} onClick={sign_open}>Existing User?Log in</a>
        </form>
      </Modal.Body>
    </Modal>
        </div>
    )
}

export default Header
