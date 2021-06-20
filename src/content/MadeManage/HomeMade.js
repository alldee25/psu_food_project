import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useParams,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import About from "../About";


const HomeMade = () => {
  const { path, url } = useRouteMatch();
  
  const [togle ,setTogle] = useState(1);
  const togleTab =(index)=>{
    setTogle(index)
  }

  return (
    <Router>
      <div className="condiv">
        <div className="connave">
          <div className={togle === 1 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(1)} to={`${url}/`}>ตาราง</Link>
          </div>
          <div className={togle === 2 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(2)} to={`${url}/About`}>ข้อมูลแม่บ้าน</Link>
          </div>
          <div className={togle === 3 ? "itemNaveactive-nave" : "itemNave"}>
          <Link onClick={() => togleTab(3)} to={`${url}/education`}>ใบสมัค</Link>
          </div>
        </div>
        <div className="content">
          {/* <Route exact path={`${path}/`} component={}  /> */}
          
        </div>
      </div>
    </Router>
      
      
  );
};


export default HomeMade;
