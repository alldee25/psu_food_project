import React, { Component, useContext, useState } from "react";
import { IconName } from "react-icons/fa";
import {BrowserRouter as Router,Link,Route,useParams,useRouteMatch,Switch,} from "react-router-dom";
import { AuthContext } from "../../App";

import "./Dachboad.css";

const HomeDachboad = () => {

  const {auth} = useContext(AuthContext)
  const { url, path } = useRouteMatch();
  const [togle, setTogle] = useState(1);
  const togleTab = (index) => {
    setTogle(index);
  };

  return (
    <Router>
      <div className="condiv">
      <div className="on" >
        <div className="left">
          <h1>
            สวัสดี {auth.usersData[0].name}
          </h1>
        </div>
        <div className="Right">
        <h1>
            Right
          </h1>
        </div>
      </div>
      <div className="under">
         <div className="container1">
          <div className="item">
            <div className="initem">
          <h1>256</h1>
            </div>
            <div className="initem">
            <h1>256</h1>
            </div>
            <div className="initem">
            <h1>256</h1>
            </div>
          </div>
          <div className="contentDach" style={{opacity:'0.7',position:'relative'}}>
            <h1 style={{position:'absolute',left:'10px'}}>This content</h1>
          </div>
        </div>
        <div className="container2" style={{opacity:'0.7'}}>
          <h1>Hi</h1>
        </div>

      </div>
      </div>
       
    </Router>
  );
};
export default HomeDachboad;
