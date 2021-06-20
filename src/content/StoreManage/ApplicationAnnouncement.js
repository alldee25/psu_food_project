import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import "./StoreRegis.css";
import axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%",

    },
  },
}));

export default function ApplicationAnnouncement(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const history = useHistory();

  const insertData = (e) =>{
    e.preventDefault()
    axios.post("http://192.168.1.101:3001/insert",{
      title:title,
      content:content
    }).then(
      setTitle(''),
      setContent(''),
      swal("Good job!", "You clicked the button!", "success").then(history.push("/HomeStore")
)
    )
  }


  const classes = useStyles();
  return (
    <div className="subcon">
        <div className="header" style={{height:'90px'}}><h1>เปิดประกาศรับสมัคร้านค้า</h1></div>
      <form className={classes.root} method="POST" noValidate autoComplete="off" onSubmit={insertData}>
        <div>
          <TextField
          onChange={(e)=> setTitle(e.target.value)}
            color="primary"
            id="outlined-search"
            label="หัวข้อ"
            variant="outlined"
            required
          />
          <TextField
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
        </div>
        <Button variant="contained" style={{marginLeft:'10px'}} type="submit">Submit</Button>
      </form>
    </div>
  );
}
