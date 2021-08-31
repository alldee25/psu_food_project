import React, { Component,useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { BrowserRouter as Router, Link, Route ,useParams,useRouteMatch,Switch} from "react-router-dom";
import AdminMember from './AdminMember'
import AdminWorkManage from "./AdminWorkManage";

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
            <div className={togle === 2 ? "itemNaveactive-nave" : "itemNave"}>
              <Link onClick={() => togleTab(2)} to={`${url}/AdminWorkManage`}>จัดการงานผู้รับผิดชอบ</Link>
            </div>             
          </div>
          <div className="content"> 
              <Route exact   path={`${path}/`} component={AdminMember} />
              <Route    path={`${path}/AdminWorkManage`} component={AdminWorkManage} />
          </div>
        </div>
      </Router> 
    )
}
