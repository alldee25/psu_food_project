import React, { useState,useEffect } from "react";
import "./App.css";
import './content/content.css'
import { BrowserRouter as Router, Route,Link, Switch, useLocation, useRouteMatch } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
//content
/* import Navbar from './users/Navbar/Navbar' */

import indexPage from "./users/indexPage";
import Admin from "./Admin/Admin"
import Student from './users/Student/Student'
import Teacher from './users/Teacher/Teacher'
import ProtectedRoute from "./users/ProtectedRoute";
import axios from "axios";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import ApplicationDetial from './content/StoreManage/ApplicationFormCheck'
import swal from "sweetalert";

const AuthContext = React.createContext();

export default function App() { 
  
  axios.defaults.withCredentials = true;
  
  const [auth, setAuth] = useState(null);
  const [userImg, setUserImg] = useState('');
  const [animation, setAnimation] = useState('');
  const [userType, setUserType] =  useState('');
  const  [isload, setIsload] = useState(true)
  
useEffect(()=>{
  let isMounted = (
  axios.get("http://localhost:3001/getSession").then((res)=>{
      if(res.data.logedIn === true){
          setAuth(res.data);
          setUserImg(res.data.usersImg);
          setUserType(res.data.UserType);
          setIsload(false)
          
      }
      else{
        setIsload(false)
      }   
  }).catch((error)=>{
    swal('Somthing Wrong About Internet','Click','warning')
    setIsload(false)
  })
  )
  return function cleanup() {
    isMounted = false
  };
},[])

 const transitionsAdmin = useTransition(userType === 'Admin',{
    from:{ opacity: 1, x: -1000},
    enter:{ opacity: 1, x:0},
    leave:{ opacity: 0, x: -1000 }
})
const transitionsStudent = useTransition(userType === 'Student',{
  from:{ opacity: 0, x: -1000},
  enter:{ opacity: 1, x:0},
  leave:{ opacity: 0, x: -1000 }
})
const transitionsTeacher = useTransition(userType === 'Teacher',{
  from:{ opacity: 0, x: -1000},
  enter:{ opacity: 1, x:0},
  leave:{ opacity: 0, x: -1000 }
})
const transitions1 = useTransition(isload,{
  from:{ opacity: 1 },
  enter:{ opacity: 1 },
  leave:{ opacity: 0 },
  
})

  if((auth!=null) && (userType === 'Admin')){
    return (
    <AuthContext.Provider value={{ auth, setIsload,isload,userImg }}>
        {isload === true && <div style={{position:'absolute',top:'50%',left:'50%',color:'black',fontSize:'18px',fontWeight:'bold',zIndex:'4',borderRadius:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}><CircularProgress disableShrink /><p style={{marginTop:'10px'}}>Loading...</p></div>}
        
        {transitions1((styles, item) => item && ( <animated.div  className="blurAdmin" style={styles}>
        </animated.div>))}
      {transitionsAdmin((styles, item) => item && ( <animated.div style={styles}>
        <Router>
        <Route      path="/"  component={Admin}      />        
      </Router>
      </animated.div> ))}
  </AuthContext.Provider>
    )
  }else if((auth!=null) && (userType === 'Student')){
    return(
      <AuthContext.Provider value={{ setIsload }}>
      {isload === true && <CircularProgress disableShrink style={{position:'absolute',top:'50%',left:'50%',color:'black',zIndex:'4',borderRadius:'10px'}}/>}
         {transitionsStudent((styles, item) => item && <animated.div  style={styles}>
        <Router> 
         <Route      path="/"  component={Student}      />          
       </Router>
       </animated.div>)}        
    </AuthContext.Provider>
   
    )
  }
  else if((auth!=null) && (userType === 'Teacher')){
    return(
    <AuthContext.Provider value={{ setIsload }}>
      {transitionsTeacher((styles, item) => item && <animated.div  style={styles}>
      {isload === true && <CircularProgress disableShrink style={{position:'absolute',top:'50%',left:'50%',color:'black',zIndex:'4',borderRadius:'10px'}}/>}
      <Router> 
        <Route      path="/"  component={Teacher}      />          
      </Router>
      </animated.div>)}
    </AuthContext.Provider>

    )
  }
  else{ 
  return (
    <AuthContext.Provider value={{userType, auth, animation, setIsload }}>
      {isload === true && <div style={{position:'absolute',top:'50%',fontWeight:'bold',left:'50%',color:'white',fontSize:'18px',zIndex:'4',borderRadius:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}><CircularProgress disableShrink /><p style={{marginTop:'10px'}}>Loading...</p></div>}
      {transitions1((styles, item) => item && ( <animated.div className="blurAnimation" style={styles}>
      </animated.div> ))} 
        <Router>
        <Route   path="/"     component={indexPage}/>       
      </Router> 
    </AuthContext.Provider>   
  );
}
}
export { AuthContext }

