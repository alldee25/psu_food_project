import axios from 'axios'
import React, { useContext } from 'react'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../App';

export default function Logout(props) {

    const { setIsload} = useContext(AuthContext);
    
     const history = useHistory();
     
    const logout =()=>{
        setIsload(true)
       axios.get('http://localhost:3001/logout').then(
        history.push('/'),  
        history.go() 

       ).catch((error)=>{
           setIsload(false)
       })    
    } 
    return (

        <div >
            <Button variant="contained" style={{borderRadius:'12px',fontWeight:'bold'}} onClick={logout}><KeyboardBackspaceRoundedIcon/>&nbsp;Logout</Button>
        </div>
    )
}
