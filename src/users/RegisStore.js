import React, { useContext, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import {Link,useHistory,useLocation,useRouteMatch} from 'react-router-dom'
import { useTransition,animated } from 'react-spring'
import { AuthContext } from '../App';
import {userSchema} from './Validation'
import psuLogo from './../img/Prince_of_Songkla_University_Emblem.png'
//---------------------------------------------------------------Steper-----------------------------------------
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Addicon from '@material-ui/icons/AddRounded'
import Removeicon from '@material-ui/icons/RemoveRounded'

import { Checkbox, InputLabel, MenuItem, Select } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import swal from 'sweetalert';

 //-------------------------------------------------------------------------------------------------------------- 

//---------------------------------------------------------------FORM-------------------------------------------
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1.5),
        width: '25ch',
      },
    },
  }));
 //-------------------------------------------------------------------------------------------------------------- 
export default function RegisStore() {
  

  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation()
  const {url} = useRouteMatch();
  const history = useHistory()
  const { setIsload} = useContext(AuthContext);
  const classes = useStyles();
//---------------------------------------------------------------------
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [nationality, setNationality] = useState('');
  const [religion, setReligion] = useState('');
  const [idcard, setIDcard] = useState('');
  const [idstart, setIDstart] = useState('');
  const [idend, setIDend] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('ร้านข้าวแกง');
  const [type1, setType1] = useState('มุสลิม');
  const [locations, setLocation1] = useState('ลานอิฐคูหา');
  const [typeId, setTypeId] = useState('1');
  const [type1Id, setType1Id] = useState('1');
  const [locationsId, setLocation1Id] = useState('1');
  const [promosion, setPromosion] = useState('');
  const [typeList,setTypeList] = useState([])
  const [type1List,setType1List] = useState([]);
  const [locationList,setLocationList] = useState([]);
  const [inputfild, setInpufiled] = useState([
    {id: uuidv4(),menu: '',price: ''}
  ]);
  const [agree,setArgee] = useState(false);
  const [morYear,setMorYear] = useState('')
  const [morToday,setMorToday] = useState('')
  const [inId, setInId] = useState([])
//---------------------------------------------------------------------

  const calculate_age = (dob) => {
      setDOB(dob);
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

  useEffect(()=>{
    const today = new Date();
    const year = today.getFullYear() - 20
    const yeartoday = today.getFullYear() 
    const month = today.getMonth() +1
    const date = today.getDate() 
    if(month < 10 && date > 9){
      const forThan = `${year}-0${month}-${date}`
      const forday = `${yeartoday}-0${month}-${date}`
      setMorYear(forThan)
      setMorToday(forday) 
    }
    else if(date < 10 && month > 9){
      const forThan = `${year}-${month}-0${date}`
      const forday = `${yeartoday}-${month}-0${date}`
      setMorYear(forThan)     
    }
    else if(date < 10 && month < 10){
      const forThan = `${year}-0${month}-0${date}`
      const forday = `${yeartoday}-0${month}-0${date}`
      setMorYear(forThan)
      setMorToday(forday)      
    }else{
     const forThan = `${year}-${month}-${date}` 
     const forday = `${yeartoday}-${month}-${date}`
     setMorYear(forThan)
     setMorToday(forday) 
    } 
       const yearThis = today.getFullYear()
    axios.post("http://localhost:3001/getIdCard",{
      year:yearThis
    }).then(res =>{    
      setInId(res.data) 
    }).then(
      axios.get('http://localhost:3001/getType').then((res)=>{
      setTypeList(res.data)
    })
    ).then(
      axios.get('http://localhost:3001/getType1').then((res)=>{
      setType1List(res.data)
      })
      ).then(
        axios.get('http://localhost:3001/getLocation').then((res)=>{
          setLocationList(res.data)
         })  
      ) 
  },[])

  const selectType = (event) => {
    setTypeId(event.target.name);
    setType(event.target.value);
    };

  const selectType1 = (event) => {
    setType1Id(event.target.name);
    setType1(event.target.value);
    };

  const selectLocation = (event) => {
    setLocation1(event.target.value);
    setLocation1Id(event.target.name);
    
    };
   
  const handleRemoveFields = id => {
      const values  = [...inputfild];
      values.splice(values.findIndex(value => value.id === id), 1);
      setInpufiled(values);
    }
  const steps = getSteps();
  const handleChangeInput = (id, e) => {
    const newInputFieles = inputfild.map(inputfild => {
      if(id === inputfild.id){
        inputfild[e.target.name] = e.target.value
      }
      return inputfild;
    })
    setInpufiled(newInputFieles);
  }
  let formData = {
        name:name,
        storeName:storeName,
        dob:dob,
        race:race,
        nationality:nationality,
        religion:religion,
        idcard:idcard,
        idstart:idstart,
        idend:idend,
        adress:adress,
        phone:phone,
        email:email,
        type:type,
        type1:type1,
        locations:locations,
        promosion:promosion,
        inputfild:inputfild[0].menu
      }

  const checkId =(inId)=>{
    return inId.idcard !== Number(idcard);
  }

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) { 
    } 
    if (activeStep === 1) {
      setArgee(true)
    }
    if(activeStep === 2){
      const isValid = await userSchema.isValid(formData)
     if (isValid) {
        if (inId.every(checkId)) {
              setIsload(true);
              axios.post('http://localhost:3001/insertRegisStore',{
                name:name,
                storeName:storeName,
                dob:dob,
                race:race,
                nationality:nationality,
                religion:religion,
                idcard:idcard,
                idstart:idstart,
                idend:idend,
                adress:adress,
                phone:phone,
                email:email,
                type:typeId,
                type1:type1Id,
                locations:locationsId,
                promosion:promosion,
                inputfild:inputfild,
                date:morToday,
          }).then((res)=>{
            if (res.data.message) {
              swal(res.data.message).then((value) => {
                setIsload(false)
              });
            }
            else{
              swal({
              title: "สมัคเรียบร้อย",
              text: "กดปุ่มเพื่อไปต่อ",
              icon: "success",
              button: "OK",
            }).then((value) =>{
              history.push('/')
              history.go() 
              })  
            }
    })
        }else{
        swal("รหัสบัตรประชนซ้ำ!")
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }   
     } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setArgee(true)
      swal ({title: "ข้อมูลไม่ครบถ้วน",
            text: "โปรดตรวจสอบข้อมูลให้อีกครั้ง...",
              icon: "warning",})
     }
  }
};

  const handleBack = () => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
          setArgee(false)
        };

    const handleReset = () => {
          setActiveStep(0);
        };   


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
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
  } 
