import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import StarIcon from '@material-ui/icons/Star';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../Styles/Category.css";

function Category() {
    const { category } = useParams();
    const [products,setproducts] = useState();
    const [value,setvalue] = useState(20000)
    const [min,setmin] = useState(0)
    const [max,setmax] = useState(20000)
    const [sort,setsort] = useState()
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
            <div className="filters" style={{ width: "200px" ,borderRadius: "10px",minHeight: "90vh",backgroundColor: "white",flex: "0.2",marginRight: "10px" }}>
                <h2 style={{ margin: "8% 35%",fontWeight: "bolder" }}>Filters</h2>
                <hr/>
                <div>
                    <h3 style={{ fontWeight: "bolder",marginLeft: "20px" }}>Price</h3>
                    <Slider value={value} max={max} min={min} onChange={(e,newvalue) => setvalue(newvalue)} style={{ width: "80%",marginLeft: "10%" }}/>
                    <div style={{ display: "flex",alignItems: "center",justifyContent: "center",maxWidth: "80%",marginLeft: "5%" }}>
                        <p style={{ margin: "5%" }}>$</p>
                        <input value={min} onChange={(e) => setmin(e.target.value)} style={{ width: "80px",outline: "none",borderRadius: "5px" }}></input>
                        <p style={{ margin: "0 10px" }}>to</p>
                        <input value={value} onChange={(e) => setvalue(e.target.value)} style={{ width: "80px",outline: "none",borderRadius: "5px" }}></input>
                    </div>
                    <FormControl component="fieldset" style={{ margin: "10%" }}>
                        <FormLabel component="legend" style={{ color: "black",fontWeight: "bolder" }}>Sort By</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={sort} onChange={(e) => setsort(e.target.value)}>
                                <FormControlLabel value="By Rating" control={<Radio color="primary"/>} label="By Rating" />
                                <FormControlLabel value="By Price" control={<Radio color="primary"/>} label="By Price" />
                                <FormControlLabel value="By Total Reviews" control={<Radio color="primary"/>} label="By Total Reviews" />
                                <FormControlLabel value="None" control={<Radio color="primary"/>} label="None" />
                            </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="products" style={{ flex: "0.8",backgroundColor: "white",borderRadius: "10px",overflowY: "overlay",minHeight: "90vh" }}>
                <h2 style={{ margin: "2% 45%",fontWeight: "bolder" }}>Results</h2>
                <hr/>
                <div style={{ marginTop: "10px",display: "grid",gridTemplateColumns: "repeat(5, 1fr)",gridGap: "20px" }}>
                {products?.map((prod) => (
                    <div style={{ display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",margin: "10px 20px",textAlign: "left",padding: "5%" }} className="product_card">
                        <FavoriteBorderIcon style={{ marginLeft: "auto",marginBottom: "0 !important",fontSize: "20px" }}/>
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
        </div>
    )
}

export default Category
