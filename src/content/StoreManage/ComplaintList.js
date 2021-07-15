import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import RemoveRedEyeRoundedIcon from '@material-ui/icons/RemoveRedEyeRounded';
import StoreInfornationDetial from './storeInfornationDetial';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaximizeRoundedIcon from '@material-ui/icons/MaximizeRounded';
import { AuthContext } from '../../App';
import ComplaintForm from './ComplaintForm';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

function ComplaintList() {

    const [complaintList,setComplaintList] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const [id, setIid] = useState()
    const [storeName, setStoreName] = useState('')
    const [storeOwnerName, SetstoreOwnerName] = useState([])

    const SelectByStoreName =(e)=>{
        setStoreName(e)
        axios.post("http://localhost:3001/geStoreDetialBynameList",{
            storeId:e
        }).then((res)=>{
            setComplaintList(res.data);             
            }
        )
    }

    const handleClickOpen = (e) => {
        setIid(e)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleClickOpenForm = (e) => {
        setIid(e)
        setOpenForm(true);
      };
    
      const handleCloseForm = () => {
        setOpenForm(false);
      };

    useEffect(()=>{
        axios.get("http://localhost:3001/getStoreOwnerList",{
        }).then((res)=>{
            SetstoreOwnerName(res.data);             
            }
        )
    },[])

    return (
        <div className="subcon">
          <div className="header">
            <h1>
            รายการการร้องเรียน
            </h1>
          </div>
            <div style={{display:'flex',position:'absolute',right:"75px",top:'30px',alignItems:'center'}}>
                <div style={{marginLeft:'10px'}}>
                    <InputLabel style={{marginLeft:'10px'}} id="demo-simple-select-outlined-label" >เลือกร้านค้า</InputLabel>
                    <Select value={storeName} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByStoreName(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                    {storeOwnerName.map((data,index)=>(
                        <MenuItem key={data.id} value={data.id}>{data.store_name}</MenuItem>
                    ))}
                    </Select>
                </div>
                <div style={{marginLeft:'10px',marginTop:'23px'}}>
                    <Button variant="contained" disabled={storeName===''} color='primary' style={{fontWeight:'bold',width:'90px',height:'40px'}} onClick={(e)=>{handleClickOpenForm(storeName)}}>เพิ่ม</Button>
                </div>                   
            </div>
            <div style={{marginTop:'20px'}}>
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ครั้งที่</StyledTableCell>
                                <StyledTableCell align="left">หัวข้อ</StyledTableCell>
                                <StyledTableCell align="left">วันที่ตรวจ</StyledTableCell>
                                <StyledTableCell align="left">ร้องเรียนโดย</StyledTableCell>
                                <StyledTableCell align="center">หัวข้อ</StyledTableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {complaintList.map((dataList,index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left" width="100px">{dataList.complaint_number}</StyledTableCell>
                                    <StyledTableCell align="left" width="100px">{dataList.topic}</StyledTableCell>
                                    <StyledTableCell align="left" width="100px">{dataList.date}</StyledTableCell>
                                    <StyledTableCell align="left" width="100px">{dataList.ad_name}</StyledTableCell>
                                    <StyledTableCell align="center" width="10px"><Button variant="contained" onClick={(e)=>handleClickOpen(dataList.store_id)} style={{fontWeight:'bold'}}><RemoveRedEyeRoundedIcon/></Button></StyledTableCell>
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
                                เพิ่มละเอียดข้อมูลแจ้งความผิด
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div style={{marginTop:'50px'}}>
                        <ComplaintForm active={id} />
                    </div> 
            </Dialog>
            <Dialog fullScreen open={openForm} onClose={handleCloseForm} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleCloseForm} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                รายละเอียดข้อมูลแจ้งความผิด
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div style={{marginTop:'50px'}}>
                        <ComplaintForm open={openForm} active={id} />
                    </div> 
            </Dialog> 
        </div>
    )
}

export default ComplaintList