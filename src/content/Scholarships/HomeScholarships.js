import React, { Component,useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { BrowserRouter as Router, Link, Route ,useParams,useRouteMatch,Switch} from "react-router-dom";

export default function HomeScholarships() {
    const { url, path } = useRouteMatch();
    const [togle ,setTogle] = useState(1);
    const togleTab =(index)=>{
    setTogle(index)
    }
return (
    
  <Router>      
    <div className="condiv">
    <div className="connave">
    <div className={togle === 1 ? "itemNaveactive-nave" : "itemNave"}>
        <Link onClick={() => togleTab(1)} to={`${url}/education`}>จัดการร้านค้า</Link>
      </div>
      <div className={togle === 2 ? "itemNaveactive-nave" : "itemNave"}>
        <Link onClick={() => togleTab(2)} to={`${url}/education`}>จัดการร้านค้า</Link>
      </div>
      <div className={togle === 3 ? "itemNaveactive-nave" : "itemNave"}>
        <Link onClick={() => togleTab(3)} to={`${url}/education`}>จัดการร้านค้า</Link>
      </div>
      <div className={togle === 4 ? "itemNaveactive-nave" : "itemNave"}>
        <Link onClick={() => togleTab(4)} to={`${url}/education`}>จัดการร้านค้า</Link>
      </div>
      <div className={togle === 5 ? "itemNaveactive-nave" : "itemNave"}>
        <Link onClick={() => togleTab(5)} to={`${url}/education`}>จัดการร้านค้า</Link>
      </div>
    </div>
    <div className="content"> 
        
    </div>
  </div>
  </Router> 
);
}
