import React, { useContext, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import './login.css'
import {  useHistory, useLocation } from 'react-router';
import { useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../App';

export default function Login() {
    const { setIsload} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('')
    const  [UserType, setUserType] = useState('')
    const history = useHistory();

    
    const login =()=>{
        setIsload(true)
        axios.post(`http://localhost:3001/${UserType}`,{
            Username:username,
            Password:password,
            UserType:UserType         
        }).then((res) => {
            if(res.data.message){
                swal(res.data.message).then((value) => {
                    setIsload(false)
                  });         
            }
            else{
                if(UserType === 'Teacher'){
                    history.push('/Teacher')
                    history.go()
                }else if(UserType === 'Student'){
                    history.push('/Student')
                    history.go()
                }              
            }
        }).catch((error)=>{
            swal(error)
            setIsload(false)
        })
    }
    const userTypeFucn = (even) =>{
        even.preventDefault()
            setUserType(even.target.value)
        }
    
//for transition--------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
    const location = useLocation();
    const transitions = useTransition(location.pathname === '/login',{
        from:{ opacity: 0, x: 800},
        enter:{ opacity: 1, x:0},
        leave:{ opacity: 0, x: 800 }

    })
    const transitions1 = useTransition(location, {
        from: { opacity: 0 },
        enter: { opacity: 1},
        leave:  { opacity: 0}
      })

 //for transition--------------------------------------------------------------------------------------------------------------------------------------------------------   
    return transitions1(
        (styles, item) => item && <animated.div className="conAnnoun" style={styles}>
            
            {transitions ((styles, item ) => item && ( <animated.div className="login" style={styles}>
            <h1>เข้าสู่ระบบ</h1>
            <div className="formLogin">
                <TextField onChange={(e) => {setUsername(e.target.value)}} id="standard-basic" label="USERNAME" style={{width:'100%',marginTop:'50px'}} />
                <TextField onChange={(e) => {setPassword(e.target.value)}} id="standard-basic" label="PASSWORD" style={{width:'100%',marginTop:'50px'}} />
                
                <InputLabel id="demo-simple-select-outlined-label" style={{marginTop:'40px',borderRadius:'20px'}}>User</InputLabel>
        <Select value={UserType} variant="outlined" labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" onChange={userTypeFucn} style={{borderRadius:'20px'}} >
          <MenuItem value={'Student'}>Student</MenuItem>
          <MenuItem value={'Teacher'}>Teacher</MenuItem>           
        </Select>
         <hr />
         <h1>{loginStatus}</h1>
         <Button onClick={login} variant="contained" style={{borderRadius:'20px',height:'40px'}}>login</Button>
         
            </div>         
            
            </animated.div> ))}
           {/*  {isload === true && <div className="login" style={{borderStyle:'solid',}}>
            <CircularProgress disableShrink/>
            </div>} */}
        </animated.div>
            
        
    )
}
