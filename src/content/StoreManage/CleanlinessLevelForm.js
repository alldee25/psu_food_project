import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import React, { useContext, useEffect, useState } from 'react'
import './InterViewForm.css'
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

function CleanlinessLevelStore(props) {
  const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
  const [typeList,setTypeList] = useState([])
  const [locationList,setLocationList] = useState([])
  const [bType,setBType] = useState('')
  const [bLocation,setBLocation] = useState('')
  const [date,setDate] = useState('')
  const {auth,setIsload} = useContext(AuthContext)
  

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
  axios.post("http://localhost:3001/getStoreAndStoreOwnerDetial",{
         id:props.active 
  }).then((res)=>{
    setDataCleanlinessLevelList(res.data)
    const [{dob}] = res.data
    const today = new Date();
    const birthDate = new Date(dob);  
    const m = today.getMonth() - birthDate.getMonth();
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
          <h5>แบบฟอร์มการตรวจร้านค้าจำหน่ายอาหาร โรงอาหารมหาวทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี</h5>
          {dataCleanlinessLevelList.map((dataCleanlinessLevelList)=>(
            <div className="dataUser" key={dataCleanlinessLevelList.id}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'50px'}}>
              <div className="itemUser1Name">
                <span>ชื่อผู้สมัค </span>                                                       
                <div className="inpit1Name" >
                  <FormControl disabled >
                    <Input id="name" value={dataCleanlinessLevelList.name} inputProps={{ style: { textAlign: 'center', width:'500px'}}}  />
                  </FormControl> 
                </div>               
              </div> 
              <div className="itemUser2Age">
                <span>อายุ </span>                             
                <div className="inpit2Age" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="age" value='#' inputProps={{min: 0, style: { textAlign: 'center',width:'100%' }}}  />
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
                    <Input id="id" value={dataCleanlinessLevelList.id} inputProps={{min: 0, style: { textAlign: 'center',width:'160px' }}}  />
                  </FormControl>
                </div>               
              </div>
            </div>             
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'80px',marginTop:'20px'}}>
              <div className="itemUser1StoreName">
                <span>ชื่อร้าน</span>               
                <div className="inpit1StoreName">
                  <FormControl disabled >
                    <Input id="storeName" value={dataCleanlinessLevelList.store_name} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>        
              </div>
              <div className="itemUser2Type">
                ประเภทร้านค้าที่สมัคร
                <div className="inpit2Type">
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="type" value={dataCleanlinessLevelList.type} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>              
              </div>
              <div className="itemUserLocation">
                <span>
                  โรงอาหาร
                </span>             
                <div className="inpitLocation" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="location" value={dataCleanlinessLevelList.location} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>
              </div>
            </div>  
          </div>
          ))}
          </div>
         </div>
        </div>
      </animated.div>
    )
}

export default CleanlinessLevelStore
