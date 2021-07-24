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
  
function InterViewDetial(props) {
    
    const {auth,setIsload} = useContext(AuthContext)
    const [age,setAge] = useState('')
    const [date,setDate] = useState('')
    const classes = useStyles();
    const [boardLT,setboardLT] = useState([])
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
    axios.post("http://localhost:3001/getInterViewDetialForSee",{
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
        axios.post("http://localhost:3001/getTypeList",{
          id:props.active
        }).then((res)=>{
            setTypeList(res.data)
        })
      ).then(
      axios.post("http://localhost:3001/getInterViewDetialForSeeBoardlocationAdnType",{
        id:props.active
      }).then((res)=>{
        setboardLT(res.data)
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
          <form className={classes.root} autoComplete="off">
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  1.ความรู้ความสามารถ <br/>
                  (70 คะแนน)
                </h6>
                <InteViewDialog />
              </div>
              {dataInterViewList.map((data,index)=>(
                <div key={index} style={{display:'flex',flexDirection:'row'}}>
                    <TextField disabled id="number" type="number" variant="outlined" label="คะแนนที่ได้" InputLabelProps={{shrink: true}} value={data.score1} />
                    <TextField disabled id="หมายเหตุ1" variant="outlined" label="หมายเหตุ" InputLabelProps={{shrink: true}} value={data.note1} />
                </div>  
              ))}
               
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  2.ประสบการณ์ <br/>
                  (15 คะแนน)
                </h6>
                <InteViewDialog1 />
              </div>
              {dataInterViewList.map((data,index)=>(
                <div key={index} style={{display:'flex',flexDirection:'row'}}>
                    <TextField disabled type="number" label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} value={data.score2} />
                    <TextField disabled id="หมายเหตุ2" variant="outlined" label="หมายเหตุ" InputLabelProps={{shrink: true}} value={data.note2} />
                </div>
                ))} 
               
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  3.บุคลิกภาพ <br/>
                  (15 คะแนน)
                </h6>
                <InteViewDialog2 />
              </div>
              {dataInterViewList.map((data,index)=>(
              <div key={index} style={{display:'flex',flexDirection:'row'}}>
                <TextField disabled type="number" label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} value={data.score3} />
                <TextField disabled id="หมายเหตุ3" variant="outlined" InputLabelProps={{shrink: true}} label="หมายเหตุ" value={data.note3} />
              </div>
              ))}   
            </div>
            <hr/>
            <div style={{display:'flex',flexDirection:'row'}}>
              <div className="titleForm">
                <h6>
                  ข้อเสนอแนะ
                </h6>
              </div>
              {dataInterViewList.map((data,index)=>(
              <div key={index} style={{display:'flex',flexDirection:'row'}}>
                <TextField disabled multiline rows={5} type="text" style={{width:'815px'}} label="คะแนนที่ได้" variant="outlined" InputLabelProps={{shrink: true}} value={data.feedback} />
              </div>
              ))}  
            </div>     
              <div style={{display:'flex',flexDirection:'row',marginLeft:'20px' }}>
              <FormControl component="fieldset" >
                <FormLabel component="legend">ความเห็นของคณะกรรมการ</FormLabel>
                {dataInterViewList.map((data,index)=>(
                <RadioGroup key={index} aria-label="gender" name="gender1" value={data.bord_opinion_detial} >
                  <FormControlLabel disabled value="ไม่ผ่านการคัดเลือก" control={<Radio />} label="ไม่ผ่านการคัดเลือก" />
                  <FormControlLabel disabled value="ผ่านการคัดเลือก" control={<Radio />} label="ผ่านการคัดเลือก" />
                  <FormControlLabel disabled value="ผ่านการคัดเลือกแบบมีเงื่อนไข" control={<Radio />} label="ผ่านการคัดเลือกแบบมีเงื่อนไข" />
                </RadioGroup>
                ))}
              </FormControl>
              
                  {boardLT.map((data,index)=>(
                    <div key={index} style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',marginLeft:'10px'}}>
                        <TextField id="demo-simple-select-helper" value={data.store_type}  />
                    </div>   
                  ))}
              <div style={{display:'flex',alignItems:'flex-end',marginBottom:'17px',marginLeft:'20px',fontWeight:'bold'}}>
                <span>ประจำโรงอาหาร</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',marginBottom:'15px',marginLeft:'15px'}}>
                <Select disabled id="demo-simple-select-helper" value={bType} onChange={(e)=>{setBType(e.target.value)}} >
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

export default InterViewDetial
