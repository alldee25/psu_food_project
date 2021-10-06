import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import "./StoreRegis.css";
import axios from "axios";
import swal from 'sweetalert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory,useLocation } from "react-router";
import { animated, useTransition } from '@react-spring/web';


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%",

    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AnnouncementForm(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = React.useState('');
  const history = useHistory();
  const classes = useStyles();

  const insertData = (e) =>{
    e.preventDefault()
    swal("กด ok เพื่อยืนยันการบันทึก",{
    })
    .then((value) => {
      if (value) {
    axios.post("http://localhost:3001/insert",{
      title:title,
      content:content,
      Date:date,
      type:type
    }).then(
          setTitle(''),
          setContent(''),
          swal("Good job!", "You clicked the button!", "success").then(
            history.push("/HomeStore"),
            history.go()
          )
        )
      }
    })
  }
  const UpdateData = () =>{
    swal("กด ok เพื่อยืนยันการแก้ไข",{
    })
    .then((value) => {
      if (value) {
    axios.post("http://localhost:3001/updateAnnoun",{
      title:title,
      content:content,
      Date:date,
      type:type,
      id:props.id,
    }).then(
          setTitle(''),
          setContent(''),
          swal("Good job!", "You clicked the button!", "success").then(
            history.push("/HomeStore"),
            history.go()
          )
        )
      }
    })
  }
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const transitions = useTransition(props.open, {
    from: { opacity: 0, y: 800 },
    enter: { opacity: 1, y: 0 },
    leave:  { opacity: 0,y: 800}
  })
  useEffect(() => {
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
    if (props.edit) {
      setTitle(props.title)
      setContent(props.content)
      setType(props.type)}
  },[])

  
  return transitions(
    (styles, item) => item && <animated.div style={styles}> 
    <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{width:'1200px',backgroundColor:'cyan',height:'100vh',marginTop:'20px'}}>
        <div className="header" style={{height:'90px'}}><h1>เพิ่มประกาศ</h1></div>
        <form className={classes.root} method="POST" noValidate autoComplete="off" onSubmit={insertData}>
        <div>
          <TextField
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
              color="primary"
              id="outlined-search"
              label="หัวข้อ"
              variant="outlined"
              required
          />
          <TextField
              value={content}
              onChange={(e)=> setContent(e.target.value)}
              id="outlined-number"
              label="รายละเอียด"
              type="text"
              variant="outlined"
              fullWidth
              multiline
              rows={11}
              required
          />
          <FormControl variant="outlined"  className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ประเภท"
              value={type}
              onChange={handleChange}
            >
              <MenuItem value={'store'}>ร้านค้า</MenuItem>
              <MenuItem value={'general'}>ทั่วไป</MenuItem>
            </Select>
          </FormControl>
            
        </div>
        {props.edit ? (<Button variant="contained" style={{marginLeft:'10px'}} onClick={()=> UpdateData()} type="button">Edit</Button>) : <Button variant="contained" style={{marginLeft:'10px'}} type="submit">Add</Button>}
      </form>
      </div>
    </div>
    </animated.div>
  );
}
