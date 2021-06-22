
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
import {BrowserRouter as Router,Link,Route,useParams,useRouteMatch,useHistory,} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CleanlinessLevelForm from './CleanlinessLevelForm';



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

function CleanlinessLevel() {
    const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id,setId] = useState()


    const handleClickOpen = (e) => {
        setId(e)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      useEffect(()=>{
        axios.post("http://localhost:3001/getStoreList").then((res)=>{
          setDataCleanlinessLevelList(res.data)
        })
      },[])

    return (   
          <div className="subcon">
            <div className="header">
                <h1>
                รายการกสรตรวจสอบความสะอาดร้านค้า
                </h1>
            </div>       
            <div style={{position:'absolute',right:"5%",top:'30px'}}>
            <InputLabel  id="demo-simple-select-outlined-label" >ปี</InputLabel>
            <Select  labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
              
            </Select>
            </div>
            <div style={{marginTop:'20px'}}>
              <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ชื่อ-นามสกุล</StyledTableCell>
                      <StyledTableCell align="left">หมายเลขบัตรประชาชน</StyledTableCell>
                      <StyledTableCell align="left">ชื่อร้าน</StyledTableCell>
                      <StyledTableCell align="center">ตรวจสอบ</StyledTableCell>
                      <StyledTableCell align="center">สถานะ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataCleanlinessLevelList.map((dataList) => (
                      <StyledTableRow key={dataList.id}>
                        <StyledTableCell  align="left" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="left" width="100px">{dataList.idcard}</StyledTableCell>
                        <StyledTableCell align="left" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button variant="contained" onClick={(e)=>handleClickOpen(dataList.s_id)} style={{fontWeight:'bold'}}>ตรวจสอบ</Button></StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.admin_id!==null ? (<BeenhereRoundedIcon style={{color:'green'}} />) : (<RemoveRoundedIcon />) }</StyledTableCell>
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
              รายละเอียดการสมัค
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{marginTop:'50px'}}>
          <CleanlinessLevelForm active={id} open={open}/>
          </div> 
      </Dialog>  
    </div>
    )
}

export default CleanlinessLevel
