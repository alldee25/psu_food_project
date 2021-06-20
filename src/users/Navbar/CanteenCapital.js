import React, { useContext, useState } from 'react'
import {Link,useRouteMatch} from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function CanteenCapital(props) {
    
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);


    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
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
       props.activeSetNave(3)
    }
    setOpen(false);
  };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    return (
        <div>
        <button style={{backgroundColor:'transparent',outline:'none',backgroundRepeat:'no-repeat',overflow:"hidden",border:'none'}}  ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true" onClick={handleToggle} style={{textDecoration:'none'}}><div className={props.activeNave === 3 ? "itemNavIndexActive" : "itemNavIndex"}>ทุนโรงอาหาร</div></button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{marginTop:"15px",display:'flex',justifyContent:'center',marginLeft:'20px',position:'relative'}}>
           
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper style={{borderRadius:'15px',backdropFilter:'blur(8px)',background:'37, 37, 37, 0.013'}}>
                <div className="dot" style={{width:'50px',height:'50px',position:'absolute',left:'35%',transform:"rotate(45deg)",backgroundColor:"white"}}></div>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <Link to={`/RegisStore`}  style={{textDecoration:'none',color:'#000024'}}><MenuItem onClick={handleClose}>สมัคทุนโรงอาหาร</MenuItem></Link>
                  <hr style={{width:'90%',position:'absolute',top:'30px',right:'0'}} />
                    <Link to={`/RegisStore1`}  style={{textDecoration:'none',color:'#000024'}}><MenuItem onClick={handleClose}>ประกาศผล</MenuItem></Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>  
        </div>
    )
}
