import React, { useEffect, useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import AvatarA from '../../img/avatar-1577909.svg'
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import { Button, Input } from '@material-ui/core';
import swal from 'sweetalert';
import axios from 'axios';
import { AuthContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height:'300px',
      maxWidth: 460,
    },
  }));

function AdminMember() {

    const classes = useStyles();
    const [manager,setManager] = useState([])
    const [admin,setAdmin] = useState([])
    const [attendant,setAttendant] = useState([])
    const [image,setImage] = useState('')
    const {setIsload} = useContext(AuthContext)

    const handleClickOpen =()=>{
        console.log(image);
        axios.post("http://localhost:3001/upload",{
            image:image 
        }).then((res)=>{
        console.log(res.data);
        }   
        )
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

    return (
        <div className="subcon">
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
                    <ListItem>                       
                        <ListItemAvatar>
                            <Avatar>
                               {data.img !== '' ? <img src={data.img}/> : <img src={AvatarA}/>}  
                            </Avatar>
                        </ListItemAvatar>                      
                        <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} />                           
                    </ListItem>
                    ))}
                    <Divider variant="inset" component="li" />
                    {attendant.map((data,index)=>(
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {data.img !== '' ? <img src={data.img}/> : <img src={AvatarA}/>} 
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} />                      
                    </ListItem>
                    ))}
                    {admin.map((data,index)=>(
                        <div>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {data.img !== '' ? <img src={data.img}/> : <img src={AvatarA}/>} 
                                    </Avatar>
                                </ListItemAvatar>                     
                            <ListItemText primary={`ชื่อ : ${data.name}`} secondary={`ตำแหน่ง : ${data.role}`} />                        
                            </ListItem>  
                        </div>                  
                    ))}                  
                </List>  
                </div> 
            <div style={{height:'550px',borderLeft: '1.5px solid rgb(228, 228, 228)'}}>
                <Input type="file" name='image' onChange={(e)=>{setImage(e.target.files)}}></Input>
            </div> 
        </div> 
        </div>
    )
}

export default AdminMember
