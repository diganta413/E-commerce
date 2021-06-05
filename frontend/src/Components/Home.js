import React,{useEffect} from 'react'
import Carousal from './Carousal'
import Categories from './Categories'
import Header from './Header'
import {get_all_products} from "../Actions/productActions";
import {useDispatch} from "react-redux";

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_all_products())
    }, [])
    return (
        <div>
            <Header/>
            <Carousal/>
            <Categories/>
        </div>
    )
}

export default Home
