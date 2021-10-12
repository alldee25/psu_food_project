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
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));



function TableWorkForm(props) {

  const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
  const history = useHistory()
  const [date,setDate] = useState('')
  const [dateInput,setDateInput] = useState('')
  const [dateStart,setDateStart] = useState('')
  const [dateEnd,setDateEnd] = useState('')
  const {auth,setIsload,isload} = useContext(AuthContext)
  const [data, setData] = useState([]);
  const todayDate = moment(new Date()).format("YYYY-MM-DD")
  const [filterDtaWork,setFilterDateWork] = useState('')
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
 


  const transitions = useTransition(!isload, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0,delay:150 },
    leave:  { opacity: 0,y: 800},
  })

  const InsertData = (e) =>{
    
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
                    width:'420px',
                    height:'100px',
                    justifyContent:'space-between',
                    alignItems:'center'
                    }}
                >
                        
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
                <div >
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
            <div >
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
                                control={<Checkbox checked={data.id} onChange={()=> handleChange(data.id)} name="gilad" />}
                                label={<span>{data.store_name} : {data.location}</span>}
                            />
                        ))}
                        
                    </FormGroup>
                </FormControl>
            </div>         
            <Button type="submit" variant="contained" color="primary" style={{position:'absolute',right:'20px',bottom:'20px'}}>บันทึก</Button>
        </form>
         </div>              
        </div>
      </animated.div>
    )
}

export default TableWorkForm
