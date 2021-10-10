import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import React, {useState } from "react";
import { BrowserRouter as Router, Link, Route ,useRouteMatch, useLocation} from "react-router-dom";
import HourWork from "./HourWork";
import ScholarshipsList from "./ScholarshipsList";
import StudentScholarships from "./StudentScholarships";
import TableWork from "./TableWork";

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
            <Link onClick={() => togleTab(1)} to={`${url}`}>จัดการรายการทุน</Link>
          </div>
          <div className={togle === 2 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(2)} to={`${url}/StudentScholarships`}>จัดการนักศึกษาทุน</Link>
          </div>
          <div className={togle === 3 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(3)} to={`${url}/TableWork`}>ตารางการทำงาน</Link>
          </div>
          <div className={togle === 4 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(4)} to={`${url}/HourWork`}>ชั่วโมงทำงาน</Link>
          </div>
        </div>
        
        <div className="content">     
              <Route exact path={`${path}`} component={ScholarshipsList} />                
            <Route exact path={`${path}/StudentScholarships`} component={StudentScholarships} />
            <Route exact path={`${path}/TableWork`}component={TableWork} />               
            <Route  exact path={`${path}/HourWork`} component={HourWork} />               
        </div>
        
      </div>
      </Router> 
    );
}
