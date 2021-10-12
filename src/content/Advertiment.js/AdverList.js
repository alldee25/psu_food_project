import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import {useRouteMatch,useHistory,} from "react-router-dom";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';
import IconButton from '@material-ui/core/IconButton';
import {  useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#531061',
      color: '#FFFF',
      fontSize:"1.1rem"
    },
    body: {
      fontSize: 14,    
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,       
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    input: {
        display: 'none',
      },
  });
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function AdverList(props) {
    const dateImg = new Date()
    const [dataImageAdvi, setDataImageAdvi] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setIid] = useState()
    const {auth,setIsload} = useContext(AuthContext);
    const [checked, setChecked] = React.useState(true);
    const history = useHistory();
    const [dataList, setDataList] = useState([]);
    const { url, path } = useRouteMatch();
    const [regisStatus,setRegisStatus] = React.useState(null);
    const [imagePreview,setImagePreview] = useState(null)
    const [imageSelected,setImageSelected] = useState(null)
    const location = useLocation();

  
    const handleCloseDialog = () => {
      setOpen(false);
    };
    
   

    const handleClickOpen = (e) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleSave = () => {
        const formData = new FormData();
        formData.append("file", imageSelected)
        formData.append("AdminId", auth.usersData[0].id)
        formData.append("date", dateImg)
        axios.post('http://localhost:3001/UploadeImageAdvi',
            formData
        ).then(res =>{
            if (res.data.err) {
                swal('ผิดพลาด','You clicked the button!',"wrnning").then(
                    history.push("/HomeStore"),
                    history.go(),
                    setOpen(false)
                    )
            } else {
            swal('บันทึกเรียบร้อย','You clicked the button!',"success").then(
                setOpen(false),
                window.location.reload(false)
            ) 
            }
        })
    };

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
  

  const DeleteItem =(id,img)=>{

    swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    .then((willDelete) => {
            if (willDelete) {
                axios.post('http://localhost:3001/deleteImageAdvi',{
                id:id,
                oldFile:img
                }).then( res =>{
                swal(res, {
                icon: "success",
                })
                }).then(window.location.reload(false))
            } else {
                swal("Your imaginary file is safe!");
            }
            })
        }

    
    
    useEffect(()=>{
        axios.get("http://localhost:3001/getAdviList").then((res)=>{
          setDataImageAdvi(res.data)   
        })
    },[])
    const transitions = useTransition(location.pathname == '/Advertiment', {
      from: { opacity: 0 },
      enter: { opacity: 1, delay: 150},
      leave:  { opacity: 0},
  
      })
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}> 
               <div className="header" className="header" style={{display:"flex",alignItems:"center",position:"relative" }}>
                   <h1>รายการโฆษณา</h1>
                   <Button onClick={handleClickOpen} style={{position:'absolute',right:'10px',bottom:"0px",width:"130px",borderRadius:"10px",fontSize: "1rem",
                        fontWeight: "bold",
                        color:"white"}} variant="contained" color="primary" >
                        เพิ่มโฆษณา
                </Button>
                </div>
            
                
           
            <div style={{marginTop:'20px'}}>
              <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableHead >
                        <TableRow>
                          <StyledTableCell>รูป</StyledTableCell>
                          <StyledTableCell align="center">เพิ่มโดย</StyledTableCell>                                              
                          <StyledTableCell align="center">ลบ</StyledTableCell>                                                        
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataImageAdvi.map((dataList) => (
                          <StyledTableRow key={dataList.id}>
                            <StyledTableCell  align="left" width="100px"><div><img width="auto" height={90}  width={160} src={`http://localhost:3001/adminUploaded/${dataList.img}`} /></div></StyledTableCell>
                            <StyledTableCell align="center" width="100px">{dataList.name} {dataList.lastname}</StyledTableCell>
                            <StyledTableCell align="center" width="10px"><Button variant="contained" onClick={()=>DeleteItem(dataList.id,dataList.img)} style={{fontWeight:'bold'}}>ลบ</Button></StyledTableCell>                           
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
              </TableContainer>
            </div>
            <Dialog
                    open={open} 
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle 
                        id="alert-dialog-title">
                        {"รูปภาพโฆษณาประชาสัมพัน"}
                    </DialogTitle>
                    <div>
                        <DialogContent style={{width:'500px',height:'600px'}}>
                            <div id="alert-dialog-description" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
                                <div  style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderStyle:'solid',
                                        height:'200px',
                                        width:'100%'
                                }}>
                                        <img 

                                            width="auto" 
                                            height="100%" 
                                            src={imagePreview} 
                                        />
                                </div> 
                                <input onChange={(e)=>{selectImage(e)}} name="file" accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <CameraEnhanceOutlinedIcon />
                                        <span>แก้ไขรูปภาพ</span>
                                    </IconButton>
                                </label>                                    
                            </div>
                        </DialogContent>
                    </div>
                  <DialogActions>
                    <Button onClick={handleSave} color="primary">
                      บันทึก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                      ยกเลิก
                    </Button>
                  </DialogActions>
                </Dialog>
            </animated.div>) 
        
    )
}