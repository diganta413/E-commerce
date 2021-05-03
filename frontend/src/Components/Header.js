import React,{useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import "../Styles/Header.css";
import Profilemodal from "../Components/Profilemodal";

function Header() {

    const [modal,setmodal] = useState(false);

    const sign_open = () => {
        setmodal(!modal);
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
                    <IconButton onClick={sign_open}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <IconButton>
                        <ShoppingCartIcon/>
                    </IconButton>
                    
                </div>
            </div>
            {modal &&
            <Profilemodal/>}
        </div>
    )
}

export default Header
