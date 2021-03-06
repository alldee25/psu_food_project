import React, { useState,useRef, useEffect} from "react";
import "./StoreRegis.css";
import {BrowserRouter as Router,Link,Route,useLocation,useRouteMatch} from "react-router-dom";
//for Component---------------------------------------------------------Import----------------------------------------------------------------------------------------
import ApplicationAnnouncement from "./AnnouncementForm";
import CheckApplication from "./ApplicationsList";
import InterView from "./InterViewList";
import DataListAnnounce from "./AnnounceList";
import StoreInformation from "./StoreInformationList";
import LeaveList from "./LeaveList";
import ComplaintList from "./ComplaintList";
//for ---------------------------------------------------------Import ----------------------------------------------------------------------------------------

//for MUI---------------------------------------------------------Import----------------------------------------------------------------------------------------
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import CleanlinessLevel from "./CleanlinessLevelList";
import RentalFeeList from "./RentalFeeList";

//for MUI---------------------------------------------------------functons out----------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    
  },
}));


//-----------------------------------------------------------------------------------//--------------------------------------------------------------------

export default function HomeStore(props) {
  const { url, path } = useRouteMatch();
  const [togle, setTogle] = useState(1);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);
  const anchorRef = useRef(null);
  const location = useLocation()
  
  const togleTab = (index) => {
    setTogle(index); 
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
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

    if ((location.pathname == '/HomeStore/CleanlinessLevel') && (prevOpen.current == false && open == false) ) {
      setTogle(2)
    }
    else if((location.pathname == '/HomeStore/CheckApplication') && (prevOpen.current == false && open == false)){
      setTogle(3)
    }
    else if((location.pathname == '/HomeStore/LeaveList') && (prevOpen.current == false && open == false)){
      setTogle(4)
    }
    else if((location.pathname == '/HomeStore/ComplaintList') && (prevOpen.current == false && open == false)){
      setTogle(5)
    }
    else if((location.pathname == '/HomeStore/StoreInformation') && (prevOpen.current == false && open == false)){
      setTogle(6)
    }
    if (prevOpen.current === true && open === false) {
      
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return (
    <Router>
      <div className="condiv">
        <div className="connave">        
          <div className={togle === 1 ? "itemNaveactive-nave" : "itemNave"}>
            <div className={classes.root}>
              <div>
                
                <Link to="#" onClick={handleToggle} style={{ display: "flex", alignItems: "center" }}>
                  ?????????????????????             
                  <div>
                    <ExpandMoreRoundedIcon style={{ color: "red",marginTop: "3px",marginLeft: "10px"}} ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true" >
                    </ExpandMoreRoundedIcon>
                  </div>                
                </Link>     
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{marginTop:'10px',position:'absolute',left:'10%',zIndex:'2'}}>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                      <Paper style={{borderRadius:'15px',width:'170px'}}>
                        <div style={{width:'40px',height:'50px',position:'absolute',left:'36%',transform:"rotate(45deg)",backgroundColor:"white"}} />
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}><Link to={`${url}`}                     style={{color:'black',textDecorationLine:'none',fontSize:'0.8rem',fontWeight:'bold'}}    onClick={() => togleTab(1)}>??????????????????????????????????????????????????? </Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={`${url}/CheckApplication`}    style={{color:'black',textDecorationLine:'none',fontSize:'0.8rem',fontWeight:'bold'}}    onClick={() => togleTab(1)}>???????????????????????????????????????     </Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to={`${url}/InterView`}           style={{color:'black',textDecorationLine:'none',fontSize:'0.8rem',fontWeight:'bold'}}    onClick={() => togleTab(1)}>?????????????????????????????????????????????   </Link></MenuItem>                
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                      </Grow>
                  )}
                </Popper>
              </div>
            </div> 
          </div>
          <div className={togle === 2 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(2)} to={`${url}/CleanlinessLevel`}>???????????????????????????</Link>
          </div>
          <div className={togle === 3 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(3)} to={`${url}/RentalFeeList`}>??????????????????????????????????????????</Link>
          </div>
          <div className={togle === 4 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(4)} to={`${url}/LeaveList`}>???????????????????????????????????????</Link>
          </div>
          <div className={togle === 5 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(5)} to={`${url}/ComplaintList`}>????????????????????????????????????????????????</Link>
          </div>

          <div className={togle === 6 ? "itemNaveactive-nave" : "itemNave"}>
            <Link onClick={() => togleTab(6)} to={`${url}/StoreInformation`}>???????????????????????????????????????</Link>
          </div>
        </div>
{/*<!-- ----------------------------------------------------------------------------------------------------Content-------------------------------------------------- -->*/}
          
            <div className="content">             
                <Route exact path={`${path}`} component={DataListAnnounce} />
                <Route exact path={`${path}/RentalFeeList`}component={RentalFeeList} />
                <Route exact path={`${path}/CheckApplication`}component={CheckApplication} />
                <Route exact  path={`${path}/InterView`} component={InterView} />
                <Route  exact path={`${path}/ApplicationAnnouncement`} component={ApplicationAnnouncement} />
                <Route  exact path={`${path}/StoreInformation`} component={StoreInformation} />
                <Route  exact path={`${path}/CleanlinessLevel`} component={CleanlinessLevel} />
                <Route  exact  path={`${path}/LeaveList`} component={LeaveList} />
                <Route  exact  path={`${path}/ComplaintList`} component={ComplaintList} />
            </div>       
          </div>  
        </Router>
  
  );
}
