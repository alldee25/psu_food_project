import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import swal from 'sweetalert';
import {AuthContext} from '../../App'
import { useHistory } from 'react-router';
import { animated, useTransition } from 'react-spring';
import moment from 'moment';
import './TableWorkForm.css'
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const rage = ['เช้า','บ่าย','ค่ำ']

function TableWorkForm(props) {

  const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
  const history = useHistory()
  const [dateInput,setDateInput] = useState('')
  const [dateStart,setDateStart] = useState('')
  const [dateEnd,setDateEnd] = useState('')
  const {auth,setIsload,isload} = useContext(AuthContext)
  const [data, setData] = useState([]);
  const todayDate = moment(new Date()).format("YYYY-MM-DD")
  const [filterDtaWork,setFilterDateWork] = useState('')
  const classes = useStyles();
  const [state, setState] = React.useState([]);

  const handleChange = (event) => {

      if (event.target.checked) {
        setState([...state,{sid: event.target.value,id:uuidv4()}])
      } else {
         const values  = [...state];
      values.splice(values.findIndex(value => value.sid === event.target.value), 1);
      setState(values);
      }
   

  };

  const transitions = useTransition(!isload, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0,delay:150 },
    leave:  { opacity: 0,y: 800},
  })

  const InsertData = (e) =>{

    if (dateInput !== '' && dateStart !== '' && dateEnd !== '' && state.length !== 0) {
      axios.post(`http://localhost:3001/insertDataTableWork`,{
      tableWorkId:uuidv4(),
      scholarshipId:props.id,
      dateInput:dateInput,
      dateStart:dateStart,
      dateEnd:dateEnd,
      date:todayDate,
      state:state,
      rage:rage,
      adminId:auth.usersData[0].id,
    }).then((res) => {
      if (res.data.err) {
        swal('ไม่สามารถเพิ่มข้อมูล','โปรดตรวจสอบข้อมูลอีกครั้ง...','warning')
        
      } else {
        swal(res.data,'ต่อไป...','success')
      }
    })
    } else {
      swal('ข้อมูลไม่ครบถ้วน','โปรดตรวจสอบข้อมูลอีกครั้ง...','warning')
    }
    
  }
  const inputDate =(e)=> {
      setDateInput(e)
      setDateStart('')
      
  }
  const inputDateStart =(e)=> {
    const date = moment(moment(e).add(2, 'd').format("YYYY-MM-DD"))
    setFilterDateWork(date._i)
      setDateStart(e)
      setDateEnd('')
  }
  useEffect(()=>{
    setIsload(true)
    axios.post("http://localhost:3001/getStoreAndStoreOwnerDetial",{
         id:props.active 
    }).then((res)=>{
    setDataCleanlinessLevelList(res.data)
  }).then(
    
        axios.post('http://localhost:3001/getStoreList').then(
            (res) => {
              
                setData(res.data)
            }
        )
    
  ).then(setIsload(false))
},[])
    return transitions(
      (styles, item) =>item && <animated.div style={styles}>
        <div style={{display:'flex',justifyContent:'center'}}>
         <div className="containFormTableWork">
          <div className="headerFormClean">
          <h4>แบบฟอร์มตารางทำงานเก็บชั่วโมง</h4>
          </div>
          
            <div style={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                height:'200px',
                width:'90%',
                }} 
                key={dataCleanlinessLevelList.id}
            >
            <div 
                style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'450px',
                    height:'100px',
                    justifyContent:'space-between',
                    alignItems:'center',
                    borderStyle:'solid',
                    padding:'10px',
                    borderWidth:0.5,
                    position:'relative',
                    borderRadius:'5px'
                }}
            >
                <div
                  style={{
                    position:'absolute',
                    top:-14,
                    backgroundColor:'#FFFF',
                    fontWeight:'bold',
                    width:'80px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                  }}
                >
                  <span>ลงทะเบียน</span>
                </div>
                  
                <div >
                    <TextField 
                        variant='outlined' 
                        type="date" 
                        value={dateInput} 
                        onChange={(e) => inputDate(e.target.value)} 
                        id="date" 
                        inputProps={{ min:(todayDate) }} 
                        label="ตั้งแต่วันที่" 
                        InputLabelProps={{ shrink: true, }}  
                    />
                </div>  
                <div 
                >
                    <TextField 
                    variant='outlined' 
                    disabled={dateInput == ''} 
                    type="date" 
                    value={dateStart} 
                    onChange={(e) => inputDateStart(e.target.value)} 
                    id="date" 
                    inputProps={{ min:(moment(moment(dateInput).add(1, 'd').format("YYYY-MM-DD"))._i) }} 
                    label="ถึงวันที่" 
                    InputLabelProps={{ shrink: true, }}  
                    
                />
                </div>  
            </div> 
            <div            
              style={{marginTop:'20px'}}         
            >
                <TextField 
                    variant='outlined' 
                    disabled={dateStart == ''} 
                    type="date" 
                    value={dateEnd} 
                    onChange={(e) => setDateEnd(e.target.value)} 
                    id="date" 
                    inputProps={{ min:(filterDtaWork) }} 
                    label="ทำงานวันที่" 
                    InputLabelProps={{ shrink: true, }}  
                    
                />
            </div>                    
          </div>
          <form onSubmit={InsertData}>
            <div className="tableWorwSelect">
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">เลือกร้านค้า</FormLabel>
                    <FormGroup>
                        {data.map((data,index) => (
                            <FormControlLabel key={index}
                                control={<Checkbox checked={state.sid} onChange={(e) => handleChange(e)} value={data.s_id} name={data.store_name} />}
                                label={<span>{data.store_name} : {data.location}</span>}
                            />
                        ))}
                        
                    </FormGroup>
                </FormControl>
            </div>         
            <Button onClick={InsertData} variant="contained" color="primary" style={{position:'absolute',right:'20px',bottom:'20px'}}>บันทึก</Button>
        </form>
         </div>              
        </div>
      </animated.div>
    )
}

export default TableWorkForm
