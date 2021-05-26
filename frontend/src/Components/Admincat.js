import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import Categories from "./Categories";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import "../Styles/Admincat.css";

function Admincat() {
    const [categories,setcategories] = useState()
    const [loader,setloader] = useState(true)
    const [show,setshow] = useState(false)
    const [name,setname] = useState()
    const [img,setimg] = useState()

    useEffect(() => {
        const getcategories = async () => {
            await axios.get("http://127.0.0.1:5000/category/")
            .then((res) => {
                setcategories(res.data)
                setloader(false)
            })
            .catch((err) => console.log(err))
        }
        getcategories();
    }, [categories])

    

    return (
        <div className="admin_cat">
            <div style={{ backgroundColor: "#2874f0",display: "flex",justifyContent: "space-between",alignItems: "center" }}>
                <h2 style={{ color: "white",fontWeight: "bolder",marginLeft: "5%",padding: "2%" }}>Admin Dashboard</h2>
                <div style={{ display: "flex",justifyContent: "right",alignItems: "center",marginRight: "5%" }}>
                    <Link to="/admin" style={{ color: "white",marginRight: "10px",padding: "2px 5%",fontSize: "20px",fontWeight: "bolder",borderRadius: "30px" }}>Products</Link>
                    <Link to="/admin_cat" style={{ color: "white",marginRight: "10px",padding: "2px 5%",fontSize: "20px",fontWeight: "bolder",borderRadius: "30px" }}>Categories</Link>
                </div>
            </div>
            <button style={{ padding: "1% 0",width: "20%",marginLeft: "41%",backgroundColor: "#f9f871",color: "black",fontSize: "30px",fontWeight: "bolder",outline: "none",borderRadius: "10px",marginTop: "20px" }} onClick={() => setshow(!show)}>Add new category</button>
        {loader?<CircularProgress style={{ display: "block",marginTop: "15%",marginLeft: "50%" }}/>:
        (
            <div className="categories" style={{width: "90%",margin: "3% auto",backgroundColor: "white"}}>
            <h2 style={{ marginLeft: "20px",fontSize: "40px",fontWeight: "bolder",marginTop: "20px",paddingTop: "1%" }}>Categories</h2>
            <hr/>
            <div style={{ display: "flex",alignItems: "center",alignItems: "center" }} className="category">
                {categories?.map((category) => (
                    <div style={{ margin: "0 2%",display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center" }}>
                        <img src={category?.imageUrl} style={{ height: "200px",width: "200px",objectFit: "contain" }}></img>
                        <p style={{ fontWeight: "bolder",fontSize: "20px" }}>{category?.name}</p>
                        <p style={{ color: "grey",fontWeight: "bolder",fontSize: "17px" }}>Shp now!!</p>
                    </div>
                ))}
            </div>
        </div>
        )
        }
        <Modal
            show={show}
            onHide={() => setshow(!show)}
            centered
            animation={true}
            className="product_moadal"
            >
                <Modal.Body style={{ display: "block" }}>
                <div style={{ backgroundColor: "#f9f871",borderRadius: "30px" }}>
                    <p style={{ color: "black",fontWeight: "bolder",marginLeft: "30%",padding: "2%",fontSize: "25px" }}>Enter product details</p>
                </div>
                    <form style={{ display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",margin: "auto" }} className="product_form">
                        <label for="name">Enter name</label>
                        <input id="name" placeholder="Enter name" type="text" value={name} onChange={(e) => setname(e.target.value)}></input>
                        <label for="image">Choose a image</label>
                        <input id="image" type="file" style={{ marginLeft: "10%" }}  onChange={(e) => setimg(e.target.files[0])}></input>
                        <button type="submit" style={{ padding: "2% 0",width: "20%",backgroundColor: "#f9f871",color: "black",fontSize: "15px",fontWeight: "bolder",outline: "none",borderRadius: "10px",marginTop: "20px" }}>Add Product</button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Admincat
