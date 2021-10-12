import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect, useState } from 'react'
import './CleanlinessLevelForm.css'
import axios from 'axios';
import { Button } from '@material-ui/core';
import swal from 'sweetalert';
import {AuthContext} from '../../App'
import { useHistory } from 'react-router';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { animated, useTransition } from 'react-spring';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function CleanlinessLevelInfo(props) {
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


  useEffect(()=>{
    axios.post("http://localhost:3001/getDetialClean",{
        storeId:props.active,
         cleanId:props.cleanId
    }).then((res)=>{
        console.log(res.data);
    setDataCleanlinessLevelList(res.data)
  }).then(
    axios.post("http://localhost:3001/getDetialListInfo",{
        storeId:props.active,
        cleanId:props.cleanId
    }).then((res)=>{
        setDataLevel(res.data)
        
    })
  ).then(setIsload(false))
},[])
    return transitions(
      (styles, item) =>item && <animated.div style={styles}>
        <div style={{display:'flex',justifyContent:'center'}}>
         <div className="containCleanInfo">
          <div className="headerFormClean">
          <h5>แบบฟอร์มการตรวจร้านค้าจำหน่ายอาหาร โรงอาหารมหาวทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี</h5>
          </div>
          {dataCleanlinessLevelList.map((dataCleanlinessLevelList)=>(
            <div className="dataUserClean" key={dataCleanlinessLevelList.id}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',height:'50px'}}>
            <div className="itemUserNumerClean">             
                <div className="inpitNumerClean" >
                <TextField disabled defaultValue={dataCleanlinessLevelList.date}  id="date" inputProps={{ min:(date),max:(dateLast) }} label="วันที่" InputLabelProps={{ shrink: true, }}  style={{width:'100%'}} />
                </div>               
              </div>
              <div className="itemUserNumerClean">             
                <div className="inpitNumerClean" >
                  <TextField disabled id="time" label="เวลา" defaultValue={dataCleanlinessLevelList.time} InputLabelProps={{shrink: true}} />
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
          <form>
            <div className="table">
            <TableContainer style={{width:'1100px'}} component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ข้อ</TableCell>
                    <TableCell align="center">หัวข้อตรวจสอบ</TableCell>
                    <TableCell align="center" >คะแนนที่ได้</TableCell>
                    <TableCell align="center">รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>               
                <TableBody>
                  {dataLevel.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.topic}</TableCell>
                      <TableCell align="center" >{row.topic_detial}</TableCell>
                      <TableCell align="center" >{row.point}</TableCell>
                      <TableCell align="center" width="200"><TextField disabled value={row.detial} name="detial"  id={row.index} multiline rows="2" variant="outlined" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
            <div className="detial" style={{width:'100%',display:'flex',justifyContent:'center'}}>
                {dataCleanlinessLevelList.map((data,index) => (

                     <TextField key={index} defaultValue={data.feedback} disabled label="ข้อเสนอแนะอื่นๆ" style={{width:'1100px'}} id="detial" multiline rows="4" variant="outlined" />
                ))}
            </div>         
        </form>
         </div>              
        </div>
      </animated.div>
    )
}

export default CleanlinessLevelInfo
