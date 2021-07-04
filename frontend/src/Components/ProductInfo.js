import React,{useState,useEffect} from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import {useSelector,useDispatch} from "react-redux";
import {details} from "../Actions/userActions";
import axios from "axios";

function ProductInfo({ product }) {
    const user_details = useSelector(state => state.userDetails.userDetails)
    const [liked,setliked] = useState(false)
    const user = useSelector(state => state.userData.user)

    useEffect(() => {
       if(user)
       {
            if(user_details?.Liked_items)
            {
                const items = user_details?.Liked_items
                items.forEach(element => {
                    if(element?._id == product?._id)
                    {
                        setliked(true)
                    }
                });                
            }
       }
    }, [])

    const like = () => {
        if(user)
        {
            setliked(true)
        const body = {
            prod: product._id
        }
        axios.post(`http://127.0.0.1:5000/api/${user._id}/add_like`,body)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message))
    }
        else
        {
            alert("Please log in!!")
        }
    }

    const dislike = () => {
        if(user)
        {
            setliked(false)
        const body =  {
            prod: product._id
        }
        axios.post(`http://127.0.0.1:5000/api/${user._id}/delete_like`,body)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message))
    }
    else
    {
        alert("Please log in!!")
    }
    }

    return (
        
            <div style={{ display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",margin: "10px 20px",textAlign: "left",padding: "5%" }} className="product_card">
                {(liked)?
                (<IconButton style={{ marginLeft: "auto",marginBottom: "0 !important",fontSize: "20px"}} onClick={like}>
                    <FavoriteIcon style={{ color: "red" }}/>
                </IconButton>):
                (<IconButton style={{ marginLeft: "auto",marginBottom: "0 !important",fontSize: "20px" }} onClick={dislike}>
                    <FavoriteBorderIcon/>
                </IconButton>
                )    
            }
                        
                        <img src={product?.imageUrl} style={{ height: "200px",width: "200px",objectFit: "contain" }}></img>
                        <p style={{ fontSize: "15px",fontWeight: "bolder",overflow: "hidden",height: "50px" }}>{product?.name}</p>
                        <div style={{ display: "flex",alignItems: "center",justifyContent: "left",marginRight: "auto" }}>
                            <p style={{ backgroundColor: "#388e3c",padding: "5px",color: "white",fontSize: "15px",fontWeight: "bolder",borderRadius: "5px",display: "flex",alignItems: "center" }}>{product?.rating}<StarIcon style={{ color: "white",fontSize: "15px",marginLeft: "5px" }}/></p>
                            <p style={{ color: "grey",fontSize: "15px",fontWeight: "bolder",marginLeft: "10px" }}>({product?.reviews})</p>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftruthabout2017.files.wordpress.com%2F2017%2F07%2Ff-assured1.png&f=1&nofb=1" style={{ height: "20px",objectFit: "contain",marginLeft: "10px",marginBottom: "20px" }}></img>
                        </div>
                        <p style={{ fontSize: "18px",fontWeight: "bolder",marginRight: "auto" }}>$ {product?.Price}</p>
                    </div>
        
    )
}

export default ProductInfo
