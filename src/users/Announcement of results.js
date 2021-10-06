import { animated, useTransition } from '@react-spring/web'
import React, {useContext, useEffect, useState} from 'react'
import './Announcement of results.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useHistory, useLocation} from 'react-router-dom';
import { AuthContext } from '../App';

export default function CheckPoint() {

  const history = useHistory()
  const { setIsload} = useContext(AuthContext);
  const [age, setAge] = useState('');
  const [dataCheckpoin, setDataCheckpoint] = useState([])
  const [idCard, setIdCard] = useState('')
  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const location = useLocation();
    const transitions = useTransition(location.pathname == '/CheckPoint', {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0 },
        leave:  {  y: 800}
      })
      const transitions1 = useTransition(location, {
        from: { opacity: 0 },
        enter: { opacity: 1},
        leave:  { opacity: 0}
      })
    const rightStatus =(values)=>{
      axios.post('http://localhost:3001/UpdateRightStatus',{
        idCard:idCard,
        rightStatus:values
      }).then(res=>{
        if (res.data.err) {
          console.log(res.data.err);
        } else {
         swal({ title: "เรียบร้อย",text: "เรียบร้อย'",icon: "success", button: "OK",}).then((value) =>{
          history.push('/')
          history.go() 
        }).then((value)=>{
          setIsload(false)
        }) 
        } 
      })
    }
    const checkStatus =()=>{
      axios.post('http://localhost:3001/getChectpoint',{
        idCard:idCard
      }).then((res)=>{    
        console.log(res.data);     
        setDataCheckpoint(res.data)
      })
    }

    return transitions1( 
    
        (styles,item) => item && <animated.div  className="conAnnoun" style={styles}>
            {transitions((styles, item) => item && ( <animated.div className="cont" style={styles}>
              <div style={{padding:'5px',display:'flex',alignItems:'center',flexDirection:'column',position:'relative'}}>              
                    <h2>
                    ตรวจสอบผลการคัดเลือกร้านค้า
                    </h2>            
                    <div style={{marginTop:'20px'}}>
                      <TextField onChange={(e) => setIdCard(e.target.value)} required value={idCard} id="เดือน-วัน-ปี เกิด" label="รหัสบัตรประชาชน" type="text"  style={{width:'370px',marginLeft:'25px'}} InputLabelProps={{ shrink: true, }} variant="outlined" />
                    </div>
                    <hr style={{width:'100%'}} />
                    {dataCheckpoin.map((data,index)=>(
                    
                    <div key={index}>
                    {data.right_status == 'ยืนยัน' ? (
                      <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                      <span style={{color:'#397037',marginTop:'10px'}}>
                      ท่านได้ยืนยันเป็นผู้ประกอบการแล้ว
                    </span>
                    <span style={{color:'#397037',marginTop:'10px'}}>
                      รหัสร้านค้า : {data.store_id}
                    </span>
                    <span style={{color:'#397037',marginTop:'10px'}}>
                      โดยสามารเข้าระบบแอพลิเคชั่นในมือถือโดยการกรอก <br/>
                       USERNAME:รหัสร้านค้า <br/>
                       PASSWORD:เลขบัตรประชาชน
                    </span>
                      </div>
                    ): data.status == 'ปฏิเสท' ? (<div>
                      <span style={{color:'#397037'}}>
                      ท่านได้ปฏิเสทเป็นผู้ประกอบการแล้ว
                    </span>
                      </div>)
                    : data.status !== '' ?
                    (
                      <div>
                       <h3>
                      ผลการสมัคร
                    </h3>
                    <span style={{color:'#397037',marginTop:'10px'}}>
                      {data.status}
                    </span>
                    <hr style={{width:'100%',marginTop:'20px'}} />
                    <h3 style={{marginTop:'20px'}}>
                      ผลการสัมภาษณ์
                    </h3>
                    <span style={{color:'#397037',marginTop:'20px'}}>
                      {data.bord_opinion_detial}
                    </span>
                    {data.bord_opinion_detial == 'ผ่านการคัดเลือกแบบมีเงื่อนไข' ? (
                    <div style={{display:'flex',alignItems:'center',flexDirection:'column',}}>
                    <h3 >
                      เงื่อนไข
                    </h3>
                    <span style={{color:'#397037'}}>
                      {data.location}
                    </span>
                    <span style={{color:'#397037'}}>
                      {data.store_type}
                    </span>
                    </div>
                    ): data.bord_opinion_detial == 'ไม่ผ่านการคัดเลือก' ? (
                    <div>
                      <span style={{color:'#000'}}>
                        {data.data.bord_opinion_detial}
                      </span>
                    </div>
                    ) : (
                      <div>
                      <span >
                      </span>
                    </div>
                    )
                  }
                    
                    {data.bord_opinion_detial == 'ผ่านการคัดเลือก' || data.bord_opinion_detial == 'ผ่านการคัดเลือกแบบมีเงื่อนไข' ? (
                    <div style={{marginTop:'20px'}}>
                    <h3>
                      ยืนยันสิทธิ์
                    </h3>
                    <span style={{marginRight:'20px'}}>
                      <Button onClick={()=> rightStatus('ยืนยัน')} variant="outlined" >ยืนยันสิทธิ์</Button>
                    </span>
                    <span style={{marginLeft:'20px'}}>
                    <Button onClick={()=> rightStatus('ปฏิเสท')} variant="outlined" >ปฏิเสท</Button>
                  </span>
                    </div>)
                    :('')
                  } 
                  </div>
                    )
                  : (
                    <div>
                      <span style={{color:'#000'}}>
                        รอดำเนินการ                     
                      </span>
                    </div>
                  )
                  }
                    
                  </div>
                ))}
                <Button onClick={checkStatus} variant="outlined" style={{position:'absolute',bottom:'20px'}}>ตรวจสอบ</Button>
              </div>                
            </animated.div> ))}
        </animated.div>
  )
}
