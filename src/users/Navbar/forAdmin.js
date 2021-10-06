import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App';
import axios from 'axios';
import swal from 'sweetalert';
import { animated } from '@react-spring/web';
import { useSpring, useTransition } from '@react-spring/core';
import Button from '@material-ui/core/Button';
import {Link,useHistory,useLocation,useRouteMatch} from 'react-router-dom'
import { ClickAwayListener, TextField } from '@material-ui/core';
import { motion } from "framer-motion"
import "./forAdmin.css"


function ForAdmin() {
    
    const [openLogin, setOpenLogin] = useState(false);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const { setIsload} = useContext(AuthContext);
    const prop = useSpring({ width:!openLogin ? 100: 510})
    const history = useHistory();

    const transitions = useTransition(openLogin,{
        from:{ opacity: 0,x:0, },
        enter:{ opacity: 1, x: 0,delay:300},
    
    })    
    const LoginAdmin =()=>{
        setIsload(true)
        axios.post('http://localhost:3001/Admin',{
          Username:Username,
          Password:Password,
          UserType:'Admin',
        }).then((res)=>{
          if(res.data.message){
            swal(res.data.message).then((value)=>{
              setIsload(false)
            })
          }
          else{
            history.push('/Admin')
            history.go('/Admin')
          }
        }).catch((error)=>{
          swal('somthing wrong','click','warning')
          setIsload(false)
        })
      }

    return (
      <div className="conforAd">
        <ClickAwayListener onClickAway={() => setOpenLogin(false)}>
          <animated.div  className="navAd" style={prop}>
            <Link to="#"  onClick={() => setOpenLogin(!openLogin)} >
              Admin
            </Link>       
            {transitions ((styles,item) => item && (
              <animated.div style={styles}>             
                <input type="text" autoComplete='on' id="myInput" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} />             
              </animated.div> ))}
            {transitions ((styles,item) => item && (
              <animated.div style={styles}>
                <input variant="outlined" type="password"  placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />              
              </animated.div> ))}             
            {transitions ((styles,item) => item && (
              <animated.div style={styles}>
                <Button variant="contained" onClick={LoginAdmin} color="primary" style={{marginLeft:'10px',borderRadius:'10px',height:'30px',marginBottom:'2px'}}>
                  Login
                </Button>
              </animated.div> ))}
          </animated.div>
        </ClickAwayListener>          
      </div>
    )
}

export default ForAdmin
