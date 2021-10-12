import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import TableWorkForm from './TableWorkForm';

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
  });
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function TableWork() {

    const [data,setData] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const [id, setIid] = useState()
    const [name, setName] = useState('')
    const [storeOwnerName, SetstoreOwnerName] = useState([])
    const location = useLocation();

    const SelectByName =(e)=>{
        setName(e)
        axios.post("http://localhost:3001/geStoreDetialBynameList",{
            storeId:e
        }).then((res)=>{
            setData(res.data);             
            }
        )
    }

    const handleClickOpenCheck = (e) => {
        setIid(e)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleClickOpenForm = () => {
        setIid(name)
        setOpenForm(true);
      };
    
      const handleCloseForm = () => {
        setOpenForm(false);
        setIid('')
      };

    useEffect(()=>{
        axios.get("http://localhost:3001/getStoreOwnerList",{
        }).then((res)=>{
            SetstoreOwnerName(res.data);            
            }
        )
    },[])
    const transitions = useTransition(location.pathname == '/HomeScholarships/TableWork', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 250},
        leave:  { opacity: 0},
    
        })
      return transitions(
                ((styles, item) => item && <animated.div className="subcon" style={styles}>  
                <div className="header" style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                }}>
                    <h1>
                    รายการการตารางการทำงาน
                    </h1>
                    <Button
                        variant="outlined"
                        color="primary"
                        style={{
                            position: "absolute",
                            right: "150px",
                            bottom: "-5px",
                            borderRadius: "10px",
                            fontSize: "1rem",
                            fontWeight: "bold",
                        }}
                        
                        onClick={() => handleClickOpenForm()}
                        >
                        เพิ่ม
                        </Button>
                </div>
                <div style={{display:'flex',position:'absolute',right:"75px",top:'30px',alignItems:'center'}}>
                    <div style={{marginLeft:'10px'}}>
                        <InputLabel style={{marginLeft:'10px'}} id="demo-simple-select-outlined-label" >เลืแกทุน</InputLabel>
                        <Select value={name} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByName(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                            {storeOwnerName.map((data,index)=>(
                                <MenuItem key={data.id} value={data.id}>{data.store_name}</MenuItem>
                            ))}
                        </Select>
                    </div>                  
                </div>
                
                <div style={{marginTop:'20px'}}>
                    <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ครั้งที่</StyledTableCell>
                                    <StyledTableCell align="center">หัวข้อ</StyledTableCell>
                                    <StyledTableCell align="center">วันที่ร้องเรียน</StyledTableCell>
                                    <StyledTableCell align="center">ร้องเรียนโดย</StyledTableCell>
                                    <StyledTableCell align="center">สถานะ</StyledTableCell>  
                                    <StyledTableCell align="center">ตรวจสอบ</StyledTableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((dataList,index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="left" width="100px">{dataList.complaint_number}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.topic}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.date}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.ad_name}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.attendant_comment !== '' ? <div>ตรวจสอบแล้ว</div> : <div>ยังไม่ตรวจสอบแล้ว</div>}</StyledTableCell>
                                        <StyledTableCell align="center" width="10px">
                                            <Button variant="contained" onClick={(e)=>handleClickOpenCheck(dataList.id)} style={{fontWeight:'bold',width:'95px'}}>
                                                {dataList.attendant_comment !== '' ? <div>ดู</div> : <div>ตรวจสอบ</div>}
                                            </Button>
                                        </StyledTableCell>
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </div>
                <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>                          
                                    รายละเอียดข้อมูลแจ้งความผิด
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div style={{marginTop:'50px'}}>
                            
                        </div> 
                </Dialog>
                <Dialog fullScreen  open={openForm} onClose={handleCloseForm} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleCloseForm} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    เพิ่มละเอียดข้อมูลแจ้งความผิด
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="containFormDialog" style={{marginTop:'50px'}}>
                            <TableWorkForm />
                        </div> 
                </Dialog> 
            </animated.div>) 
    )
}

export default TableWork
