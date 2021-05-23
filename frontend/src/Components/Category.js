import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';

function Category() {
    const { category } = useParams();
    const [products,setproducts] = useState();
    console.log(category)

    useEffect(() => {
        const get_all = async () => {
            await axios.get(`http://127.0.0.1:5000/products/${category}`)
            .then((res) => setproducts(res.data))
            .catch((err) => console.log(err))
        }

        get_all();
        
    }, [])

    return (
        <div style={{ padding: "1%",display: "flex" }}>
            <div className="filters" style={{ width: "200px", textAlign: "center" ,borderRadius: "10px",height: "90%",backgroundColor: "white",flex: "0.2",marginRight: "10px" }}>
                <h2>Filters</h2>
                <hr/>
            </div>
            <div className="products" style={{ flex: "0.8",backgroundColor: "white",borderRadius: "10px",overflowY: "overlay" }}>
                <h2 style={{ margin: "0 45%" }}>Results</h2>
                <hr/>
                <div style={{ marginTop: "10px",display: "grid",gridTemplateColumns: "repeat(5, 1fr)",gridGap: "20px" }}>
                {products?.map((prod) => (
                    <div style={{ display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",margin: "10px 20px",textAlign: "left" }}>
                        <img src={prod?.imageUrl} style={{ height: "300px",width: "200px",objectFit: "contain" }}></img>
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
        </div>
    )
}

export default Category
