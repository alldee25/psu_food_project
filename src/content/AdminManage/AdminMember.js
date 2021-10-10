import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import { Button} from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../../App';
import AvatarA from '../../img/avatar-1577909.svg'
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import {  useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '95%',
      height:'500px',
      maxWidth: 560,
    },
  }));

function AdminMember() {

    const classes = useStyles();
    const [manager,setManager] = useState([])
    const [admin,setAdmin] = useState([])
    const [attendant,setAttendant] = useState([])
    const [dataPreview,setdataPreview] = useState([])
    const {setIsload} = useContext(AuthContext)
    const location = useLocation();

    const handleClickOpen =()=>{
        
    }
    const selectDetial = (e)=>{
        axios.post('http://localhost:3001/getInfoAdmin',{
            adminId:e
        }).then((res)=>{
            setdataPreview(res.data)
        })
        
    }

    useEffect(()=>{ 
        axios.get("http://localhost:3001/getAdminInfoManager",{ 
        }).then((res)=>{
        setManager(res.data)
        }   
        ).then(
            axios.get("http://localhost:3001/getAdminAll",{ 
            }).then((res)=>{
            setAdmin(res.data) 
          })).then(
        axios.get("http://localhost:3001/getAdminInfoAttendant",{ 
        }).then((res)=>{
        setAttendant(res.data) 
      })).then(setIsload(false))
      },[])

      const transitions = useTransition(location.pathname == '/HomeAdmin', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 150},
        leave:  { opacity: 0},
    
        })
      return transitions(
            ((styles, item) => item && <animated.div className="subcon" style={styles}>
            <div className='header' style={{display:"flex",alignItems:"center",position:"relative" }}>
                <h1>
                    รายการข้อมูลสมาชิก
                </h1>
                <Button onClick={handleClickOpen} style={{position:'absolute',right:'10px',bottom:"10px",width:"100px",borderRadius:"10px",fontSize: "1rem",
                    fontWeight: "bold",
                    color:"white"}} variant="contained" color="primary" >
                      เพิ่ม
                  </Button>
            </div>
            <div style={{marginTop:'20px',display:'flex',justifyContent:'flex-start',}}>
                <div style={{overflow:'auto',width:'50%'}}>
                  <List className={classes.root}>
                    {manager.map((data,index)=>(
                    <ListItem key={index}>                       
                        <ListItemAvatar>
                            <Avatar>
                            {data.img !== '' ? <img width='38' src={`http://localhost:3001/adminUploaded/${data.img}`} alt=""  /> : <img src={AvatarA} /> }   
                            </Avatar>
                        </ListItemAvatar>                      
                        <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} />
                        <button style={{color:'green'}} onClick={(e)=>{selectDetial(data.id)}}><PlayArrowRoundedIcon  /></button>                           
                    </ListItem>
                    ))}
                    <Divider variant="inset" component="li" />
                    {attendant.map((data,index)=>(
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                {data.img !== '' ? <img width='38' src={`http://localhost:3001/adminUploaded/${data.img}`} alt=""  /> : <img src={AvatarA} /> } 
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} /> 
                        <button style={{color:'green'}} onClick={(e)=>{selectDetial(data.id)}}><PlayArrowRoundedIcon  /></button>                     
                    </ListItem>
                    ))}
                    {admin.map((data,index)=>(
                        <div key={index}>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {data.img !== '' ? <img width='38' src={`http://localhost:3001/adminUploaded/${data.img}`} /> :  <img src={AvatarA} alt='' /> } 
                                    </Avatar>                              
                                </ListItemAvatar>                     
                            <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} />
                            <button style={{color:'green'}} onClick={(e)=>{selectDetial(data.id)}}><PlayArrowRoundedIcon  /></button>                        
                            </ListItem>  
                        </div>                  
                    ))}                  
                </List>  
                </div>
                
                <div style={{borderLeft:"1.5px solid rgba(228, 228, 228, 1)",display:'flex',justifyContent:'center',width:'500px',height:'500px'}}>
                    {dataPreview == '' ? '': 
                    dataPreview.map((data,index)=>(
                    <div key={index} style={{display:"flex",alignItems:'center',flexDirection:'column'}}>                                                                   
                    <div className="ProfileReview">
                        <img width="auto" height="120" src={`http://localhost:3001/adminUploaded/${data.img}`} />
                    </div>
                    <div style={{marginTop:'40px'}}>                    
                        <div style={{width:"400px",marginTop:'10px',fontWeight:'bold'}}>
                        <p><span>ชื่อ-สกุล : {data.name} {data.lastname}</span></p>
                        <p><span>รหัสประจำตัวประชาชน : {data.id_card}</span></p>
                        <p><span>ตำแหน่งงาน : {data.role}</span></p>
                        <p><span>เบอร์ติดต่อ : {data.phone}</span></p>
                        <p><span>Email : {data.email}</span></p>
                        </div>
                    </div> 
                </div>
            ))}            
        </div>  
        </div> 
        </animated.div>) 
    )
}export default AdminMember
