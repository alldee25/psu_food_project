import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react'
import './ComplaintForm.css'
import axios from 'axios';
import {adminSchemaAttendant} from '../../users/Validation'
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

const dataSelect =['การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ','ข้อร้องเรียนจากผู้ใช้บริการ','การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ','การกระทำผิดข้อบังคับโรงอาหาร','การกระทำผิดสัญญาเช่า']

function ComplaintForm(props) {

    const {auth,setIsload} = useContext(AuthContext)
    const [locationAndStoreList,setLocationAndStoreList] = useState([])
    const history = useHistory()
    const [topic,setTopic] = useState('')
    const [attendantComment,setAttendantComment] = useState('')
    const [other,setOther] = useState('')
    const [attendantName,setAttendantName] = useState('')
    const [attendantLastname,setAttendantLastname] = useState('')
    const [managerName,setManagerName] = useState('')
    const [managerLastname,setManagerLastname] = useState('')

    const transitions = useTransition(props.open, {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  { opacity: 0,y: 800}
      })
      
      const update = async()=>{
        setIsload(true)
        if (attendantComment !== '') {  
          swal("กด ok เพื่อยืนยันการบันทึก",{
          })
          .then((value) => {
            if (value) {    
              axios.post('http://localhost:3001/UpdateDataofComplaint',{
                attendantComment:attendantComment,
                id:props.active
                }).then(swal({
                  title: "บันทึกเรียบร้อย",
                  text: "กดปุ่มเพื่อไปต่อ",
                  icon: "success",
                  button: "OK",
                }).then((value) =>{
                  history.push('/HomeStore/ComplaintList')
                  history.go() 
                  }))
                }
              })      
        } else {
          swal('ข้อมูลไม่ถูกต้อง','ตรวจสอบข้อมูลอีกครั้ง','warning')
        }
        setIsload(false) 
      }

    useEffect(()=>{ 
      axios.post("http://localhost:3001/getStoreAndComplaintInfo",{
             id:props.active,
            }).then((res)=>{
                    const [{topic}] = res.data
                    const [{attendant_comment}] = res.data
                    if (dataSelect.every((data)=>{
                      return  data !== topic
                    })) {
                        setOther(topic)
                        setTopic('อื่นๆ')
                    }else{
                        setTopic(topic)
                    }
                    setAttendantComment(attendant_comment) 
                    setLocationAndStoreList(res.data)
             }).then(
                    axios.get("http://localhost:3001/getAdminInfoManager",{ 
                    }).then((res)=>{
                      const [{name}] = res.data
                      const [{lastname}] = res.data
                    setManagerName(name)
                    setManagerLastname(lastname)
                  }   
                    )).then(
                    axios.get("http://localhost:3001/getAdminInfoAttendant",{ 
                    }).then((res)=>{
                      const [{name}] = res.data
                      const [{lastname}] = res.data
                    setAttendantName(name) 
                    setAttendantLastname(lastname) 
    })).then(setIsload(false))
    },[])
    return transitions(
          (styles, item) =>item && <animated.div style={styles}>
            {locationAndStoreList.map((data,index)=>(
            <div key={index} style={{display:'flex',justifyContent:'center'}}>
              <div className="containComplaintForm">
                 <div className="headerComplaintForm">
                  <h3>แบบฟอร์มแจ้งความผิด ครั้งที่ {props.count}</h3>
                </div>
                <div style={{width:'95%',display:'flex',justifyContent:'flex-end'}}>
                  <TextField label="วันที่" type="date" variant="standard" disabled value={data.date_write}></TextField>
                </div>              
                <div style={{display:'flex',flexDirection:'row',marginLeft:'30px',position:'relative'}}>
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">เรื่อง</FormLabel>
                    <RadioGroup style={{marginLeft:'60px'}} aria-label="gender" name="gender1" value={topic}>
                      <FormControlLabel disabled value="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" control={<Radio />} label="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" />
                      <FormControlLabel disabled value="ข้อร้องเรียนจากผู้ใช้บริการ" control={<Radio />} label="ข้อร้องเรียนจากผู้ใช้บริการ" />
                      <FormControlLabel disabled value="การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ" control={<Radio />} label="การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ" />
                      <FormControlLabel disabled value="การกระทำผิดข้อบังคับโรงอาหาร" control={<Radio />} label="การกระทำผิดข้อบังคับโรงอาหาร" />
                      <FormControlLabel disabled value="การกระทำผิดสัญญาเช่า" control={<Radio />} label="การกระทำผิดสัญญาเช่า" />
                      <FormControlLabel disabled value="อื่นๆ" control={<Radio />} label="อื่นๆ" />
                    </RadioGroup>
                  </FormControl>                           
                  <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',position:'absolute',top:'270px',left:'130px'}}>
                    <TextField variant="standard" style={{width:'400px'}} value={other} disabled id="demo-simple-select-helper" />                                                 
                  </div>
                </div>               
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'10px'}}>
                  <span>
                    ด้วยพบว่า เมื่อวันที่
                  </span>
                    <div style={{marginLeft:'10px'}}>
                        <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="date" value={data.date} ></TextField>
                    </div>                                             
                    <span style={{marginLeft:'10px'}}>
                        เวลา
                    </span>
                    <div style={{marginLeft:'10px'}}>
                        <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="time" value={data.time} ></TextField>
                    </div>
                    <span style={{marginLeft:'10px'}}>
                        นาง/นางสาว/นาย
                    </span>                
                    <div style={{marginLeft:'10px'}}>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={`${data.name} ${data.lastname}`}variant="standard" type="text" ></TextField>
                    </div>                                                                               
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>
                  <span>ผู้ประกอบการร้านจำหน่ายอาหาร ร้านที่</span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={props.active} variant="standard" type="text" ></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>
                    ประจำโรงอาหาร
                  </span>                 
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.location} variant="standard" type="text" ></TextField>
                  </div>                                              
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>         
                  <span>
                    ได้กระทำผิดเรื่อง
                  </span>
                  <div style={{marginLeft:'10px',width:'925px'}}>
                    <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="text" value={data.topic_detial}></TextField>
                  </div>                
                </div> 
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ดังนั้นจึงขอให้ผู้ประกอบการดำเนินการดังนี้
                  </span>
                  <div style={{marginLeft:'10px',width:'720px'}}>
                    <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="text" value={data.action} />
                  </div>                                 
                </div>             
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',fontWeight:'bold',fontSize:'17px',width:'95%',marginTop:'20px'}}>                                
                    <div style={{marginLeft:'10px'}}>
                      <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={`${attendantName} ${attendantLastname}`} variant="standard" type="text" />
                    </div>
                    <div style={{display:'flex',width:"175px",justifyContent:"center"}}>
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
                    <TextField helperText="ถ้าไม่มีให้ใส่ -" fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled={auth.usersData[0].name !== managerName} variant="standard" type="text" onChange={(e)=>{setAttendantComment(e.target.value)}} value={attendantComment}></TextField>
                  </div>                                 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',fontWeight:'bold',fontSize:'17px',width:'95%',marginTop:'20px'}}>                                
                    <div style={{marginLeft:'10px'}}>
                      <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={`${managerName} ${managerLastname}`} variant="standard" type="text" ></TextField>
                    </div>
                    <div>
                      <span>
                        เจ้าหน้าที่บริหารงานทั่วไป
                      </span>
                    </div>                                                                   
                </div>
                <Button style={{position:'absolute',right:'50px',bottom:'10px'}} variant="contained" color="primary" onClick={update}>บันทึก</Button>
              </div>            
            </div>
            ))}                      
          </animated.div>
    )
}
export default ComplaintForm
