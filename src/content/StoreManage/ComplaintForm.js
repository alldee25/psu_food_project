
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import React, { useContext, useEffect, useState } from 'react'
import './ComplaintForm.css'
import InteViewDialog from './InteViewDialog'
import InteViewDialog1 from './InterViewDialog1';
import InteViewDialog2 from './InterViewDialog2';
import axios from 'axios';
import {adminSchema} from '../../users/Validation'
import { Button } from '@material-ui/core';
import swal from 'sweetalert';
import {AuthContext} from '../../App'
import { useHistory } from 'react-router';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { animated, useTransition } from 'react-spring';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
       
      },
    },
  }));

function ComplaintForm(props) {

    const {auth,setIsload} = useContext(AuthContext)
    const [age,setAge] = useState('')
    const [date,setDate] = useState('')
    const classes = useStyles();
    const [score1,setScore1] = useState('')
    const [score2,setScore2] = useState('')
    const [score3,setScore3] = useState('')
    const [note1,setNote1] = useState('')
    const [note2,setNote2] = useState('')
    const [note3,setNote3] = useState('')
    const [feedback,setFeedback] = useState('')
    const [bordOpenion,setBoreOpenion] = useState('')
    const [typeList,setTypeList] = useState([])
    const [locationList,setLocationList] = useState([])
    const [bType,setBType] = useState('')
    const [bLocation,setBLocation] = useState('')
    const history = useHistory()
    const [dataInterViewList,setDataInterViewList] = useState([])

    const transitions = useTransition(props.open, {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  { opacity: 0,y: 800}
      })
      
    useEffect(()=>{
        const today = new Date();
        const yeartoday = today.getFullYear() 
        const month = today.getMonth() +1
        const date = today.getDate()
        if(month < 10 && date > 9){
          const forday = `${yeartoday}-0${month}-${date}`
          setDate(forday) 
        }
        else if(date < 10 && month > 9){
          const forday = `${yeartoday}-${month}-0${date}`
          setDate(forday)     
        }
        else if(date < 10 && month < 10){       
          const forday = `${yeartoday}-0${month}-0${date}`
          setDate(forday)      
        }else{
         const forday = `${yeartoday}-${month}-${date}`
         setDate(forday) 
        } 
      axios.post("http://localhost:3001/getInterViewDetial",{
             id:props.active 
      }).then(
        axios.post("http://localhost:3001/getLocationList",{
          id:props.active
        }).then((res)=>{
          setLocationList(res.data)
        })
      ).then(setIsload(false))
    },[])
    return transitions(
        (styles, item) =>item && <animated.div style={styles}>
            <div style={{display:'flex',justifyContent:'center'}}>
               <div className="containComplaintForm">
                    <div className="headerComplaintForm">
                        <h3>แบบฟอร์มแจ้งความผิด</h3>
                    </div>  
                </div> 
            </div>
            
            
        </animated.div>
    )
}

export default ComplaintForm
