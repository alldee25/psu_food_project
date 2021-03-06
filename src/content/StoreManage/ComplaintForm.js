
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
          if ((topic=='???????????????') && (other!='')) {
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
                swal("?????????????????????????????????????????????","Click","success").then((value)=>{
                  history.go('HomeStore/ComplaintList')
                  setIsload(false)
              }) 
              })
          } else if(topic!='???????????????') {
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
              swal("?????????????????????????????????????????????","Click","success").then((value)=>{
                history.go('HomeStore/ComplaintList')
                setIsload(false)
            }) 
            })
          }
          else{
            swal('????????????????????????????????????????????????','???????????????????????????????????????????????????????????????','warning')
          }
        } else {
          swal('????????????????????????????????????????????????','???????????????????????????????????????????????????????????????','warning')
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
                  <h3>????????????????????????????????????????????????????????? ???????????????????????? {props.count+1}</h3>
                </div>
                <div style={{width:'95%',display:'flex',justifyContent:'flex-end'}}>
                  <TextField label="??????????????????" type="date" variant="standard" disabled value={date}></TextField>
                </div>              
                <div style={{display:'flex',flexDirection:'row',marginLeft:'30px',position:'relative'}}>
                  <FormControl component="fieldset" >
                    <FormLabel component="legend">??????????????????</FormLabel>
                    <RadioGroup style={{marginLeft:'60px'}} aria-label="gender" name="gender1" value={topic} onChange={handleChange}>
                      <FormControlLabel  value="??????????????????????????????????????????????????????/????????????????????????/?????????????????????????????????/?????????????????????????????????????????????" control={<Radio />} label="??????????????????????????????????????????????????????/????????????????????????/?????????????????????????????????/?????????????????????????????????????????????" />
                      <FormControlLabel  value="?????????????????????????????????????????????????????????????????????????????????" control={<Radio />} label="?????????????????????????????????????????????????????????????????????????????????" />
                      <FormControlLabel  value="?????????????????????????????????????????????????????????????????????????????????????????????????????????" control={<Radio />} label="?????????????????????????????????????????????????????????????????????????????????????????????????????????" />
                      <FormControlLabel  value="????????????????????????????????????????????????????????????????????????????????????" control={<Radio />} label="????????????????????????????????????????????????????????????????????????????????????" />
                      <FormControlLabel  value="????????????????????????????????????????????????????????????" control={<Radio />} label="????????????????????????????????????????????????????????????" />
                      <FormControlLabel  value="???????????????" control={<Radio />} label="???????????????" />
                    </RadioGroup>
                  </FormControl>                           
                  <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',position:'absolute',top:'270px',left:'130px'}}>
                    <TextField variant="standard" style={{width:'400px'}} disabled={topic!=="???????????????"} id="demo-simple-select-helper" onChange={(e)=>{setOther(e.target.value)}} value={other} />                                                 
                  </div>
                </div>
                
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'10px'}}>
                  <span>
                    ??????????????????????????? ?????????????????????????????????
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="date" value={dateACT} onChange={(e)=>{setDateAct(e.target.value)}}></TextField>
                  </div>                                             
                  <span style={{marginLeft:'10px'}}>
                    ????????????
                  </span>
                  <div style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="time" value={time} onChange={(e)=>{setTime(e.target.value)}}></TextField>
                  </div>
                  <span style={{marginLeft:'10px'}}>
                    ?????????/?????????
                  </span>
                  {locationAndStoreList.map((data,index)=>(
                    <div key={index} style={{marginLeft:'10px'}}>
                      <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.name} variant="standard" type="text" ></TextField>
                    </div>
                  ))}                                                                 
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>            
                  <span>???????????????????????????????????????????????????????????????????????????????????? ?????????????????????</span>
                  {locationAndStoreList.map((data,index)=>(
                  <div key={index} style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.log_id} variant="standard" type="text" ></TextField>
                  </div>
                  ))} 
                  <span style={{marginLeft:'10px'}}>
                    ???????????????????????????????????????
                  </span>
                  {locationAndStoreList.map((data,index)=>(
                  <div key={index} style={{marginLeft:'10px'}}>
                    <TextField inputProps={{min: 0, style: { textAlign: 'center'}}} disabled value={data.location} variant="standard" type="text" ></TextField>
                  </div>
                  ))}                                
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'30px',marginTop:'20px'}}>         
                  <span>
                    ???????????????????????????????????????????????????
                  </span>
                  <div style={{marginLeft:'10px',width:'925px'}}>
                    <TextField fullWidth inputProps={{min: 0, style: { textAlign: 'center'}}} variant="standard" type="text" onChange={(e)=>{setTopicDetial(e.target.value)}} value={topicDetial}></TextField>
                  </div>                
                </div> 
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
                        ?????????????????????
                      </span>
                    </div>                                                                   
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',fontWeight:'bold',fontSize:'17px',marginLeft:'60px',marginTop:'20px'}}>
                  <span>
                    ???????????????????????????????????????????????????????????????????????????????????????
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
                        ??????????????????????????????????????????????????????????????????????????????
                      </span>
                    </div>                                                                   
                </div>
                <Button disabled={auth.usersData[0].name !== manager && auth.usersData[0].name !== attendant} style={{position:'absolute',right:'50px',bottom:'10px'}} variant="contained" color="primary" onClick={Insert}>??????????????????</Button>
              </div>            
            </div>                      
          </animated.div>
    )
}
export default ComplaintForm
