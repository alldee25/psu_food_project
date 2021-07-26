import React, { Component,useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { BrowserRouter as Router, Link, Route ,useParams,useRouteMatch,Switch} from "react-router-dom";
import AdminMember from './AdminMember'

export default function HomeAdmin() {

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
              <Link onClick={() => togleTab(1)} to={`${url}/`}>จัดสมาชิก</Link>
            </div>            
          </div>
          <div className="content"> 
              <Route    path={`${path}/`} component={AdminMember} />
          </div>
        </div>
      </Router> 
    )
}
