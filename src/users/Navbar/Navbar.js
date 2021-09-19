import React, { useContext, useEffect, useRef, useState } from 'react'
import {Link,useHistory,useLocation,useRouteMatch} from 'react-router-dom'
import { AnimaContext } from '../indexPage';
import "./Navbar.css"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CanteenCapital from './CanteenCapital'
import ForAdmin from './forAdmin'


export default function Navbar(props) {
    const [navbar , setNavbar] = useState(false); 
    const [navAc, setNavAc] = useState(1)
    const { setAnimation} = useContext(AnimaContext);
    const [open, setOpen] = React.useState(false);
    const prevOpen = useRef(open);
    const anchorRef = React.useRef(null);
    const location = useLocation()
    
    const activeNav = (e) =>{
        setNavAc(e)
        if (e === 2) {
            setNavbar(true)  
        }
        else{
            setAnimation('in')
            setNavbar(false)
      }
    }
  
    const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) { 
        return ;
      }
      else if(event.cancelBubble !== false){
         activeNav(2)
      }
      setOpen(false);
    };

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

    useEffect(() => {
      if (location.pathname == '/RegisStore') {
        setNavbar(true)
        setNavAc(2)
      }
      else if(location.pathname == '/login'){
        setNavAc(4)
      }
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
      prevOpen.current = open; 

    }, [open]);

    return ( 
        <div style={{position:'relative'}}>          
          <div className={navbar ? 'NavbarActive1' : 'Navbar'}>          
            <Link to={'/'}  onClick={() => activeNav(1)} style={{textDecoration:'none'}}>
              <div className={navAc === 1 ? "itemNavIndexActive" : "itemNavIndex"}>
                หน้าหลัก 
              </div>
            </Link>
            <button style={{backgroundColor:'transparent',outline:'none',backgroundRepeat:'no-repeat',overflow:"hidden",border:'none'}}  ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true" onClick={handleToggle} style={{textDecoration:'none'}}>
                <div className={navAc === 2 ? "itemNavIndexActive" : "itemNavIndex"}>
                  ร้านค้า
                </div>
            </button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{marginTop:"15px",display:'flex',justifyContent:'center',marginLeft:'20px',position:'relative'}}>
              {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper style={{borderRadius:'15px',backdropFilter:'blur(8px)',background:'37, 37, 37, 0.013'}}>
                <div style={{width:'50px',height:'50px',position:'absolute',left:'35%',transform:"rotate(45deg)",backgroundColor:"white"}} />
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Link to={`/RegisStore`}  style={{textDecoration:'none',color:'#000024'}}>
                      <MenuItem onClick={handleClose}>
                        สมัคเป็นผู้ประกอบการ
                      </MenuItem>
                    </Link>
                  <hr style={{width:'90%',position:'absolute',top:'30px',right:'0'}} />
                    <Link to={`/CheckPoint`}  style={{textDecoration:'none',color:'#000024'}}>
                      <MenuItem onClick={handleClose}>
                        ประกาศผล
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          {/* <CanteenCapital active={handleClose} activeNave={navAc} activeSetNave={setNavAc}/>
            <Link to={`/login`}   onClick={() => activeNav(4)} style={{textDecoration:'none'}}>
              <div className={navAc === 4 ? "itemNavIndexActive" : "itemNavIndex"}>
                ขอใช้สถานที่
              </div>
            </Link> */} 
          <ForAdmin />     
        </div>      
      </div>      

       
    )
    
}
