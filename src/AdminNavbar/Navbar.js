import React, {Component, useEffect, useState} from 'react';
import Profile from "../content/ProfileManage/Profile"
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import Logout from '../Logout/Logout'
import { useRouteMatch } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'

function Navbar (){
    const [Navbar, setNavbar] = useState(1)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname == '/HomeStore') {
            setNavbar(2)
          }
          else if(location.pathname == '/HomeMade'){
            setNavbar(3)
          }
          else if(location.pathname == '/HomeScholarships'){
            setNavbar(4)
          }
          else if(location.pathname == '/HomeArea'){
            setNavbar(5)
          }
          else if(location.pathname == '/HomeAdmin'){
            setNavbar(6)
          }
    }, [])
        return(
            <nav>
                <ul>
                    <Profile />
                    <li className={Navbar === 1 ? 'active' : ''}>
                    <Link item="Dachboad"   to="/Admin" onClick={()=>{setNavbar(1)}}>
                        <div className="it">
                            <div className="icon">
                                <DashboardRoundedIcon />
                            </div>
                            <div className="text">
                                Dachboad
                            </div>
                        </div>
                    </Link>
                    </li>                     
                    <li className={Navbar === 2 ? 'active' : ''}>
                        <Link item="ร้านค้า"  to="/HomeStore"              onClick={()=>{setNavbar(2)}}>
                        <div className="it">
                                <div className="icon">
                                    <StoreRoundedIcon />
                                </div>
                                <div className="text">
                                    ร้านค้า
                                </div>
                            </div>
                        </Link> 
                    </li>                 
                    <li className={Navbar === 3 ? 'active' : ''}>
                        <Link item="แม่บ้าน"  to="/HomeMade"              onClick={()=>{setNavbar(3)}}>
                            <div className="it">
                                <div className="icon">
                                    <StoreRoundedIcon />
                                </div>
                                <div className="text">
                                    แม่บ้าน
                                </div>
                            </div>
                        </Link>  
                    </li>               
                    <li className={Navbar === 4 ? 'active' : ''}>
                        <Link item="ทุนการศึกษา"  to="/HomeScholarships"   onClick={()=>{setNavbar(4)}}>
                            <div className="it">
                                <div className="icon">
                                    <StoreRoundedIcon />
                                </div>
                                <div className="text">
                                    ทุนการศึกษา
                                </div>
                            </div>
                        </Link> 
                    </li>             
                    {/* <li className={Navbar === 5 ? 'active' : ''}>
                        <Link item="จัดการสถานที่"  to="/HomeArea"       onClick={()=>{setNavbar(5)}}>
                            <div className="it">
                                <div className="icon">
                                    <StoreRoundedIcon />
                                </div>
                                <div className="text">
                                    จัดการสถานที่
                                </div>
                            </div>
                        </Link>  
                    </li> */}  
                    <li className={Navbar === 6 ? 'active' : ''}>
                    <Link item="Admin"  to="/HomeAdmin"                 onClick={()=>{setNavbar(6)}}>
                        <div className="it">
                            <div className="icon">
                                <StoreRoundedIcon />
                            </div>
                            <div className="text">
                                Admin
                            </div>
                        </div>
                        </Link>  
                    </li> 
                </ul>               
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Logout/>
                </div>
            </nav>
        )
}
export default Navbar;