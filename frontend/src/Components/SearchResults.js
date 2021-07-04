import React,{useEffect,useState} from 'react'
import {useSelector} from "react-redux";
import {useParams,useHistory} from "react-router-dom";
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductInfo from "./ProductInfo";
import "../Styles/Category.css";

function SearchResults() {
    const { loading,productList } = useSelector(state => state.products)
    const { query } = useParams()
    const [queryList,setqueryList] = useState([])
    const [value,setvalue] = useState(20000)
    const [min,setmin] = useState(0)
    const [max,setmax] = useState(20000)
    const [sort,setsort] = useState()
    const [cat_prod,setcat_prod] = useState()
    const [change,setchange] = useState(false)

    useEffect(() => {
        var cat_list = []
        productList.forEach((prod) => {
            
            if(prod?.name.toLowerCase().includes(query.toLowerCase()))
            {
                cat_list.push(prod)
            }
        })
        setqueryList(cat_list)
        setchange(!change)
    }, [])


    function sort_by_price(a,b){
        if ( parseInt(a.Price) < parseInt(b.Price)){
            return -1;
          }
          if ( parseInt(a.Price) > parseInt(b.Price) ){
            return 1;
          }
          return 0;
        }

        function sort_by_rating(a,b){
            if ( parseFloat(a.rating) < parseFloat(b.rating)){
                return -1;
              }
              if ( parseFloat(a.rating) > parseFloat(b.rating) ){
                return 1;
              }
              return 0;
        }
        function sort_by_reviews(a,b){
            if ( parseInt(a.reviews) < parseInt(b.reviews)){
                return -1;
              }
              if ( parseInt(a.reviews) > parseInt(b.reviews) ){
                return 1;
              }
              return 0;
        }
    

    const sort_changed = (e) => {
        var prods = queryList;
        if(e.target.value == "By Price")
        {
        prods.sort(sort_by_price)
        }
        if(e.target.value == "By Rating")
        {
            prods.sort(sort_by_rating)
        }
        if(e.target.value == "By Total Reviews")
        {   
            prods.sort(sort_by_reviews)
        }
        setcat_prod(prods)
        setchange(!change)
    }

    const slider_changed = (e) => {
        setvalue(e.target.value)
        const max = parseInt(e.target.value)
        var new_list = []
        productList.forEach((prod) => {
            if((parseInt(prod.Price) <= max) && (prod.name.toLowerCase().includes(query.toLowerCase())))
            {
                console.log(prod)
                new_list.push(prod)
            }
        })
        setqueryList(new_list)
        setchange(!change)
    }

    const slided = () => {
        const max = parseInt(value)
        var new_list = []
        productList.forEach((prod) => {
            if((parseInt(prod.Price) <= max) && (prod.name.toLowerCase().includes(query.toLowerCase())))
            {
                console.log(prod)
                new_list.push(prod)
            }
        })
        setqueryList(new_list)
        setchange(!change)
    }



    return (
        <div style={{ padding: "1%",display: "flex" }}>
        <div className="filters" style={{ width: "200px" ,borderRadius: "10px",minHeight: "90vh",backgroundColor: "white",flex: "0.2",marginRight: "10px" }}>
            <h2 style={{ margin: "8% 35%",fontWeight: "bolder" }}>Filters</h2>
            <hr/>
            <div>
                <h3 style={{ fontWeight: "bolder",marginLeft: "20px" }}>Price</h3>
                <Slider value={value} max={max} min={min} onChange={(e,newvalue) => setvalue(newvalue)} onChangeCommitted={slided} style={{ width: "80%",marginLeft: "10%" }}/>
                <div style={{ display: "flex",alignItems: "center",justifyContent: "center",maxWidth: "80%",marginLeft: "5%" }}>
                    <p style={{ margin: "5%" }}>$</p>
                    <input value={min} onChange={(e) => setmin(e.target.value)} style={{ width: "80px",outline: "none",borderRadius: "5px" }}></input>
                    <p style={{ margin: "0 10px" }}>to</p>
                    <input value={value} onChange={slider_changed} style={{ width: "80px",outline: "none",borderRadius: "5px" }}></input>
                </div>
                <FormControl component="fieldset" style={{ margin: "10%" }}>
                    <FormLabel component="legend" style={{ color: "black",fontWeight: "bolder" }}>Sort By</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={sort} onChange={sort_changed}>
                            <FormControlLabel value="By Rating" control={<Radio color="primary"/>} label="By Rating" />
                            <FormControlLabel value="By Price" control={<Radio color="primary"/>} label="By Price" />
                            <FormControlLabel value="By Total Reviews" control={<Radio color="primary"/>} label="By Total Reviews" />
                        </RadioGroup>
                </FormControl>
            </div>
        </div>
        <div className="products" style={{ flex: "0.8",backgroundColor: "white",borderRadius: "10px",overflowY: "overlay",minHeight: "90vh" }}>
            <h2 style={{ margin: "2% 45%",fontWeight: "bolder" }}>Products</h2>
            <hr/>
            <div style={{ marginTop: "10px",display: "grid",gridTemplateColumns: "repeat(5, 1fr)",gridGap: "20px" }}>
            {loading?
            (<CircularProgress style={{ margin: "20%",marginLeft: "60%" }}/>):
            (queryList?.map((prod) => (
                
                <ProductInfo product={prod}/>
                
            )
            ))}
            </div>
            
        </div>
    </div>
    )
}

export default SearchResults
