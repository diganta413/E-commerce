import './App.css';
import {useState} from "react";
import Header from "./Components/Header";
import Carousal from "./Components/Carousal";
import {Switch,Route,Link} from "react-router-dom";

function App() {
  const [dis,setdis] = useState(false)
  // Sample change
  return (
    <div className="App" style={{background: dis?"#0007":"white"}}>
          <Header/>
          <Carousal/>
    </div>
  );
}

export default App;
