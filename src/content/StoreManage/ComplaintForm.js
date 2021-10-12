
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

function ComplaintForm(props) {

    const {auth,setIsload} = useContext(AuthContext)
    const [date,setDate] = useState('')
    const [locationAndStoreList,setLocationAndStoreList] = useState([])
    const history = useHistory()
    const [topic,setTopic] = useState('')
    const [topicDetial,setTopicDetial] = useState('')
    const [dateACT,setDateAct] = useState('')
    const [time,setTime] = useState('')
    const [attendantComment,setAttendantComment] = useState('')
    const [action,setAction] = useState('')
    const [other,setOther] = useState('')
    const [attendant,setAttendant] = useState('')
    const [manager,setManager] = useState('')

    const transitions = useTransition(props.open, {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  { opacity: 0,y: 800}
      })
      
      const handleChange =(e)=>{
        setTopic(e.target.value) 
      }

      const form = {
          topic:topic,
          topicDetial:topicDetial,
          dateACT:dateACT,
          date:date,
          time:time,
          action:action,
      }

      const Insert = async()=>{
        setIsload(true)
        const isValid = await adminSchemaAttendant.isValid(form)
        if (isValid) {
          if ((topic=='อื่นๆ') && (other!='')) {
              axios.post('http://localhost:3001/InsertDataofComplaint',{
                adminId:auth.usersData[0].id,
                storeId:props.active,
                topic:other,
                topicDetial:topicDetial,
                dateACT:dateACT,
                date:date,
                time:time,
                complaintNumber:props.count+1,
                action:action,
              }).then((res)=>{
                swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                  history.go('HomeStore/ComplaintList')
                  setIsload(false)
              }) 
              })
          } else if(topic!='อื่นๆ') {
            axios.post('http://localhost:3001/InsertDataofComplaint',{
              adminId:auth.usersData[0].id,
                storeId:props.active,
                topic:topic,
                topicDetial:topicDetial,
                dateACT:dateACT,
                date:date,
                time:time,
                complaintNumber:props.count+1,
                action:action,              
            }).then((res)=>{
              swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                history.go('HomeStore/ComplaintList')
                setIsload(false)
            }) 
            })
          }
          else{
            swal('ข้อมูลไม่ถูกต้อง','ตรวจสอบข้อมูลอีกครั้ง','warning')
          }
        } else {
          swal('ข้อมูลไม่ถูกต้อง','ตรวจสอบข้อมูลอีกครั้ง','warning')
        } 
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
      axios.post("http://localhost:3001/getStoreInfo",{
             id:props.active 
            }).then((res)=>{
                    setLocationAndStoreList(res.data)
             }).then(
                    axios.get("http://localhost:3001/getAdminInfoManager",{ 
                    }).then((res)=>{
                      const [{name}] = res.data
                    setManager(name)
                  }   
                    )).then(
                    axios.get("http://localhost:3001/getAdminInfoAttendant",{ 
                    }).then((res)=>{
                      const [{name}] = res.data
                    setAttendant(name) 
    })).then(setIsload(false))
    },[])

    return transitions(
          (styles, item) =>item && <animated.div style={styles}>
            <div style={{display:'flex',justifyContent:'center'}}>
              <div className="containComplaintForm">
                 <div className="headerComplaintForm">
                  <h3>แบบฟอร์มแจ้งความผิด ครั้งที่ {props.count+1}</h3>
                </div>
                <div style={{width:'95%',display:'flex',justifyContent:'flex-end'}}>
                  <TextField label="วันที่" type="date" variant="standard" disabled value={date}></TextField>
                </div>              
                <div style={{display:'flex',flexDirection:'row',marginLeft:'30px',position:'relative'}}>
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">เรื่อง</FormLabel>
                    <RadioGroup style={{marginLeft:'60px'}} aria-label="gender" name="gender1" value={topic} onChange={handleChange}>
                      <FormControlLabel  value="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" control={<Radio />} label="การค้างชำระค่าเช่า/ค่าไฟฟ้า/ค่าน้ำประปา/ค่าบริหารจัดการ" />
                      <FormControlLabel  value="ข้อร้องเรียนจากผู้ใช้บริการ" control={<Radio />} label="ข้อร้องเรียนจากผู้ใช้บริการ" />
                      <FormControlLabel  value="การกระทำผิดมาตรฐานการสุขาภิบาลอาการ" control={<Radio />} label="การกระทำผิดมาตรฐานการสุขาภ้บาลอาการ" />
                      <FormControlLabel  value="การกระทำผิดข้อบังคับโรงอาหาร" control={<Radio />} label="การกระทำผิดข้อบังคับโรงอาหาร" />
                      <FormControlLabel  value="การกระทำผิดสัญญาเช่า" control={<Radio />} label="การกระทำผิดสัญญาเช่า" />
                      <FormControlLabel  value="อื่นๆ" control={<Radio />} label="อื่นๆ" />
                    </RadioGroup>
                  </FormControl>                           
                  <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',position:'absolute',top:'270px',left:'130px'}}>
                    <TextField variant="standard" style={{width:'400px'}} disabled={topic!=="อื่นๆ"} id="demo-simple-select-helper" onChange={(e)=>{setOther(e.target.value)}} value={other} />                                                 
                  </div>
                </div>
                
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'10px'}}>
                  <span>
                    ด้วยพบว่า เมื่อวันที่
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="date" value={dateACT} onChange={(e)=>{setDateAct(e.target.value)}}></TextField>
                  </div>                                             
                  <span style={{marginLeft:'10px'}}>
                    เวลา
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="time" value={time} onChange={(e)=>{setTime(e.target.value)}}></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>
                    นาง/นาย
                  </span>
                  {locationAndStoreList.map((data,index)=>(
                    <div key={index} style={{marginLeft:'10px'}}>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.name} variant="standard" type="text" ></TextField>
                    </div>
                  ))}                                                                 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>            
                  <span>ผู้ประกอบการร้านจำหน่ายอาหาร ร้านที่</span>
                  {locationAndStoreList.map((data,index)=>(
                  <div key={index} style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.log_id} variant="standard" type="text" ></TextField>
                  </div>
                  ))} 
                  <span style={{marginLeft:'10px'}}>
                    ประจำโรงอาหาร
                  </span>
                  {locationAndStoreList.map((data,index)=>(
                  <div key={index} style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.location} variant="standard" type="text" ></TextField>
                  </div>
                  ))}                                
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>         
                  <span>
                    ได้กระทำผิดเรื่อง
                  </span>
                  <div style={{marginLeft:'10px',width:'925px'}}>
                    <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="text" onChange={(e)=>{setTopicDetial(e.target.value)}} value={topicDetial}></TextField>
                  </div>                
                </div> 
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ดังนั้นจึงขอให้ผู้ประกอบการดำเนินการดังนี้
                  </span>
                  <div style={{marginLeft:'10px',width:'720px'}}>
                    <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}}  variant="standard" type="text" onChange={(e)=>{setAction(e.target.value)}} value={action}></TextField>
                  </div>                                 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',fontWeight:'bold',fontSize:'17px',width:'95%',marginTop:'20px'}}>                                
                    <div style={{marginLeft:'10px'}}>
                      <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={attendant} variant="standard" type="text" ></TextField>
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
                    <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled={auth.usersData[0].name !== manager } variant="standard" type="text" onChange={(e)=>{setAttendantComment(e.target.value)}} value={attendantComment}></TextField>
                  </div>                                 
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',fontWeight:'bold',fontSize:'17px',width:'95%',marginTop:'20px'}}>                                
                    <div style={{marginLeft:'10px'}}>
                      <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={manager} variant="standard" type="text" ></TextField>
                    </div>
                    <div>
                      <span>
                        เจ้าหน้าที่บริหารงานทั่วไป
                      </span>
                    </div>                                                                   
                </div>
                <Button disabled={auth.usersData[0].name !== manager && auth.usersData[0].name !== attendant} style={{position:'absolute',right:'50px',bottom:'10px'}} variant="contained" color="primary" onClick={Insert}>บันทึก</Button>
              </div>            
            </div>                      
          </animated.div>
    )
}
export default ComplaintForm
