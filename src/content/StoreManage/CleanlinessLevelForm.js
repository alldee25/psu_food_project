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
  const history = useHistory()
  const [date,setDate] = useState('')
  const [time,setTime] = useState('')
  const {auth,setIsload,isload} = useContext(AuthContext)
  const [dataLevel,setDataLevel] = useState([])
  const [scores, setScore] = useState([]);
  const [feedback, setFeedback ] = useState('')
  const [dateLast, setDateLast] = useState('')
  const [dateInput, setDateInput] = useState('')

  const transitions = useTransition(!isload, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0,delay:150 },
    leave:  { opacity: 0,y: 800},
  })

  const handleChangeInput = (id, e) => {
    scores.map(inputfild => {
      if(id === inputfild.id){
        inputfild[e.target.name] = e.target.value
      }
      return inputfild;
    })
  }
  const InsertData = (e) =>{
    e.preventDefault(e.target.value)
    const id = scores.every((score)=>{
        return score.score !== ''
      })
     const sum =  scores.reduce((result,score)=>{
        return result + Number(score.score)
      },0)
      if (id && time !== '') {
        if (sum>=36 && scores[4].score > 0) {
          swal("กด ok เพื่อยืนยันการบันทึก",{
        })
        .then((value) => {
          if (value) {
            axios.post("http://localhost:3001/InsertStoreCleanLevel",{
          scores:scores,
          date:dateInput,
          time:time,
          storeId:dataCleanlinessLevelList[0].store_id,
          adminId:auth.usersData[0].id,
          status:'ผ่าน',
          feedback:feedback 
          }).then(swal({
            title: "บันทึกเรียบร้อย",
            text: "กดปุ่มเพื่อไปต่อ",
            icon: "success",
            button: "OK",
          }).then((value) =>{
            history.push('/HomeStore/CleanlinessLevel')
            history.go() 
            }))
          }
          })
        } else {
          swal("กด ok เพื่อยืนยันการบันทึก",{
          })
          .then((value) => {
            if (value) {
              axios.post("http://localhost:3001/InsertStoreCleanLevel",{
            scores:scores,
            date:dateInput,
            time:time,
            storeId:dataCleanlinessLevelList[0].store_id,
            adminId:auth.usersData[0].id,
            status:'ไม่ผ่าน',
            feedback:feedback 
            }).then(swal({
              title: "บันทึกเรียบร้อย",
              text: "กดปุ่มเพื่อไปต่อ",
              icon: "success",
              button: "OK",
            }).then((value) =>{
              history.push('/HomeStore/CleanlinessLevel')
              history.go() 
              }))
            }
            })
        }
      } else {
        swal('ข้อมูลไม่ครบถ้วน','โปรดป้อรข้อมูลให้ครบถ้วน','warning')
      }
  }

  useEffect(()=>{
    setIsload(true)
    const today = new Date(props.forDate);
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth() +1
    const lastDayToday = todayDate.getDate()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDate();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const yeartoday = today.getFullYear() 
    const month = today.getMonth() +1
    setTime(time)
    if(month < 10){
      if (todayMonth == month) {
        const fordayFirst = `${yeartoday}-0${month}-0${firstDay}`
        const fordayLast = `${yeartoday}-0${month}-${lastDayToday}`
        setDate(fordayFirst)
        setDateLast(fordayLast)
      } else {
      const fordayFirst = `${yeartoday}-0${month}-0${firstDay}`
      const fordayLast = `${yeartoday}-0${month}-${lastDay}`
      setDate(fordayFirst)
      setDateLast(fordayLast)
      }
       
    }
    else if( month > 9){
      const fordayFirst = `${yeartoday}-${month}-0${firstDay}`
      const fordayLast = `${yeartoday}-${month}-${lastDay}`
      setDate(fordayFirst)
      setDateLast(fordayLast)      
    }
    else{
     const fordayFirst = `${yeartoday}-${month}-0${firstDay}`
     const fordayLast = `${yeartoday}-${month}-${lastDay}`
     setDate(fordayFirst)
     setDateLast(fordayLast)  
    } 
    axios.post("http://localhost:3001/getStoreAndStoreOwnerDetial",{
         id:props.active 
    }).then((res)=>{
    setDataCleanlinessLevelList(res.data)
  }).then(
    axios.get("http://localhost:3001/getDetialList").then((res)=>{
        setDataLevel(res.data)
        res.data.map(element => {
          scores.push({id:element.id,score:'',detial:''}) 
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
            <div className="itemUserNumerClean">             
                <div className="inpitNumerClean" >
                <TextField type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} id="date" inputProps={{ min:(date),max:(dateLast) }} label="วันที่" InputLabelProps={{ shrink: true, }}  style={{width:'100%'}} />
                </div>               
              </div>
              <div className="itemUserNumerClean">             
                <div className="inpitNumerClean" >
                  <TextField type="time" id="time" label="เวลา" onChange={(e)=>{setTime(e.target.value)}} InputLabelProps={{shrink: true}} />
                </div>               
              </div>
            </div>             
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'80px',marginTop:'20px'}}>
              <div className="itemUser1StoreNameClean">                             
                <TextField disabled id="dstoreNameate" label="ชื่อร้าน" defaultValue={dataCleanlinessLevelList.store_name} />                     
              </div>
              <div className="itemUser2TypeClean">                              
                <TextField disabled style={{marginLeft:'30px'}} disabled id="type" label="ประเภทร้านค้าที่สมัคร" defaultValue={dataCleanlinessLevelList.type} />                            
              </div>
              <div className="itemUserLocationClean">                                                    
                <TextField disabled style={{marginLeft:'30px'}} disabled id="type" label="โรงอาหาร" defaultValue={dataCleanlinessLevelList.location} />              
              </div>
            </div>  
          </div>
          ))}
          <form onSubmit={InsertData}>
            <div className="table">
              <TableContainer style={{width:'1100px'}} component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ข้อ</TableCell>
                    <TableCell align="left">หัวข้อตรวจสอบ</TableCell>
                    <TableCell align="center" >ผลการตรวจ(ระดับ)</TableCell>
                    <TableCell align="center">รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>               
                <TableBody>
                  {dataLevel.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="left" >{row.detial}</TableCell>
                      <TableCell align="left" width="400">
                        <RadioGroup row aria-label="position" name="position" value={scores.score} onChange={value => handleChangeInput(row.id,value)} defaultValue="top">
                        <FormControlLabel
                            value="0"
                            name="score"
                            control={<Radio color="primary" />}
                            label='0'
                            labelPlacement="top"
                            width="10"
                          />
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
                      <TableCell align="center" width="200"><TextField name="detial" onChange={value => handleChangeInput(row.id,value)} id={row.index} multiline rows="4" variant="outlined" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            <div className="detial" style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <TextField onChange={(e)=>setFeedback(e.target.value)} label="ข้อเสนอแนะอื่นๆ" style={{width:'1100px'}} id="detial" multiline rows="4" variant="outlined" />
            </div>         
            <Button type="submit" variant="contained" color="primary" style={{position:'absolute',right:'20px',bottom:'20px'}}>บันทึก</Button>
        </form>
         </div>              
        </div>
      </animated.div>
    )
}

export default CleanlinessLevelStore
