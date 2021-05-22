import React,{useState,useEffect} from 'react'
import axios from "axios";
import "../Styles/Categories.css";

function Categories() {
    const [categories,setcategories] = useState()
    useEffect(() => {
        const getcategories = async () => {
            await axios.get("http://127.0.0.1:5000/category/")
            .then((res) => setcategories(res.data))
            .catch((err) => console.log(err))
        }
        getcategories(); 
    }, [])
    
    console.log(categories)

    return (
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

export default Categories
