import React,{useState,useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from "react-router-dom";
import "../Styles/Admin.css";

function Admin() {
    const [show,setshow] = useState(false);
    const [categories,setcategories] = useState()
    const [img,setimg] = useState();
    const [name,setname] = useState("")
    const [rating,setrating] = useState("")
    const [review,setreview] = useState("")
    const [price,setprice] = useState("")
    const [cat,setcat] = useState("Monitor")
    const [products,setproducts] = useState()
    const [loader,setloader] = useState(true)

    useEffect(() => {
        const getcategories = async () => {
            await axios.get("http://127.0.0.1:5000/category/")
            .then((res) => setcategories(res.data))
            .catch((err) => console.log(err))
        }
        getcategories();
    }, [])

    useEffect(() => {
        //setloader(true)
        const getproducts = async () => {
            await axios.get("http://127.0.0.1:5000/products/")
            .then((res) => {
                setproducts(res.data)
                setloader(false)
            })
            .catch((err) => console.log(err))
        }
        getproducts()
    }, [products])

    const toBase64 = () => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const submit = async (e) => {
        e.preventDefault();
        const image = await toBase64()
        const obj = {
            name: name,
            image: image,
            rating: rating,
            review: review,
            price: price,
            category: cat
        }
        await axios.post("http://127.0.0.1:5000/admin/add_prod",obj)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const handle_change = (e) => {
        setimg(e.target.files[0])
    }

    const option = (e) => {
        setcat(e.target.value);
    }

    console.log(loader)

    return (
        <div style={{ margin: "auto" }} className="admin">
            <div style={{ backgroundColor: "#2874f0",display: "flex",justifyContent: "space-between",alignItems: "center" }}>
                <h2 style={{ color: "white",fontWeight: "bolder",marginLeft: "5%",padding: "2%" }}>Admin Dashboard</h2>
                <div style={{ display: "flex",justifyContent: "right",alignItems: "center",marginRight: "5%" }}>
                    <Link to="/admin" style={{ color: "white",marginRight: "10px",padding: "2px 5%",fontSize: "20px",fontWeight: "bolder",borderRadius: "30px" }}>Products</Link>
                    <Link to="/admin_cat" style={{ color: "white",marginRight: "10px",padding: "2px 5%",fontSize: "20px",fontWeight: "bolder",borderRadius: "30px" }}>Categories</Link>
                </div>
            </div>
            <button style={{ padding: "1% 0",width: "20%",marginLeft: "41%",backgroundColor: "#f9f871",color: "black",fontSize: "30px",fontWeight: "bolder",outline: "none",borderRadius: "10px",marginTop: "20px" }} onClick={() => setshow(!show)}>Add new product</button>
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
                        <input id="image" type="file" style={{ marginLeft: "10%" }}  onChange={handle_change}></input>
                        <label for="rating">Enter rating</label>
                        <input id="rating" type="text" placeholder="Enter rating" value={rating} onChange={(e) => setrating(e.target.value)}></input>
                        <label for="review">Enter no of reviews</label>
                        <input id="review" type="text" placeholder="Enter no of reviews" value={review} onChange={(e) => setreview(e.target.value)}></input>
                        <label for="price">Enter price</label>
                        <input id="price" type="text" placeholder="Enter Price" value={price} onChange={(e) => setprice(e.target.value)}></input>
                        <label for="cat">Choose a category</label>
                        <select id="cat" onChange={option}>
                            {categories?.map((cat) => (
                                <option value={cat?.name}>{cat?.name}</option>
                            ))}
                        </select>
                        <button type="submit" style={{ padding: "2% 0",width: "20%",backgroundColor: "#f9f871",color: "black",fontSize: "15px",fontWeight: "bolder",outline: "none",borderRadius: "10px",marginTop: "20px" }} onClick={submit}>Add Product</button>
                    </form>
                </Modal.Body>
            </Modal>
            {(loader)?<CircularProgress style={{ display: "block",marginTop: "15%",marginLeft: "50%" }}/>:
                <div className="products" style={{ flex: "0.8",backgroundColor: "white",borderRadius: "10px",overflowY: "overlay",minHeight: "90vh",marginTop: "5%" }}>
                <h2 style={{ margin: "2% 45%",fontWeight: "bolder" }}>Products</h2>
                <hr/>
                <div style={{ marginTop: "10px",display: "grid",gridTemplateColumns: "repeat(5, 1fr)",gridGap: "20px" }}>
                {products?.map((prod) => (
                    <div style={{ display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",margin: "10px 20px",textAlign: "left",padding: "5%" }} className="product_card">
                        <img src={prod?.imageUrl} style={{ height: "200px",width: "200px",objectFit: "contain" }}></img>
                        <p style={{ fontSize: "15px",fontWeight: "bolder",overflow: "hidden",height: "50px" }}>{prod?.name}</p>
                        <div style={{ display: "flex",alignItems: "center",justifyContent: "left",marginRight: "auto" }}>
                            <p style={{ backgroundColor: "#388e3c",padding: "5px",color: "white",fontSize: "15px",fontWeight: "bolder",borderRadius: "5px",display: "flex",alignItems: "center" }}>{prod?.rating}<StarIcon style={{ color: "white",fontSize: "15px",marginLeft: "5px" }}/></p>
                            <p style={{ color: "grey",fontSize: "15px",fontWeight: "bolder",marginLeft: "10px" }}>({prod?.reviews})</p>
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftruthabout2017.files.wordpress.com%2F2017%2F07%2Ff-assured1.png&f=1&nofb=1" style={{ height: "20px",objectFit: "contain",marginLeft: "10px",marginBottom: "20px" }}></img>
                        </div>
                        <p style={{ fontSize: "18px",fontWeight: "bolder",marginRight: "auto" }}>$ {prod?.Price}</p>
                    </div>
                ))}
                </div>
                </div>
            }
            
            
        </div>
    )
}

export default Admin
