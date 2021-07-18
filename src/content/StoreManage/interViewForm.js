import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import React, { useContext, useEffect, useState } from 'react'
import './InterViewForm.css'
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
  
function InterViewForm(props) {
    
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
    const sum = ((Number(score1)+Number(score2)+Number(score3))*100)/100

    const transitions = useTransition(props.open, {
      from: { opacity: 0, y: 800 },
      enter: { opacity: 1, y: 0 },
      leave:  { opacity: 0,y: 800}
    })

    let formScore = {
      score1:score1,
      score2:score2,
      score3:score3,
      bordOpenion:bordOpenion
    }
    const handleChange =(e)=>{
      setBoreOpenion(e.target.value) 
    }
    const Insert = async (e) =>{
      e.preventDefault(e.target.value)
      setIsload(true)
      const isValid = await adminSchema.isValid(formScore)
      if (isValid) {
        if ((bordOpenion==='ไม่ผ่านการคัดเลือก') && (sum<80)) {       
          axios.post("http://localhost:3001/insertInterview",{
            dataInterViewList:dataInterViewList,
            score1:score1,
            score2:score2,
            score3:score3,
            note1:note1,
            note2:note2,
            note3:note3,
            feedback:feedback,
            sum:sum,
            regisId:dataInterViewList[0].id,
            adminId:auth.usersData[0].id,
            date:date,
            bordOpenion:bordOpenion,
            bType:dataInterViewList[0].id_type,
            bLocation:dataInterViewList[0].id_locations
          }).then((res)=>{
            swal("Good","Click","success").then((value)=>{
              history.go('HomeStore/InterView')
              setIsload(false)
          }) 
          })
        }
        else if((bordOpenion==='ผ่านการคัดเลือก') && (sum>=80)){        
          axios.post("http://localhost:3001/insertInterview",{
            dataInterViewList:dataInterViewList,
            score1:score1,
            score2:score2,
            score3:score3,
            note1:note1,
            note2:note2,
            note3:note3,
            feedback:feedback,
            sum:sum,
            regisId:dataInterViewList[0].id,
            adminId:auth.usersData[0].id,
            date:date,
            bordOpenion:bordOpenion,
            bType:dataInterViewList[0].id_type,
            bLocation:dataInterViewList[0].id_locations
          }).then((res)=>{
            swal("Good","Click","success").then((value)=>{
              history.go('HomeStore/InterView')
              setIsload(false)
          }) 
          })
        }
        else if((bordOpenion==='ผ่านการคัดเลือกแบบมีเงื่อนไข')&&((bType!='')&&(bLocation!=''))&&(sum>=80)){
          axios.post("http://localhost:3001/insertInterview",{
            dataInterViewList:dataInterViewList,
            score1:score1,
            score2:score2,
            score3:score3,
            note1:note1,
            note2:note2,
            note3:note3,
            feedback:feedback,
            sum:sum,
            regisId:dataInterViewList[0].id,
            adminId:auth.usersData[0].id,
            date:date,
            bordOpenion:bordOpenion,
            bType:bType,
            bLocation:bLocation
          }).then((res)=>{
            swal("Good","Click","success").then((value)=>{
              history.go('HomeStore/InterView')
              setIsload(false)
          }) 
          })
        }  
        else{
          swal("ข้อมูลไม่ถูกต้อง","โปรดตรวจสอบข้อมูลอีกครั้ง","warning")
        } 
      } else {
        swal('ข้อมูลไม่ถูกต้อง','โปรดตรวจสอบข้อมูลอีกครั้ง','warning')
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
    axios.post("http://localhost:3001/getInterViewDetial",{
           id:props.active 
    }).then((res)=>{
      setDataInterViewList(res.data)
      const [{dob}] = res.data
      const today = new Date();
      const birthDate = new Date(dob);  
      var age_now = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        setAge(--age_now); 
      }
      else{
        setAge(age_now)
      }
    }).then(
      axios.post("http://localhost:3001/getTypeList",{
        id:props.active
      }).then((res)=>{
          setTypeList(res.data)
      })
    ).then(
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
        <div className="containForm">
          <div className="headerForm">
            <h3>แบบฟอร์มการคัดเลือกผู้ประกอบการร้านค้าจำหน่ายอาหาร</h3>
          </div>
          <h5>ข้อมูลทั่วไป</h5>
          {dataInterViewList.map((dataInterViewList)=>(
            <div className="dataUser" key={dataInterViewList.id}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'50px'}}>
              <div className="itemUser1Name">
                <span>ชื่อผู้สมัค </span>                                                       
                <div className="inpit1Name" >
                  <FormControl disabled >
                    <Input id="name" value={dataInterViewList.name} inputProps={{ style: { textAlign: 'center', width:'500px'}}}  />
                  </FormControl> 
                </div>               
              </div> 
              <div className="itemUser2Age">
                <span>อายุ </span>                             
                <div className="inpit2Age" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="age" value={age} inputProps={{min: 0, style: { textAlign: 'center',width:'100%' }}}  />
                  </FormControl>
                </div>                 
                <div style={{width:'50px',display:'flex',justifyContent:'flex-start'}}>
                  ปี
                </div>
              </div>
              <div className="itemUserNumer">
                <span>เลชที่ผู้สมัคร </span>             
                <div className="inpitNumer" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="id" value={dataInterViewList.id} inputProps={{min: 0, style: { textAlign: 'center',width:'160px' }}}  />
                  </FormControl>
                </div>               
              </div>
            </div>             
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'80px',marginTop:'20px'}}>
              <div className="itemUser1StoreName">
                <span>ชื่อร้าน</span>               
                <div className="inpit1StoreName">
                  <FormControl disabled >
                    <Input id="storeName" value={dataInterViewList.store_name} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>        
              </div>
              <div className="itemUser2Type">
                ประเภทร้านค้าที่สมัคร
                <div className="inpit2Type">
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="type" value={dataInterViewList.type} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>              
              </div>
              <div className="itemUserLocation">
                <span>
                  โรงอาหาร
                </span>             
                <div className="inpitLocation" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="location" value={dataInterViewList.location} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>
              </div>
            </div>  
          </div>
          ))}         
          <hr/> 
          <div style={{marginLeft:'15px'}}>
            <h5>ผลการพิจารณา</h5>
          </div>          
          <form className={classes.root} autoComplete="off" onSubmit={Insert}>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  1.ความรู้ความสามารถ <br/>
                  (70 คะแนน)
                </h6>
                <InteViewDialog />
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <TextField id="number" type="number" variant="outlined" label="คะแนนที่ได้" InputLabelProps={{shrink: true}} onChange={(e)=>{setScore1(e.target.value)}} />
                <TextField id="หมายเหตุ1" variant="outlined" label="หมายเหตุ" InputLabelProps={{shrink: true}} onChange={(e)=>{setNote1(e.target.value)}} />
              </div> 
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  2.ประสบการณ์ <br/>
                  (15 คะแนน)
                </h6>
                <InteViewDialog1 />
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <TextField type="number" label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} onChange={(e)=>{setScore2(e.target.value)}} />
                <TextField id="หมายเหตุ2" variant="outlined" label="หมายเหตุ" InputLabelProps={{shrink: true}} onChange={(e)=>{setNote2(e.target.value)}} />
              </div> 
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  3.บุคลิกภาพ <br/>
                  (15 คะแนน)
                </h6>
                <InteViewDialog2 />
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <TextField  type="number" label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} onChange={(e)=>{setScore3(e.target.value)}} />
                <TextField id="หมายเหตุ3" variant="outlined" InputLabelProps={{shrink: true}} label="หมายเหตุ" onChange={(e)=>{setNote3(e.target.value)}} />
              </div>   
            </div>
            <hr/>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  ข้อเสนอแนะ
                </h6>
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
                <TextField multiline rows={5} type="text" style={{width:'815px'}} label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} onChange={(e)=>{setFeedback (e.target.value)}} />
              </div>  
            </div>     
              <div style={{display:'flex',flexDirection:'row',marginLeft:'20px' }}>
              <FormControl component="fieldset" >
                <FormLabel component="legend">ความเห็นของคณะกรรมการ</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={bordOpenion} onChange={handleChange}>
                  <FormControlLabel  value="ไม่ผ่านการคัดเลือก" control={<Radio />} label="ไม่ผ่านการคัดเลือก" />
                  <FormControlLabel  value="ผ่านการคัดเลือก" control={<Radio />} label="ผ่านการคัดเลือก" />
                  <FormControlLabel  value="ผ่านการคัดเลือกแบบมีเงื่อนไข" control={<Radio />} label="ผ่านการคัดเลือกแบบมีเงื่อนไข" />
                </RadioGroup>
              </FormControl>
              <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',marginLeft:'10px'}}>
                <Select disabled={bordOpenion!=="ผ่านการคัดเลือกแบบมีเงื่อนไข"} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={bLocation} onChange={(e)=>{setBLocation(e.target.value)}} >
                  {typeList.map((datas,index)=>(
                    <MenuItem key={index} value={datas.id}>{datas.store_type}</MenuItem>
                  ))}
                  
                </Select>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',marginBottom:'17px',marginLeft:'20px',fontWeight:'bold'}}>
                <span>ประจำโรงอาหาร</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',marginLeft:'15px'}}>
                <Select disabled={bordOpenion!=="ผ่านการคัดเลือกแบบมีเงื่อนไข"} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={bType} onChange={(e)=>{setBType(e.target.value)}} >
                  {locationList.map((datas,index)=>(
                    <MenuItem key={index} value={datas.id}>{datas.location}</MenuItem>
                  ))}                                
                </Select>
              </div>
              </div>  
            <Button variant="contained" type="submit" color="primary">บันทึก</Button>
          </form>          
        </div> 
      </div>
     </animated.div>   
    )
}

export default InterViewForm
