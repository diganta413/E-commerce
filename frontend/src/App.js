import {useState} from "react";
import Header from "./Components/Header";
import Carousal from "./Components/Carousal";
import {Switch,Route,Link,BrowserRouter as Router} from "react-router-dom";
import Categories from "./Components/Categories";
import Category from "./Components/Category";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import Admincat from "./Components/Admincat";
import SearchResults from "../src/Components/SearchResults";
import './App.css';

function App() {
  const [dis,setdis] = useState(false)
  // Sample change
  return (
    <div className="App" style={{background: dis?"#0007":"white"}}>
      <Router>
        <Switch>
        <Route exact path="/admin_cat" component={Admincat}></Route>
          <Route exact path="/admin" component={Admin}></Route>
          <Route exact path="/"  component={Home}></Route>
          <Route exact path="/:category" component={Category}></Route>
          <Route exact path="/searchpage/:query" component={SearchResults}></Route>
        </Switch>
      </Router>
          
    </div>
  );
}

export default App;
