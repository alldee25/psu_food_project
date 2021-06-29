import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import React, { useContext, useEffect, useState } from 'react'
import './CleanlinessLevelForm.css'
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


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function CleanlinessLevelStore(props) {
  const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
  const [typeList,setTypeList] = useState([])
  const [locationList,setLocationList] = useState([])
  const [bType,setBType] = useState('')
  const [bLocation,setBLocation] = useState('')
  const [date,setDate] = useState('')
  const {auth,setIsload} = useContext(AuthContext)
  const [dataLevel,setDataLevel] = useState([])
  const [scores, setScore] = useState([
    {id: '',score: ''}
  ]);
  

  const transitions = useTransition(props.open, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0 },
    leave:  { opacity: 0,y: 800}
  })

  const handleChangeInput = (id, e) => {
    console.log(scores);
    const newInputFieles = scores.map(inputfild => {
      
      if(id === inputfild.id){
        inputfild[e.target.name] = e.target.value
      }
      return inputfild;
    })
    
  }

  useEffect(()=>{
    setIsload(true)
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
  ).then(
    axios.get("http://localhost:3001/getDetialList").then((res)=>{
        setDataLevel(res.data)
        res.data.map(element => {
          scores.push({id:element.id,score:''}) 
          });
        
    })
  ).then(setIsload(false))
},[])
    return transitions(
      (styles, item) =>item && <animated.div style={styles}>
        <div style={{display:'flex',justifyContent:'center'}}>
         <div className="containFormClean">
          <div className="headerFormClean">
          <h5>แบบฟอร์มการตรวจร้านค้าจำหน่ายอาหาร โรงอาหารมหาวทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี</h5>
          </div>
          {dataCleanlinessLevelList.map((dataCleanlinessLevelList)=>(
            <div className="dataUserClean" key={dataCleanlinessLevelList.id}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'50px'}}>
              <div className="itemUser1NameClean">
                <span>วันที่ </span>                                                       
                <div className="inpit1NameClean" >
                  <FormControl disabled >
                
                    <Input id="name" value={dataCleanlinessLevelList.name} inputProps={{ style: { textAlign: 'center', width:'500px'}}}  />
                  </FormControl> 
                </div>               
              </div> 
              <div className="itemUser2AgeClean">
                <span>เดือน </span>                             
                <div className="inpit2AgeClean" >
                  <FormControl disabled >
                    <Input id="age" value='#' inputProps={{min: 0, style: { textAlign: 'center',width:'100px' }}}  />
                  </FormControl>
                </div>                             
              </div>
              <div className="itemUserNumerClean">
                <span>พ.ศ</span>             
                <div className="inpitNumerClean" >
                  <FormControl disabled >
                    <Input id="id" value={dataCleanlinessLevelList.id} inputProps={{min: 0, style: { textAlign: 'center',width:'160px' }}}  />
                  </FormControl>
                </div>               
              </div>
              <div className="itemUserNumerClean">
                <span>เวลา</span>             
                <div className="inpitNumerClean" >
                  <FormControl disabled >
                    <Input id="id" value={dataCleanlinessLevelList.id} inputProps={{min: 0, style: { textAlign: 'center',width:'160px' }}}  />
                  </FormControl>
                </div>               
              </div>
            </div>             
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'80px',marginTop:'20px'}}>
              <div className="itemUser1StoreNameClean">
                <span>ชื่อร้าน</span>               
                <div className="inpit1StoreNameClean">
                  <FormControl disabled >
                    <Input id="storeName" value={dataCleanlinessLevelList.store_name} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>        
              </div>
              <div className="itemUser2TypeClean">
                ประเภทร้านค้าที่สมัคร
                <div className="inpit2TypeClean">
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="type" value={dataCleanlinessLevelList.type} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>              
              </div>
              <div className="itemUserLocationClean">
                <span>
                  โรงอาหาร
                </span>             
                <div className="inpitLocationClean" >
                  <FormControl disabled style={{marginLeft:'30px'}}>
                    <Input id="location" value={dataCleanlinessLevelList.location} inputProps={{min: 0, style: { textAlign: 'center',width:'300px' }}}  />
                  </FormControl>
                </div>
              </div>
            </div>  
          </div>
          ))}
            <div className="table">
              <TableContainer style={{width:'1100px'}} component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ข้อ</TableCell>
                    <TableCell align="left">หัวข้อตรวจสอบ</TableCell>
                    <TableCell align="center" width="250">ผลการตรวจ(ระดับ)</TableCell>
                    <TableCell align="center">รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataLevel.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="left" width="500">{row.detial}</TableCell>
                      <TableCell align="left" >
                        <RadioGroup row aria-label="position" name="position" value={scores.score} onChange={value => handleChangeInput(row.id,value)} defaultValue="top">
                          <FormControlLabel
                            value="1"
                            name="score"
                            control={<Radio color="primary" />}
                            label='1'
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            value="2"
                            name="score"
                            control={<Radio color="primary" />}
                            label="2"
                            labelPlacement="top"
                          />
                          <FormControlLabel
                            value="3"
                            name="score"
                            control={<Radio color="primary" />}
                            label="3"
                            labelPlacement="top"
                          />
                          </RadioGroup>
                      </TableCell>
                      <TableCell align="center"><TextField id="outlined-basic" multiline rows="4" variant="outlined" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
    
         </div>
        </div>
      </animated.div>
    )
}

export default CleanlinessLevelStore
