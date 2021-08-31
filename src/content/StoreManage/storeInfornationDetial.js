import React, { useContext, useEffect } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { AuthContext } from '../../App';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { Button, Checkbox, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, makeStyles, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { animated, useTransition } from '@react-spring/web';
import { useState } from 'react';
import './ApplicationDetial.css'
import axios from 'axios';
import { set } from 'date-fns';
import swal from 'sweetalert';
import './storeInfornationDetial.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: '25ch',
    },
  },
}));

function StoreInfornationDetial(props) {

  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation()
  const [agree,setArgee] = useState(false)
  const [menuList, setMenuList] = useState([])
  const classes = useStyles()
  const [age, setAge] = useState('')
  const [save,setSave] = useState(false)
  const [data, setData] = useState([])
  const steps = getSteps();
  const {setIsload} = useContext(AuthContext)

  const transitions1 = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1},
    leave:  { opacity: 0}
  })

  const transitions = useTransition(activeStep === 0, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0 },
    leave:  { opacity: 0,y: 800}
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setArgee(false)
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
    setArgee(true)
    }       
  }

  function getSteps() {
    return ['หน้าที่ 1', 'หน้าที่ 2', 'หน้าที่ 3'];
  }

  useEffect(()=>{
    axios.post('http://localhost:3001/getStoreAndStoreOwnerDetial',{
      id:props.active
    }).then(
      (res)=>{ 
        const [{dob}] = res.data      
        setData(res.data)
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
      }
    ).then(
      axios.post("http://localhost:3001/getStoreMenuList",{
        id:props.active
      }).then((res => {           
        setMenuList(res.data)
      }))
    )
  },[]) 

  function getStepContent(step) {
    switch (step) {
      case 0:
        return transitions(
              (styles, item) => item && <animated.div  className="containerInfo" style={styles}> 
                <div className="headInfo"> 
                <h4> &nbsp;&nbsp;ข้อมูลร้านค้าประจำโรงอาหารมหาวิยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
                </h4>                
                </div>                
                <div className="form">
                  <div className="Title" style={{marginLeft:'10px'}}>
                    <h3>ข้อมูลเจ้าของร้าน</h3>
                    <hr />
                </div>
                <div style={{marginLeft:'10px'}}>
                  {data.map((datas,index)=>(
                    <div key={index}>
                <TextField  id="ชื่อ-นามสกุล"         disabled value={datas.name} label="ชื่อ-นามสกุล" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                <TextField id="เดือน-วัน-ปี เกิด"      disabled value={datas.dob} label="เดือน-วัน-ปี เกิด" type="date"  style={{width:'30%'}} InputLabelProps={{ shrink: true, }} variant="outlined" />
                <TextField id="อายุ"                disabled value={age} label="อายุ" type="text" style={{width:'30%'}} disabled={true} InputLabelProps={{ readOnly:true, shrink: true, }} variant="outlined" /> 
                <TextField id="เชื้อชาติ"             disabled value={datas.race} label="เชื้อชาติ" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true}} variant="outlined" />
                <TextField id="สัญชาติ"             disabled value={datas.nationality} label="สัญชาติ" type="text"  style={{width:'30%'}}InputLabelProps={{shrink: true}} variant="outlined" />
                <TextField id="ศาสนา"             disabled value={datas.religion} label="ศาสนา" type="text" style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField id="หมายเลขบัตรประชาชน" disabled value={datas.idcard} label="หมายเลขบัตรประชาชน" type="number" style={{width:'30%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField id="วันที่ออกบัตร"        disabled value={datas.idstart} label="วันที่ออกบัตร" type="text"  style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField id="บัตรหมดอายุ"        disabled value={datas.idend} label="บัตรหมดอายุ" type="text"  style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField id="ที่อยู่ที่สามารถติดต่อได้" disabled value={datas.adress} label="ที่อยู่ที่สามารถติดต่อได้" type="text" multiline rows={4} style={{width:'95%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField id="โทรศัท์"            disabled value={datas.phone} label="โทรศัท์" type="text" style={{width:'45.9%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField id="email"            disabled value={datas.email} label="Email" type="email" style={{width:'45.9%'}} InputLabelProps={{ shrink: true }} variant="outlined" />                                                                                          
                  <div className="Title">
                            <h3>ข้อมูลร้านค้า</h3>
                            <hr />
                        </div>                   
                <div style={{marginLeft:'10px'}}>
                   <TextField disabled value={datas.store_name} id="ชื่อร้าน" label="ชื่อร้าน" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                    <TextField disabled value={datas.type+","+datas.type1} id="ประเภทร้าน"   label="ประเภทร้าน" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                    <TextField disabled value={datas.location} id="โรงอาหาร"           label="โรงอาหาร" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                             
                </div>
                </div> 
                  ))}
                  </div>     
                </div>                                                
              </animated.div>
        )
      case 1:
        return (
          <div className="containerInfo" >
            <div className="form2" >
              <div className="Title2">
                <h3>รายการอาหาร/เคื่องดื่มที่นำเสนอ</h3>
                <hr />
              </div>
              <div style={{marginLeft:'10px'}}>                 
              <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
              { menuList.map((inputfilds) => (                       
                      <div key={inputfilds.id} style={{width:'100%'}}>
                        <TextField disabled name="menu"  type="text" variant="outlined" value={inputfilds.menu} label="เมนู"  id="menu"  InputLabelProps={{shrink: true,}}  style={{width:'50%'}} />                                                                                                                                     
                        <TextField disabled name="price"  type="number"variant="outlined" value={inputfilds.price} label="ราคา" id="price" InputLabelProps={{shrink: true,}}  style={{width:'30%'}}  />                                                                                                       
                      </div>                                                                                                                                                                                                   
                    ))}
              </div>
                    <hr/>                                             
              </div>
            </div>
        </div>
        );
      case 2:
        return (
          <div className="containerInfo" >
            <div className="form2" >
              <div style={{marginLeft:'20px'}}>
                <h3>รายการโปรโมชั่นต่าง ๆ ที่นำเสนอ</h3>
                  <hr />
              </div>
              <div style={{marginLeft:'10px'}}>                 
                <div style={{width:'100%',display:'flex',flexDirection:'column'}}>                                                                                      
                  <div  style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    {data.map((datas,index)=>(
                      <TextField key={index} disabled multiline rows={5} value={datas.promosion} type="text" variant="outlined" id="promosion"  InputLabelProps={{shrink: true,}}  style={{width:'100%'}} />                                                                                                                                                                                                  
                    ))}
                  </div>                                                                                                                                                                                                                                  
                </div>
                <hr/>                                             
              </div>
            </div>
          </div>
          
        ) ;
      default:
        return 'Unknown step';
    }
  }
    return transitions1(
    (styles, item) =>item && <animated.div className="containAppInfo" style={styles}>
      {save===true && <div className="save" ></div> }
    <div className={classes.root}  style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100vw',height:'100vh'}}>
      <Stepper activeStep={activeStep} alternativeLabel style={{width:'100%',height:'100px',backgroundColor:'transparent'}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{display:'flex',justifyContent:'center'}}>
            <Typography className={classes.instructions}>All steps completed</Typography>
          </div>
        ) : (
          <div >
            <div>{getStepContent(activeStep)}</div>
            <div style={{position:'relative',display:'flex',flexDirection:'row'}}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton} style={{position:'absolute',left:'55px',bottom:'30px'}}>กลับ</Button>
              <Button variant="contained" disabled={activeStep === steps.length - 1} color="primary" onClick={handleNext} style={{position:'absolute',right:'55px',bottom:'30px'}}>
                ถัดไป
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </animated.div>
    )
}

export default StoreInfornationDetial
