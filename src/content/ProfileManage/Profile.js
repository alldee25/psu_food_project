import React, { useContext } from "react";
import { useState } from "react";
import {AuthContext} from '../../App'
import "./Profile.css";

export default function Profile() {
  const {auth} = useContext(AuthContext)
  return (
    <div className="frame">
       <div className="Profile">
        <div className="inProfile">
      </div>
      </div >
      <div className="name">
        <h4>{auth.usersData[0].name}</h4>
      </div>
    </div>
  );
}
