import React, { useEffect, useState } from 'react'
import './indexPage.css'
import { useTransition,animated } from 'react-spring'
import { BrowserRouter as Router, Route,Link, Switch,useRouteMatch,useLocation, useHistory } from "react-router-dom";
//--------------------------------------This is component
import Navbar from './Navbar/Navbar'
import RegisStore from './RegisStore'
import CheckPoint from './Announcement of results'
import Login from './login'
import IndexAnnoun from './indexAnnoun'
import ForStore from './ForStore'

const AnimaContext = React.createContext();

export default function IndexPage() {
     
    const location = useLocation();
    const history = useHistory()
    const [anim, setAnimation] = useState('out');


    return(
    <AnimaContext.Provider value={{ setAnimation }}>
        <Router>         
            <div className="Index"> 
                <div className="fillter">
                    <Navbar pathname={location.pathname}/>  
                    <Route     exact      path={`/ForStore`}  component={ForStore} />                         
                    <Route     exact      path={`/RegisStore`}  component={RegisStore} /> 
                    <Route     exact      path={`/CheckPoint`} component={CheckPoint} />
                    <Route     exact      path={`/login`}       component={Login} />
                    <IndexAnnoun />          
                </div>
            </div>       
        </Router>
    </AnimaContext.Provider>  
    ) 
}
export { AnimaContext };
