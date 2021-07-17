
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
      
      const handleChange =(e)=>{
        setBoreOpenion(e.target.value) 
      }

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
                  <h3>แบบฟอร์มแจ้งความผิด ครั้งที่ </h3>
                </div>
                <div style={{width:'95%',display:'flex',justifyContent:'flex-end'}}>
                  <TextField label="วันที่" type="date" variant="standard" disabled value={date}></TextField>
                </div>              
                <div style={{display:'flex',flexDirection:'row',marginLeft:'30px',position:'relative'}}>
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">เรื่อง</FormLabel>
                    <RadioGroup style={{marginLeft:'60px'}} aria-label="gender" name="gender1" value={bordOpenion} onChange={handleChange}>
                      <FormControlLabel  value="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" control={<Radio />} label="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" />
                      <FormControlLabel  value="ข้อร้องเรียนจากผู้ใช้บริการ" control={<Radio />} label="ข้อร้องเรียนจากผู้ใช้บริการ" />
                      <FormControlLabel  value="การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ" control={<Radio />} label="การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ" />
                      <FormControlLabel  value="การกระทำผิดข้อบังคับโรงอาหาร" control={<Radio />} label="การกระทำผิดข้อบังคับโรงอาหาร" />
                      <FormControlLabel  value="การกระทำผิดสัญญาเช่า" control={<Radio />} label="การกระทำผิดสัญญาเช่า" />
                      <FormControlLabel  value="อื่นๆ" control={<Radio />} label="อื่นๆ" />
                    </RadioGroup>
                  </FormControl>                           
                  <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',position:'absolute',top:'270px',left:'130px'}}>
                    <TextField variant="standard" style={{width:'400px'}} disabled={bordOpenion!=="อื่นๆ"} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={bType} /* onChange={(e)=>{setBType(e.target.value)}} */ />                                                 
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px'}}>
                  <span>
                    ด้วยพบว่า เมื่อวันที่
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="date"></TextField>
                  </div>                                             
                  <span style={{marginLeft:'10px'}}>
                    เวลา
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="time" ></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>
                    นาง/นาย
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value="###" variant="standard" type="text" ></TextField>
                  </div>                               
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>
                  <span>ผู้ประกอบการร้านจำหน่ายอาหารที่ ร้านที่</span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value="###" variant="standard" type="text" ></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>ในพื้นที่</span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value="###" variant="standard" type="text" ></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>
                    ประจำโรงอาหาร
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value="###" variant="standard" type="text" ></TextField>
                  </div>                
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>         
                  <span>
                    ได้กระทำผิดเรื่อง
                  </span>
                  <div style={{marginLeft:'10px',width:'925px'}}>
                    <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} value="###" variant="standard" type="text" ></TextField>
                  </div>                
                </div> 
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ดังนั้นจึงขอให้ผู้ประกอบการดำเนินการดังนี้
                  </span>
                  <div style={{marginLeft:'10px',width:'720px'}}>
                    <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} value="#" variant="standard" type="text" ></TextField>
                  </div>                                 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',fontWeight:'bold',fontSize:'17px',width:'95%',marginTop:'20px'}}>                                
                    <div style={{marginLeft:'10px'}}>
                      <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value="#" variant="standard" type="text" ></TextField>
                    </div>
                    <div>
                      <span>
                        ผู้ดูแล
                      </span>
                    </div>                                                                   
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ความคิดเห็นผู้ควบคุมกำกับดูแล
                  </span>
                  <div style={{marginLeft:'10px',width:'800px'}}>
                    <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} value="#" variant="standard" type="text" ></TextField>
                  </div>                                 
                </div>
              </div>            
            </div>                      
          </animated.div>
    )
}
export default ComplaintForm
