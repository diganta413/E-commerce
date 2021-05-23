import './App.css';
import {useState} from "react";
import Header from "./Components/Header";
import Carousal from "./Components/Carousal";
import {Switch,Route,Link,BrowserRouter as Router} from "react-router-dom";
import Categories from "./Components/Categories";
import Category from "./Components/Category";

function App() {
  const [dis,setdis] = useState(false)
  // Sample change
  return (
    <div className="App" style={{background: dis?"#0007":"white"}}>
      <Router>
        <Switch>
          <Route path="/:category">
              <Category/>
          </Route>
          <Route path="/" exact> 
            <Header/>
            <Carousal/>
            <Categories/>
          </Route>
        </Switch>
      </Router>
          
    </div>
  );
}

export default App;
