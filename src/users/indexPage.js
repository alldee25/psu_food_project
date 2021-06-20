import React, { useEffect, useState } from 'react'
import './indexPage.css'
import { useTransition,animated } from 'react-spring'
import { BrowserRouter as Router, Route,Link, Switch,useRouteMatch,useLocation } from "react-router-dom";
//--------------------------------------This is component
import Navbar from './Navbar/Navbar'
import RegisStore from './RegisStore'
import RegisStore1 from './Announcement of results'
import Login from './login'
import IndexAnnoun from './indexAnnoun'
import ForStore from './ForStore'

const AnimaContext = React.createContext();

export default function IndexPage() {
     
    
    const location = useLocation();
    const [anim, setAnimation] = useState('out');
    const transition = useTransition(anim === 'out',{
        from: { opacity: 1,x: 0 },
        enter: { opacity: 0,x: 800 },
    })
       
    return(
    <AnimaContext.Provider value={{ setAnimation }}>
    <Router>         
        <div className="Index"> 
         <div className="fillter">
            <Navbar />  
            <Route     exact      path={`/ForStore`}  component={ForStore} />                         
            <Route     exact      path={`/RegisStore`}  component={RegisStore} /> 
            <Route     exact      path={`/RegisStore1`} component={RegisStore1} />
            <Route     exact      path={`/login`}       component={Login} />
             <IndexAnnoun />          
        </div>
        </div>       
    </Router>
    </AnimaContext.Provider>  
    ) 
}
export { AnimaContext };
