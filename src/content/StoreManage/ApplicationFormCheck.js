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
import psuLogo from './../../img/Prince_of_Songkla_University_Emblem.png'
import axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: '25ch',
    },
  },
}));

function ApplicationDetial(props) {
    
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation()
    const history = useHistory() 
    const {auth,setIsload} = useContext(AuthContext);
    const classes = useStyles()
    const [agree,setArgee] = useState(false)
    const [data, setData] = useState([])
    const [menuList, setMenuList] = useState([])
    const [age, setAge] = useState('')
    const [save,setSave] = useState(false)
    const [state, setState] = useState({
      image: false,
      copyIdcard: false,
      copyHome: false,
      MedicalCertificate:false,
      Certificate:false,
      Applicationfee:false
    });
    const steps = getSteps();

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    const checkAll =()=>{
      if (error) {
        setState({image:false,copyIdcard:false,copyHome:false,MedicalCertificate:false,Certificate:false,Applicationfee:false})
      }else{
        setState({image:true,copyIdcard:true,copyHome:true,MedicalCertificate:true,Certificate:true,Applicationfee:true})
      } 
    }
    const { image, copyIdcard, copyHome, MedicalCertificate, Certificate, Applicationfee } = state;
    const error = [image, copyIdcard, copyHome, MedicalCertificate, Certificate, Applicationfee].every((v) => v) === true;
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setArgee(false)
      };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 3) {
          const today = new Date();
          setSave(true)
          console.log(today);
          console.log(props.active);
          const checketial = [image, copyIdcard, copyHome, MedicalCertificate, Applicationfee].every((v) => v) === true;
          if (checketial) {
            setIsload(true)
            axios.post('http://localhost:3001/CheckApplication',{
          id:props.active,
          status:'หลักฐานครบ',
          Detial:state,
          adminId:auth.usersData[0].id,
          date:today
        }).then((res)=>{
          swal("ตรวจสอบหลักฐานข้อมูลเรียบร้อย!", "You clicked the button!", "success").then((value)=>{
        history.go('HomeStore/CheckApplication')
         setIsload(false)
          }                 
         )    
        })
          }else{
            axios.post('http://localhost:3001/CheckApplication',{
          id:props.active,
          status:'หลักฐานไม่ครบ',
          Detial:state,
          adminId:auth.usersData[0].id,
          date:today   
        }).then((res)=>{
          swal("ตรวจสอบหลักฐานข้อมูลเรียบร้อย!", "You clicked the button!", "success").then((value)=>{
            history.go('HomeStore/CheckApplication')
             setIsload(false)
              }                 
             )                 
        })
          }
      }
        if (activeStep === 2) {
        setArgee(true)
        }       
      }

      useEffect(()=>{
        axios.post('http://localhost:3001/getStoreApplicationsDetial',{
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
          axios.post("http://localhost:3001/getMenuList",{
            id:props.active
          }).then((res => {           
            setMenuList(res.data)
          }))
        )
      },[])
      
//-----------------------------------------------------------------------Animation------------------------------------------------
const transitions = useTransition(activeStep === 0, {
  from: { opacity: 0, y: 800 },
  enter: { opacity: 1, y: 0 },
  leave:  { opacity: 0,y: 800}
})

const transitions1 = useTransition(location, {
  from: { opacity: 0 },
  enter: { opacity: 1},
  leave:  { opacity: 0}
})

//--------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------Step Func--------------------------------------   
function getSteps() {
  return ['หน้าที่ 1', 'หน้าที่ 2', 'หน้าที่ 3', 'หน้าที่ 4'];
} 

function getStepContent(step) {
  switch (step) {
    case 0:
      return transitions(     
            (styles, item) => item && <animated.div  className="container" style={styles}> 
              {data.map((datas,index)=>(
                <div key={index}>
                  <div className="head">
                  <img width="auto" height="120" src={psuLogo}/> 
                  <p> &nbsp;&nbsp;ใบสมัคเข้าเป็นผู้ประกอบการร้านค้าจำหน่ายอาหาร<br />
                  โรงอาหารมหาวิยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
                  </p>               
                  <div style={{width:"180px",position:'absolute',right:'15px',top:'-15px',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{borderStyle:'solid'}}>
                      <img  width="120" height="140"  src={`http://localhost:3001/userUploaded/${datas.img}`}/>
                    </div>                                   
                  </div>                
                  </div>                
                  <div className="form">
                    <div className="Title">
                      <h3>ข้อมูลผู้สมัค</h3>
                      <hr />
                    </div>
                    <div style={{marginLeft:'10px'}}>                                
                        <TextField  id="ชื่อ-นามสกุล"         disabled value={`${datas.name} ${datas.lastname}`} label="ชื่อ-นามสกุล" type="text" style={{width:'340px'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                        <TextField id="เดือน-วัน-ปี เกิด"      disabled value={datas.dob} label="เดือน-วัน-ปี เกิด" type="date"  style={{width:'340px'}} InputLabelProps={{ shrink: true, }} variant="outlined" />
                        <TextField id="อายุ"                disabled value={age} label="อายุ" type="text" style={{width:'340px'}} disabled={true} InputLabelProps={{ readOnly:true, shrink: true, }} variant="outlined" /> 
                        <TextField id="เชื้อชาติ"             disabled value={datas.race} label="เชื้อชาติ" type="text" style={{width:'340px'}} InputLabelProps={{shrink: true}} variant="outlined" />
                        <TextField id="สัญชาติ"             disabled value={datas.nationality} label="สัญชาติ" type="text"  style={{width:'340px'}}InputLabelProps={{shrink: true}} variant="outlined" />
                        <TextField id="ศาสนา"             disabled value={datas.religion} label="ศาสนา" type="text" style={{width:'340px'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                        <TextField id="หมายเลขบัตรประชาชน" disabled value={datas.idcard} label="หมายเลขบัตรประชาชน" type="number" style={{width:'340px'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                        <TextField id="วันที่ออกบัตร"        disabled value={datas.idstart} label="วันที่ออกบัตร" type="text"  style={{width:'340px'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                        <TextField id="บัตรหมดอายุ"        disabled value={datas.idend} label="บัตรหมดอายุ" type="text"  style={{width:'340px'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                        <TextField id="ที่อยู่ที่สามารถติดต่อได้" disabled value={datas.adress} label="ที่อยู่ที่สามารถติดต่อได้" type="text" multiline rows={4} style={{width:'1068px'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                        <TextField id="โทรศัท์"            disabled value={datas.phone} label="โทรศัท์" type="text" style={{width:'522px'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                        <TextField id="email"            disabled value={datas.email} label="Email" type="email" style={{width:'522px'}} InputLabelProps={{ shrink: true }} variant="outlined" />                                                                                         
                    </div>     
                  </div> 
                </div> 
              ))}                                          
            </animated.div>
      )
    case 1:
      return (
        <div className="container">
          <div style={{marginTop:"20px"}}>
            <div className="Title">
            <h3>ข้อมูลร้านค้า</h3>
            <hr />
          </div>
          {data.map((datas,index)=>(
            <div key={index}>
              <TextField disabled value={datas.store_name} id="ชื่อร้าน" label="ชื่อร้าน" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
              <div style={{marginLeft:'10px'}}>
                <div className="radio1">
                  <FormLabel component="legend">ประเภทร้านค้า</FormLabel>
                  <RadioGroup disabled className="select" value={datas.type} aria-label="gender" name="gender1" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
                    <FormControlLabel disabled value="ร้านข้าวแกง" control={<Radio />} label="ร้านข้าวแกง" />
                    <FormControlLabel disabled value="ร้านอาหารตามสั่ง" control={<Radio />} label="ร้านอาหารตามสั่ง" />
                    <FormControlLabel disabled value="ร้านก๋วยเตี๋ยว" control={<Radio />} label="ร้านก๋วยเตี๋ยว" />
                    <FormControlLabel disabled value="ร้านอาหารจานเดียวที่ไม่ใช่ตามสั่ง" control={<Radio />} label="ร้านอาหารอีสาน" />
                    <FormControlLabel disabled value="ร้านอาหารอีสาน" control={<Radio />}   label="ร้านอาหารจานเดียวที่ไม่ใช่ตามสั่ง"/>
                    <FormControlLabel disabled value="ร้านเครื่องดื่ม" control={<Radio />} label="ร้านเครื่องดื่ม/ผลไม้/เบเกอรี่" />
                    <FormControlLabel disabled value="ร้านอาหารว่าง" control={<Radio />} label="ร้านอาหารว่าง" />
                    <FormControlLabel disabled value="ร้านกาแฟ" control={<Radio />} label="ร้านกาแฟ" />
                  </RadioGroup>
                  <hr></hr>
                  <FormLabel component="legend"></FormLabel>
                  <RadioGroup aria-label="gender" name="type1" value={datas.type1}  style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr '}}>
                    <FormControlLabel disabled value="มุสลิม" control={<Radio />} label="มุสลิม" />
                    <FormControlLabel disabled value="พุทธ" control={<Radio />} label="พุทธ" />
                  </RadioGroup> 
                </div>
                <div className="radio1">
                  <hr></hr>                
                  <FormLabel component="legend">โรงอาหาร</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={datas.locations} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr '}}>
                    <FormControlLabel disabled value="ลานอิฐคูหา" control={<Radio />} label="ลานอิฐคูหา" />
                    <FormControlLabel disabled value="ลานอิฐแผงลอย" control={<Radio />} label="ลานอิฐแผงลอย" />
                    <FormControlLabel disabled value="ลานอิฐพื้นที่พิเศษ" control={<Radio />} label="ลานอิฐพื้นที่พิเศษ" />
                    <FormControlLabel disabled value="ลานประดู่คูหา" control={<Radio />} label="ลานประดู่คูหา" />
                    <FormControlLabel disabled value="ลานประดู่พื้นที่พิเศษ" control={<Radio />} label="ลานประดู่พื้นที่พิเศษ" />
                    <FormControlLabel disabled value="ลานเลคูหา" control={<Radio />} label="ลานเลคูหา" />
                    <FormControlLabel disabled value="ลานเลพื้นที่พิเศษ" control={<Radio />} label="ลานเลพื้นที่พิเศษ" />
                    <FormControlLabel disabled value="หอพัก 9 คูหา" control={<Radio />} label="หอพัก 9 คูหา" />
                    <FormControlLabel disabled value="หอพัก 10 คูหา" control={<Radio />} label="หอพัก 10 คูหา" />
                    <FormControlLabel disabled value="อาคาร 19 คูหา" control={<Radio />} label="อาคาร 19 คูหา" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          ))}
          </div>
                 
        </div>
      );
    case 2:
      return (
        <div className="container" >
          <div className="form2" >
            <div className="Title2">
              <h3>รายการอาหาร/เคื่องดื่มที่นำเสนอ</h3>
              <hr />
            </div>
            <div style={{marginLeft:'10px'}}>                 
              <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                {menuList.map((inputfilds) => (                       
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
      ) ;
      case 3:
      return(
        <div className="container" >
          <div className="form2" >
            <div className="Title2">
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
            <div style={{marginLeft:'10px'}}>                 
              <div style={{width:'100%',display:'flex',flexDirection:'column'}}>                                                                                                 
                <div  style={{width:'100%',display:'flex',alignItems:"flex-start",flexDirection:'column'}}>
                  <h5 style={{fontWeight:'normal'}}>ตรวจสอบหลักฐาน</h5> 
                  <div style={{marginLeft:"10px"}}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={image} onChange={handleChange} name="image" />}
                        label="1.รูปถ่าย หน้าตรง ไม่สวมหมวก/แว่นตาดำ"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={copyIdcard} onChange={handleChange} name="copyIdcard" />}
                        label="2.สำเนาบัตรประชาชน"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={copyHome} onChange={handleChange} name="copyHome" />}
                        label="3.สำเนาทะเบียนบ้าน"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={MedicalCertificate} onChange={handleChange} name="MedicalCertificate" />}
                        label="4.ใบรับรองแพทย์จาก รพ. ระบุว่าไม่เป็นโรคติดต่อ โรคสังคมรังเกียจ หรือโรคที่แพร่เชื้อแกผู้บริโภคได้"
                      />
                        <FormControlLabel
                        control={<Checkbox checked={Certificate} onChange={handleChange} name="Certificate" />}
                        label="5.ใบรับรองอื่นๆ(ถ้ามี)"
                      />
                        <FormControlLabel
                        control={<Checkbox checked={Applicationfee} onChange={handleChange} name="Applicationfee" />}
                        label="6.ค่าสมัคสอบคัดเลือกเข้าเป็นผู้ประกอบการจำหน่ายอาหาร 100 บาท"
                      />          
                    </FormGroup>
                  </div>                                                                                                                                                                                                                                                                                         
                </div>               
                <div style={{width:'100%',marginLeft:'10px'}}>
                  <hr />
                    <div style={{display:'flex',justifyContent:'flex-start',width:'50%'}}>
                      <FormControlLabel
                      control={<Checkbox checked={error} onChange={()=>{checkAll()}} name="antoin" />}
                      label="Check All" />             
                    </div>
                  <hr />
                  <div style={{display:'flex',justifyContent:'flex-start',width:'50%'}}>
                    <FormControlLabel
                    control={<Checkbox color="primary" checked={!agree} onChange={()=>{setArgee(!agree)}} name="antoine" />}
                    label="ตรวจสอบเรียบร้อย"
                  />
                  </div> 
                </div>                                                                                                                                                                                                                                                                 
              </div>                                                          
            </div>
          </div>
        </div>
      )
    default:
      return 'Unknown step';
  }
}
  return transitions1(
  (styles, item) =>item && <animated.div className="containApp" style={styles}>
  <div className={classes.root}  style={{display:'flex',flexDirection:'column' ,justifyContent:'center'}}>
    <Stepper activeStep={activeStep} alternativeLabel style={{width:'100%',borderRadius:'30px',marginTop:'70px',height:'100px',backgroundColor:'transparent'}}>
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
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton} style={{position:'absolute',left:'320px',bottom:'30px'}}>Back</Button>
            <Button variant="contained" disabled={agree} color="primary" onClick={handleNext} style={{position:'absolute',right:'320px',bottom:'30px'}}>
              {activeStep === steps.length - 1 ? 'บันทึก' : 'ถัดไป'}
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
</animated.div>
  )
}
export default ApplicationDetial