function getStepContent(step) {
    switch (step) {
      case 0:
        return transitions(
              (styles, item) => item && <animated.div  className="container" style={styles}> 
                <div className="head">
                <img width="auto" height="120" src={psuLogo}/> 
                <p> &nbsp;&nbsp;ใบสมัคเข้าเป็นผู้ประกอบการร้านค้าจำหน่ายอาหาร<br />
                โรงอาหารมหาวิยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
                </p>                
                </div>                
                <div className="form">
                  <div className="Title">
                    <h3>ข้อมูลผู้สมัค</h3>
                    <hr />
                </div>
                <div style={{marginLeft:'10px'}}>
                <TextField onChange={(e) => setName(e.target.value)} required value={name} id="ชื่อ-นามสกุล" label="ชื่อ-นามสกุล" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                <TextField onChange={(e) => calculate_age(e.target.value)} required value={dob} id="เดือน-วัน-ปี เกิด" label="เดือน-วัน-ปี เกิด" type="date" inputProps={{ max: (morYear)}} style={{width:'30%'}} InputLabelProps={{ shrink: true, }} variant="outlined" />
                <TextField onChange={(e) => setAge(e.target.value)} value={age} id="อายุ" label="อายุ" type="text" style={{width:'30%'}} disabled={true} InputLabelProps={{ readOnly:true, shrink: true, }} variant="outlined" /> 
                <TextField onChange={(e) => setRace(e.target.value)} required value={race} id="เชื้อชาติ" label="เชื้อชาติ" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true}} variant="outlined" />
                <TextField onChange={(e) => setNationality(e.target.value)} required value={nationality} id="สัญชาติ" label="สัญชาติ" type="text"  style={{width:'30%'}}InputLabelProps={{shrink: true}} variant="outlined" />
                <TextField onChange={(e) => setReligion(e.target.value)} required value={religion} id="ศาสนา" label="ศาสนา" type="text" style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField onChange={(e) => setIDcard(e.target.value)} required value={idcard} id="หมายเลขบัตรประชาชน" label="หมายเลขบัตรประชาชน" type="number" style={{width:'30%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField onChange={(e) => setIDstart(e.target.value)} required value={idstart} id="วันที่ออกบัตร" label="วันที่ออกบัตร" type="date" inputProps={{ max: (morToday)}} style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField onChange={(e) => setIDend(e.target.value)} required value={idend} id="บัตรหมดอายุ" label="บัตรหมดอายุ" type="date" inputProps={{ min: (morToday)}} style={{width:'30%'}} InputLabelProps={{ shrink: true}} variant="outlined" />
                <TextField onChange={(e) => setAdress(e.target.value)} required value={adress} id="ที่อยู่ที่สามารถติดต่อได้" label="ที่อยู่ที่สามารถติดต่อได้" type="text" multiline rows={4} style={{width:'95%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField onChange={(e) => setPhone(e.target.value)} required value={phone} id="โทรศัท์" label="โทรศัท์" type="text" style={{width:'45.9%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField onChange={(e) => setEmail(e.target.value)} required value={email} id="email" label="Email" type="email" style={{width:'45.9%'}} InputLabelProps={{ shrink: true }} variant="outlined" />
                <h1></h1>
                  </div>
                  
                        <div className="Title">
                            <h3>ข้อมูลร้านค้า</h3>
                            <hr />
                        </div>
                        <TextField onChange={(e) => setStoreName(e.target.value)} required value={storeName} id="ชื่อร้าน" label="ชื่อร้าน" type="text" style={{width:'30%'}} InputLabelProps={{shrink: true,}} variant="outlined" />                            
                  <div style={{marginLeft:'10px'}}>
                <div className="radio1">
                <FormLabel component="legend">ประเภทร้านค้า</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={type} onChange={selectType} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
                   {typeList.map((data,index)=>(
                     <FormControlLabel key={data.id} value={data.store_type} name={String(data.id)} control={<Radio />} label={data.store_type} />
                   )  
                   )}
                </RadioGroup>
                <hr></hr>
                <FormLabel component="legend"></FormLabel>
                <RadioGroup aria-label="gender" name="gender1"  value={type1} onChange={selectType1} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr '}}>
                {type1List.map((data,index)=>(
                     <FormControlLabel key={data.id} value={data.religion} name={String(data.id)} control={<Radio />} label={data.religion} />
                   )  
                   )} 
                </RadioGroup> 
                </div>
                <div className="radio1">
                    <hr></hr>
                <FormLabel component="legend">โรงอาหาร</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={locations} onChange={selectLocation} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr '}}>
                {locationList.map((data,index)=>(
                     <FormControlLabel key={data.id} value={data.location} name={String(data.id)} control={<Radio />} label={data.location} />
                   )  
                   )} 
                </RadioGroup>
                </div>
                </div>       
                </div>                                  
                </animated.div>
        
        )
      case 1:
        return (
          <div className="container" >
            <div className="form2" >
              <div className="Title2">
                <h3>รายการอาหาร/เคื่องดื่มที่นำเสนอ</h3>
                <hr />
              </div>
              <div style={{marginLeft:'10px'}}>                 
                <div style={{width:'100%',borderStyle:"solid",borderColor:"yellow",display:'flex',flexDirection:'column'}}>                                                    
                  { inputfild.map((inputfilds) => (                       
                    <div key={inputfilds.id} style={{width:'100%',borderStyle:"solid",}}>
                      <TextField name="menu" onChange={e => handleChangeInput(inputfilds.id,e)} type="text" variant="outlined" value={inputfilds.menu} label="เมนู"  id="menu"  InputLabelProps={{shrink: true,}}  style={{width:'50%'}} />                                                                                                                                     
                      <TextField name="price" onChange={e => handleChangeInput(inputfilds.id,e)} type="number"variant="outlined" value={inputfilds.price} label="ราคา" id="price" InputLabelProps={{shrink: true,}}  style={{width:'30%'}}  />
                      <Button disabled={inputfild.length === 1} onClick={() => handleRemoveFields(inputfilds.id)} style={{marginTop:'20px'}}><Removeicon /></Button>
                                                                                                 
                    </div>                                                                                                                                                                                                   
                  ))}
                </div>
                    <div style={{display:'flex',justifyContent:'center',position:"relative"}}>
                      <Button style={{position:'absolute',right:'50%',color:'#288700'}} onClick={()=>{setInpufiled([...inputfild,{id: uuidv4(),textField:''}])}} >
                        <Addicon style={{fontSize:"2rem"}} />
                      </Button>
                    </div>
                    <hr/>                                             
              </div>
            </div>
        </div>
        
        );
      case 2:
        return (
          <div className="container" >
            <div className="form2" >
              <div className="Title2">
                <h3>รายการโปรโมชั่นต่าง ๆ ที่นำเสนอ</h3>
                  <hr />
              </div>

              <div style={{marginLeft:'10px'}}>                 
                <div style={{width:'100%',borderStyle:"solid",borderColor:"yellow",display:'flex',flexDirection:'column'}}>                                                                                      
                  <div  style={{width:'100%',borderStyle:"solid",display:'flex',justifyContent:'center'}}>
                    <TextField onChange={(e)=>{setPromosion(e.target.value)}} multiline rows={5}  type="text" variant="outlined" id="promosion"  InputLabelProps={{shrink: true,}}  style={{width:'100%'}} />                                                                                                                                                                                                  
                  </div>
                                                                                                                                                                                                                                    
                </div>
                  <hr/>                                             
              </div>
              <div className="Title2">
                <h3>สำหรับเจ้าหน้าที่</h3>              
              </div>
              <div style={{marginLeft:'10px'}}>                 
                <div style={{width:'100%',borderStyle:"solid",borderColor:"yellow",display:'flex',flexDirection:'column'}}>                                                                                                 
                  <div  style={{width:'100%',borderStyle:"solid",display:'flex',alignItems:"flex-start",flexDirection:'column'}}>
                    <h5 style={{fontWeight:'normal'}}>หลักฐานที่ต้องเตรียม</h5> 
                    <div style={{marginLeft:"10px"}}>
                      <p>1.รูปถ่าย หน้าตรง ไม่สวมหมวก/แว่นตาดำ</p>                  
                      <p>2.สำเนาบัตรประชาชน</p>
                      <p>3.สำเนาทะเบียนบ้าน</p>
                      <p>4.ใบรับรองแพทย์จาก รพ. ระบุว่าไม่เป็นโรคติดต่อ โรคสังคมรังเกียจ หรือโรคที่แพร่เชื้อแกผู้บริโภคได้</p>
                      <p>5.ใบรับรองอื่นๆ(ถ้ามี)</p>
                      <p>6.ค่าสมัคสอบคัดเลือกเข้าเป็นผู้ประกอบการจำหน่ายอาหาร 100 บาท</p>
                    </div>
                                                                                                                                                                                                                                                                                             
                  </div>
                  <hr/>                  
                    <p style={{textAlign:"justify"}}>
                    <Checkbox onChange={()=>{setArgee(!agree)}} style={{marginBottom:'3px'}} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                     ข้าพเจ้าขอรับรองว่า ข้อความที่กรอกในใบสมัคนี้เป็นความจริงและสมบูรณ์ครบถ้วน<br/>
                    ซึ่งเป็นส่วนหนึ่งของสัญญา หากมีการบิดเบือนความจริง แจ้งเท็จ หรือปิดบังข้อเท็จจริง จะเป็นสาเหตุอัน<br/>
                    เพียงพอที่ยกเลิกสัญญาประกอบการหากได้รับคัดเลือกเป็นผู้ประกอบการร้านค้าโรงอาหาร<br/>
                    มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
                    </p>                                                                                                                                                                                                                               
                </div>                                                          
              </div>
            </div>
          </div>
          
        ) ;
      default:
        return 'Unknown step';
    }
  }
    return transitions1(
  
    (styles, item) =>item && <animated.div className="contain" style={styles}>
      
    <div className={classes.root}  style={{display:'flex',flexDirection:'column' ,justifyContent:'center'}}>
      <Stepper activeStep={activeStep} alternativeLabel style={{width:'100%',borderRadius:'30px',marginTop:'50px',height:'100px',backgroundColor:'transparent'}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div >
            <div>{getStepContent(activeStep)}</div>
            <div style={{position:'relative',display:'flex',flexDirection:'row'}}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton} style={{position:'absolute',left:'320px',bottom:'30px'}}>Back</Button>
              <Button variant="contained" disabled={agree} color="primary" onClick={handleNext} style={{position:'absolute',right:'320px',bottom:'30px'}}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </animated.div>
    )
}

