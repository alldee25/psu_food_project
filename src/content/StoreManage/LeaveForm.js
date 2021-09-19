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

export default function LeaveForm(props) {

    const {auth,setIsload} = useContext(AuthContext)
    const [leaveAndStoreList,seLeaveAndStoreList] = useState([])
    const history = useHistory()
    const [status,setStatus] = useState('')
    const [attendantComment1,setAttendantComment1] = useState('')
    const [attendantComment,setAttendantComment] = useState('')
    

    const transitions = useTransition(props.open, {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  { opacity: 0,y: 800}
      })
      
      const update =()=>{
          if (auth.usersData[0].role =='เจ้าหน้าที่หน่วยคุ้มครองผู้บริโภค' && status !== '' && attendantComment !== '') {
              axios.post('http://localhost:3001/InsertStoreListLeaveDetialAdmin1',{
                admimRole:auth.usersData[0].role,
                admimId:auth.usersData[0].id,
                leaveId:props.active,
                attendantComment:attendantComment,
                status:status
          }).then((res)=>{
              if (res.data.err) {
                swal('โปรดตรวจสอบข้อมูลอีกครั้ง',"โปรดตรวจสอบข้อมูลอีกครั้ง","warning")
              } else {
                swal(res.data.message,"ดำเนินการเรียบร้อย","success")
                history.push('/HomeStore/LeaveList')
                history.go() 
              }
          })
          } else if (auth.usersData[0].role =='หัวหน้งานบริการสุขภาพและเสริมสร้างสุขภาวะ' && attendantComment1 !== '') {

            axios.post('http://localhost:3001/InsertStoreListLeaveDetialAdmin2',{
            leaveId:props.active,
            admimId:auth.usersData[0].id,        
            attendantComment1:attendantComment1,
        }).then((res)=>{
            if (res.data.err) {
              swal(res.data.err,"โปรดตรวจสอบข้อมูลอีกครั้ง","warning")
            } else {
              swal(res.data.message,"ดำเนินการเรียบร้อย","success")
                history.push('/HomeStore/LeaveList')
                  history.go() 
            }
        })
        }
           else {
            swal("ข้อมูลไม่ถูกต้อง","โปรดตรวจสอบข้อมูลอีกครั้ง","warning")
          }
        
        
      }
      const handleChange =(e)=>{
        setStatus(e.target.value) 
      }

      useEffect(() => {
          let isMounted = true;
          axios.post('http://localhost:3001/getStoreListLeaveDetial',{
              leaveId:props.active
          }).then((res)=>{
            seLeaveAndStoreList(res.data)
          })
          return () => {
            isMounted = false;
          }
      }, [])

    return transitions(
        (styles, item) =>item && <animated.div style={styles}>
        {leaveAndStoreList.map((data,index)=>(
        <div key={index} style={{display:'flex',justifyContent:'center'}}>
          <div className="containComplaintForm">
             <div className="headerComplaintForm">
              <h3>แบบขอหยุดลาบริการจำหน่ายอาหาร</h3>
            </div>
            <div style={{width:'95%',display:'flex',justifyContent:'flex-end'}}>
              <TextField label="วันที่" type="date" variant="standard" disabled value={data.date_write}></TextField>
            </div>              
                          
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'10px'}}>
              <span>
                นาง/นางสาว/นาย
              </span>
                <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="text" value={`${data.name} ${data.lastname}`} ></TextField>
                </div>                                                                                                                                         
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>
              <span>ผู้ประกอบการร้านจำหน่ายอาหารร้าน</span>
              <div style={{marginLeft:'10px'}}>
                <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.store_name} variant="standard" type="text" ></TextField>
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
                มีความประสงค์แบบขอหยุดลาบริการจำหน่ายอาหารโดยขอ
              </span>
              <div style={{marginLeft:'10px'}}>
                <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="text" value={data.title_leave}></TextField>
              </div>                
            </div> 
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>
              <span>
                เนื่องจาก
              </span>
              <div style={{marginLeft:'10px',width:'720px'}}>
                <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="text" value={data.action} />
              </div>                                 
            </div>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>         
              <span>
                ระหว่งวันที่
              </span>
              <div style={{marginLeft:'10px'}}>
                <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="date" value={data.frome_date}></TextField>
              </div>
              <span>
                ถึงวันที่
              </span>
              <div style={{marginLeft:'10px'}}>
                <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} disabled variant="standard" type="date" value={data.to_date}></TextField>
              </div>                
            </div>             
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
              <span>
                1.ความคิดเห็นเจ้าหน้าที่หน่วยคุ้มครองผู้บริโภค
              </span>
              <div style={{display:'flex',flexDirection:'row',marginLeft:'30px',position:'relative',marginTop:'10px'}}>
                  <FormControl component="fieldset" disabled={auth.usersData[0].role !=='เจ้าหน้าที่หน่วยคุ้มครองผู้บริโภค'}>
                    <RadioGroup aria-label="gender" name="gender1" value={status} onChange={handleChange}>
                      <FormControlLabel  value="อนุญาต" control={<Radio />} label="อนุญาต" />
                      <FormControlLabel  value="ไม่อนุญาต" control={<Radio />} label="ไม่อนุญาต" />                 
                    </RadioGroup>
                  </FormControl>                           
                </div>
              <div style={{marginLeft:'10px',width:'700px',marginTop:'10px'}}>
                 <span>
                เพราะ
              </span> 
                <TextField helperText="ถ้าไม่มีให้ใส่ -" fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="text" disabled={auth.usersData[0].role !=='เจ้าหน้าที่หน่วยคุ้มครองผู้บริโภค'} onChange={(e)=>{setAttendantComment(e.target.value)}} value={attendantComment}></TextField>
              </div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:'17px',width:'50%'}}>                                                                                                           
            </div>                                 
            </div>           
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'40px'}}>
              <span>
                2.ข้อพิจารณาหัวหน้งานบริการสุขภาพและเสริมสร้างสุขภาวะ 
              </span>          
              <div style={{marginLeft:'10px',width:'700px',marginTop:'10px'}}> 
                <TextField fullWidth multiline inputProps={{min: 0, style: { textAlign: 'center'}}} disabled={auth.usersData[0].role !=='หัวหน้งานบริการสุขภาพและเสริมสร้างสุขภาวะ'} variant="standard" type="text" onChange={(e)=>{setAttendantComment1(e.target.value)}} value={attendantComment1}></TextField>
              </div>
              <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:'17px',width:'50%',marginTop:'10px'}}>                                                                                                             
            </div>                                 
            </div>
            
            <Button disabled={auth.usersData[0].role !=='หัวหน้งานบริการสุขภาพและเสริมสร้างสุขภาวะ' && auth.usersData[0].role !=='เจ้าหน้าที่หน่วยคุ้มครองผู้บริโภค'}  style={{position:'absolute',right:'50px',bottom:'10px'}} variant="contained" color="primary" onClick={update}>บันทึก</Button>
          </div>            
        </div>
        ))}                      
      </animated.div>
    )
}
