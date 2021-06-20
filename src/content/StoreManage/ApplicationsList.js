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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ApplicationDetial from './ApplicationDetial'
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaximizeRoundedIcon from '@material-ui/icons/MaximizeRounded';
import { AuthContext } from '../../App';
import './ApplicationsList.css'

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

export default function CheckApplication(props) {
    const [dataApplicationList, setDataApplicationList] = useState([])
    const [date,setDate] = useState('')
    const classes = useStyles();
    const { url, path } = useRouteMatch();
    const [dataYears, setDataYears] = useState([])
    const [year, setYear] = useState('')
    const [open, setOpen] = React.useState(false);
    const [id, setIid] = useState()
    const {auth,setIsload} = useContext(AuthContext);
    

    const handleClickOpen = (e) => {
      console.log(typeof(e));
      setIid(e)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    var forYear = new Date();
    var ThisYears = forYear.getFullYear()
    
    useEffect(()=>{
        axios.post("http://localhost:3001/getStoreApplicationsList",{
            date:ThisYears
        }).then((res)=>{
          setDataApplicationList(res.data)   
        }).then(
            axios.get("http://localhost:3001/getYears").then((response)=>{
                const data = []
                response.data.forEach(element => {
                data.push(element.Year)   
                });
               setDataYears([...new Set(data)]);        
            })
            )
    },[])
    const selectApplicationListByYear =(e)=>{
        setYear(e.target.value)
        axios.post("http://localhost:3001/getStoreApplicationsList",{
            date:e.target.value
        }).then((res)=>{
            setDataApplicationList(res.data)
        })
    }
    return (
      
           <div className="subcon">
               <div className="header">
                   <h1>ตรวจสอบใบสมัคร</h1>
            </div>
            <div style={{position:'absolute',right:"5%",top:'30px'}}>
            <InputLabel  id="demo-simple-select-outlined-label" >ปี</InputLabel>
            <Select onChange={selectApplicationListByYear} value={year} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                {dataYears.map((years,index)=>( 
                <MenuItem key={index} value={years}>{years}</MenuItem > 
             ))}
            </Select>
            </div>
                <div style={{marginTop:'20px'}}>
<TableContainer component={Paper} >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ชื่อ-นามสกุล</StyledTableCell>
            <StyledTableCell align="left">หมายเลขบัตรประชาชน</StyledTableCell>
            <StyledTableCell align="left">สถานะ</StyledTableCell>
            <StyledTableCell align="left">ตรวจสอบ</StyledTableCell>
            <StyledTableCell align="center">ผู้ตรวจสอบ</StyledTableCell>
            <StyledTableCell align="left">แก้ไข</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataApplicationList.map((dataList) => (
            <StyledTableRow key={dataList.id}>
              <StyledTableCell  align="left" width="100px">{dataList.name}</StyledTableCell>
              <StyledTableCell align="left" width="100px">{dataList.idcard}</StyledTableCell>
              <StyledTableCell align="left" width="100px">{dataList.status}</StyledTableCell>
              <StyledTableCell align="left" width="10px"><Button disabled={dataList.adminName!==null} variant="contained" onClick={(e)=>handleClickOpen(dataList.id)} style={{fontWeight:'bold'}}>ตรวจสอบ</Button></StyledTableCell>
              <StyledTableCell align="center" width="100px">{dataList.adminName}{dataList.adminName===null && <MaximizeRoundedIcon/> }</StyledTableCell>
              <StyledTableCell align="left" width="10px"><Button disabled={dataList.adminName!==auth.usersData[0].name} variant="contained" style={{fontWeight:'bold'}}>แก้ไข</Button></StyledTableCell>
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
          <ApplicationDetial active={id}/>
          </div> 
      </Dialog>
    </div> 
        
    )
}
