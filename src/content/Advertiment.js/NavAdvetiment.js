import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route ,useRouteMatch} from "react-router-dom";
import AdverList from "./AdverList";

export default function NavAdvetiment() {
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
          <Link onClick={() => togleTab(1)} to={`${url}/`}>รายการโฆษณา</Link>
        </div>
      </div>
{/*<!-- ----------------------------------------------------------------------------------------------------Content-------------------------------------------------- -->*/}
        
          <div className="content">             
              <Route exact path={`${path}`} component={AdverList} />
          </div>       
        </div>  
      </Router> 
);
}
