import React, { useContext, useEffect } from 'react'
import Navbar from "../AdminNavbar/Navbar";
import Home      from "../content/Dachboad/HomeDachboad";
import HomeMade from "../content/MadeManage/HomeMade";
import HomeStore from "../content/StoreManage/NavStore";
import HomeScholarships from "../content/Scholarships/HomeScholarships";
import HomeArea from "../content/AreaManage/HomeArea";
import HomeAdmin from "../content/AdminManage/ืNavAdmin";
import { AuthContext } from '../App';

import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";



function Admin() {

    const {setIsload} = useContext(AuthContext);

    useEffect(()=>{
    setIsload(true)
    setTimeout(function() {
        setIsload(false)
      }, 1500)
},[]) 
    return (
        <Router>
        <div className="App">
        <Navbar />
        <Route exact  path="/Admin"                component={Home}               />
        <Route        path="/HomeStore"            component={HomeStore}          />
        <Route        path="/HomeMade"             component={HomeMade}           />
        <Route        path="/HomeScholarships"     component={HomeScholarships}   /> 
        <Route        path="/HomeArea"             component={HomeArea}           /> 
        <Route        path="/HomeAdmin"            component={HomeAdmin}          />    
        </div> 
    </Router>

    )
}
export default Admin;
