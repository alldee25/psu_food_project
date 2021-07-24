import React, { useContext } from "react";
import { useState } from "react";
import {AuthContext} from '../../App'
import S__2154499 from '../../img/S__2154499.png'
import "./Profile.css";

export default function Profile() {
  const {auth} = useContext(AuthContext)
  return (
    <div className="frame">
       <div className="Profile">
        <div className="inProfile">
          <img width="auto" height="120" src={S__2154499}/>
      </div>
      </div >
      <div className="name">
        <h4>{auth.usersData[0].name}</h4>
      </div>
    </div>
  );
}
