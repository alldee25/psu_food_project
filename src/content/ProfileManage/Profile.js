import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {AuthContext} from '../../App'
import S__2154499 from '../../img/avatarA.png'
import "./Profile.css";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';                         
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import axios from 'axios';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography  {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close"  >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


export default function Profile() {

  const {auth,userImg} = useContext(AuthContext)
  const [open, setOpen] = React.useState(false);
  const [imagePreview,setImagePreview] = useState(null)
  const [imageSelected,setImageSelected] = useState(null)
  const classes = useStyles()
  const history = useHistory()
 

    const selectImage = (e)=>{
         const render = new FileReader();
         render.onload =()=> {
           if(render.readyState == 2){
            setImagePreview(render.result)
           }
         } 
         setImageSelected(e.target.files[0])
         render.readAsDataURL(e.target.files[0]) 
    }


    const handleClickUpload =()=>{
      swal("กด ok เพื่อยืนยันการเปี่นยแปลง",{
      })
      .then((value) => {
        if (value) {
        const formData = new FormData();
        formData.append("file", imageSelected)
        formData.append("oldFile", userImg)
        formData.append("id", auth.usersData[0].id) 
        axios.post("http://localhost:3001/upload",formData 
    ).then((res)=>{
        console.log(res.data);
        }   
        ).then(
          setOpen(false),
          history.go(0) 
              )
     }})   
    }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(()=>{
    if (userImg == '') {
      
    }
    setImageSelected(null)
    setImagePreview(null)
  },[open])

  return (
    <div>
      <div className="frame">
       <div className="Profile">
        <div className="inProfile">       
          {userImg == '' ? <img width="120" height="120" src={S__2154499} /> : <img width="auto" height="120" src={`http://localhost:3001/adminUploaded/${userImg}`}/> }                             
        </div>
      </div >
      <div className="name">
          <button style={{margin:'0'}} onClick={handleClickOpen}><h4>{auth.usersData[0].name}&nbsp;{auth.usersData[0].lastname}</h4></button>
        </div>      
      </div>
      <Dialog  aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" style={{position:'relative'}} >
          Your Profile
          <Button style={{position:'absolute',right:"0px"}} onClick={handleClose}><CloseRoundedIcon /></Button>
        </DialogTitle>
        <DialogContent style={{display:"flex",alignItems:'center',width:'500px',height:'700px',flexDirection:'column'}}  dividers>
          <div className="ProfileReview">
              {imagePreview == null && userImg !== '' ? <img width="auto" height="120" src={`http://localhost:3001/adminUploaded/${userImg}`} /> : userImg == '' && imagePreview == null ? <img width="auto" height="120" src={S__2154499} /> : <img width="auto" height="120" src={imagePreview} />}
            </div>
          <div >         
            <div style={{display:"flex",alignItems:'center',flexDirection:'column'}}>
              
                <input onChange={(e)=>{selectImage(e)}} name="file" accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CameraEnhanceOutlinedIcon />
                        <span>แก้ไขรูปภาพ</span>
                    </IconButton>
                </label>
              </div>
            <div style={{width:"400px",marginTop:'10px',fontWeight:'bold'}}>
              <p><span>ชื่อ-สกุล : {auth.usersData[0].name} {auth.usersData[0].lastname}</span></p>
              <p><span>รหัสประจำตัวประชาชน : {auth.usersData[0].id_card}</span></p>
              <p><span>ตำแหน่งงาน : {auth.usersData[0].role}</span></p>
              <p><span>เบอร์ติดต่อ : {auth.usersData[0].phone}</span></p>
              <p><span>Email : {auth.usersData[0].email}</span></p>
            </div>
          </div> 
        </DialogContent>
        <DialogActions>
          <Button disabled={imageSelected == null} variant="contained" onClick={handleClickUpload} color="primary">
            บันทึกการเปลี่ยนแปลง
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
    
    
  );
}
