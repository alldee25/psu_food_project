import axios from "axios";
import React, {  useContext, useState } from "react";
import { useEffect } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { AuthContext } from "../../App";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import "./Dachboad.css";
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import { Bar } from 'react-chartjs-2'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuStoreList from "./MenuStoreList";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import {  useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    borderRadius:15,
    backgroundColor: '#44CFCC',
    marginTop:'10px'
  },
  inline: {
    display: 'inline',
  },
  status: {
    position:'absolute',
    top:0,
    right:10
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  typography: {
    padding: theme.spacing(2),
  },
  LisNoti:{
    backgroundColor: '#44CFCC',
    width:'200px'
  }
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);
const HomeDachboad = () => {

  const date = new Date();
  const [openSave, setOpenSave] = React.useState(false);
  var ThisYears = date.getFullYear()
  const [orderToday,setOrderToday] = useState('');
  const [menuPop,setMenuPop] = useState('');
  const [numMenupop,setNumMenuPop] = useState('');
  const [storeList,setStoreList] = useState([]);
  const {auth} = useContext(AuthContext)
  const classes = useStyles();
  const [chartData,setChartData] = useState([])
  const [storeId,setStoreId] = useState('')
  const [leaveStorenoti,setLeaveStorenoti] = useState([])
  let [count,setcount] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  let  y = Array.from(Array(12)).fill(0);
  const location = useLocation();

  chartData.map((item, i) => {
    y[parseInt(item.month) ] = parseInt(item.quantity)
  });
   const state = {
      labels : [
        "January","February","March","April","May","June","July","August","September","October","November","December",
      ],
      datasets: [{
        data:y,
        label: 'เมนู',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 125, 1)',
          'rgba(153, 102, 201, 1)',
          'rgba(153, 102, 025, 1)',
          'rgba(153, 478, 255, 1)',
          'rgba(153, 32, 255, 1)',
          '#727682',
          'rgba(153, 32, 025, 1)',
          'rgba(255, 206, 235, 1)'
        ],
        borderRadius:5
    }]

    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    

  const handleClickOpensave = (id) => {
    setOpenSave(true); 
    setStoreId(id) 
  };

  const handleCloseSave = () => {
    setOpenSave(false);
  };
  useEffect(()=>{
    axios.post('http://localhost:3001/getDachboardInfomation',{
        date:date
    }).then((res)=> {
      setOrderToday(res.data.sum)
      setMenuPop(res.data.menuPop)
      setNumMenuPop(res.data.numMenuPop)
      
      
    }).then(
      axios.post('http://localhost:3001/getStoreList',{
        ThisYears:ThisYears
      }).then((res)=> {
        
        setStoreList(res.data)
      }).then(
        axios.get('http://localhost:3001/getDataChart').then((res)=> {
          setChartData(res.data) 
          
        })
      ).then(
        axios.post('http://localhost:3001/getLeaveByprecess')
      .then((res)=> {
        res.data.map((data)=>(
          setcount(count+=1)
        ))
        setLeaveStorenoti(res.data)
      })
    ))
  },[])
  const transitions = useTransition(location.pathname == '/Admin', {
    from: { opacity: 0 },
    enter: { opacity: 1, delay: 150},
    leave:  { opacity: 0},

    })
  return transitions(
        ((styles, item) => item && <animated.div className="condiv" style={styles}>  
      <div className="on" >
        <div className="left">
          <h1>
            สวัสดี {auth.usersData[0].name}
          </h1>
        </div>
        <div className="Right">
        <div 
          style={{
            width:'200px',
            height:'100%',
            borderStyle:'solid',
            display:'flex',
            justifyContent:'space-around',
            alignItems:'center',
            borderRadius:'15px',
            pendingRight:'20px',
            flexDirection:'row'
            }}>
            <span>แจ้งเเตือนรายการลา</span>
          <IconButton aria-describedby={id}  onClick={handleClick} aria-label="notification">
            <StyledBadge badgeContent={count} color="secondary">
              <NotificationsNoneOutlinedIcon />
            </StyledBadge>
          </IconButton>
        </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
              <List component="nav" className={classes.LisNoti} aria-label="mailbox folders">
                {leaveStorenoti.map((data,index)=>(
                  <div key={index}>
                    <ListItem style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}} >
                      <ListItemText primary={<span>{data.name} {data.last_name}</span>} />
                      <span>ร้าน : {data.store_name}</span>
                  </ListItem>
                  <Divider />
                  </div>
                ))}
            </List>
        </Popover>
      </div>
      <div className="under">
         <div className="container1">
          <div className="item">
            <div className="initem">             
              <h3>ยอดขายวันนี้</h3>
                <div className="DachText">
                  <h3>
                    {orderToday}
                  </h3>
                </div>
              <h3>ออรเดอร์</h3>                         
            </div>
            <div className="initem">
            <h3>เมนูยอดนิยม</h3>
            <div className="DachText">
              <span>{menuPop}</span>
              <span>{numMenupop}</span>
            </div>             
              <h3>ออรเดอร์</h3>
            </div>
            <div className="initem">
              <h3>เปิดอยู่</h3>
                <div className="DachText">
                  <h3>{storeList.reduce((sum, data) => sum + data.status, 0)}</h3>
                </div>            
              <h3>ร้าน</h3>          
            </div>
          </div>
          <div 
            className="contentDach" 
            style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              flexDirection:'column',
              paddingTop:'10px',
              paddingBottom:'20px'
          }}>
            <h2 >ยอดออรเดอร์</h2>
            <div
              style={{width:'90%',height:'100%',display:'flex',alignItems:'center'}}
            >
              <Bar 
                height='200px'
                data={state}           
              />
            </div>
              
          </div>
        </div>
        <div className="container2" >
          <h1>ร้านค้า</h1>
          <hr style={{width:'90%'}} />
          {storeList.map((data,index)=>(
          <List key={index} className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={data.name} className={classes.large} src={`http://localhost:3001/userUploaded/${data.img}`} />
              </ListItemAvatar>
              <ListItemText
                primary={<span style={{fontWeight:'bold',marginLeft:'10px'}} >ร้าน : {data.store_name}</span>}
                secondary={
                  <Typography style={{display:'flex',flexDirection:'column',marginLeft:'10px'}} component={'span'}>
                    <span
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      โรงอาหาร :  {data.location}
                    </span>
                    <span
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      ล็อกที่  : {data.log_id}  
                    </span>
                    <button
                      onClick={()=>handleClickOpensave(data.s_id)} 
                    >
                      <div
                        style={{fontSize:'12px'}}
                      >
                        รายการอาหาร                     
                      </div>
                    </button>
                    <Typography >
                      <Dialog
                        open={openSave}
                        onClose={handleCloseSave}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                          <DialogTitle id="alert-dialog-title">{"ข้อมูลรายการการอาหาร"}</DialogTitle>
                          <DialogContent >
                              <DialogContentText  id="alert-dialog-description" style={{height:'100%',width:'500px'}}>
                                  <MenuStoreList storeId={storeId} />
                              </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseSave} color="primary">
                                ปิด
                            </Button>                           
                          </DialogActions>
                      </Dialog>
                    </Typography>
                    <span
                      component="span"
                      variant="body2"
                      className={classes.status}
                      color="textPrimary"
                    >
                      {data.status == 1 ? (<div>
                        <Chip
                          
                          label="เปิดอยู่"
                          disabled
                          style={{
                            width:'80px',
                            color:"#FFF",
                            backgroundColor: '#7BB661',
                          }}
                          deleteIcon={<DoneIcon />}
                        /></div>) : (<div><Chip                       
                          label="ปิด"
                          disabled
                          style={{
                            width:'80px',
                            color:"#FFF",
                            backgroundColor: '#727682',                         
                          }}                        
                          deleteIcon={<DoneIcon />}
                        />
                        </div>)}  
                    </span>
                  </Typography>
                }
              />
            </ListItem>
          </List>
          ))}         
        </div>
      </div>
      </animated.div>)
  );
};
export default HomeDachboad;
