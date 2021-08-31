
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
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
import { MenuItem } from '@material-ui/core';



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
    const [dateYears,setDataYears] = useState([])
    const [yearToday,setYeartoday] = useState('')
    const [month,setMonth] = useState('')
    const [monthT,setMonthT] = useState('')
    const [monthToday,setMonthToday] = useState('')
    const [yeartodayForcheck,setYeartodayForcheck] = useState('')

    const SelectByMonth =(e)=>{
      setDataCleanlinessLevelList([])
      setMonth(e)
      axios.post("http://localhost:3001/getCleanListByYearAndMonth",{
        month:e,
        yearToday:yearToday
      }).then((res)=>{
        setDataCleanlinessLevelList(res.data)
      })
    }

    const SelectByYear =(e)=>{
      setDataCleanlinessLevelList([])
      setYeartoday(e)
      axios.post("http://localhost:3001/getCleanListByYearAndMonth",{
        yearToday:e,
        month:month
      }).then((res)=>{
        setDataCleanlinessLevelList(res.data)
      })
    }

    const handleClickOpen = (e) => {
        setId(e)
        setOpen(true);
        if(month < 10){
          setMonthT('0'+month)         
        }
        else{
          setMonthT(month)
        }  
      };
      const handleClose = () => {
        setOpen(false);
      };

      useEffect(()=>{       
          const today = new Date();
          const yeartoday = today.getFullYear() 
          const month = today.getMonth() +1
          setMonth(month)
          setMonthToday(month)
          setYeartoday(yeartoday)
          setYeartodayForcheck(yeartoday)
        axios.post("http://localhost:3001/getCleanListByYearAndMonth",{
          yearToday:yeartoday,
          month:month
        }).then((res)=>{
          setDataCleanlinessLevelList(res.data)
        }).then(
          axios.get("http://localhost:3001/getYearsOfClean").then((response)=>{
              const data = []
              response.data.forEach(element => {
              data.push(element.Year)   
              });
              setDataYears([...new Set(data)]);     
          })
          )
      },[])
    return (   
          <div className="subcon">
            <div className="header">
                <h1>
                รายการตรวจสอบคุณภาพความสะอาดร้านค้า
                </h1>
            </div>       
            <div style={{display:'flex',position:'absolute',right:"75px",top:'30px'}}>
              <div style={{marginLeft:'10px'}}>
                <InputLabel  id="demo-simple-select-outlined-label" >เดือน</InputLabel>
                <Select value={month} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByMonth(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                  <MenuItem value={1}>มกราคม</MenuItem>
                  <MenuItem value={2}>กุมภาพันธ์</MenuItem>
                  <MenuItem value={3}>มีนาคม</MenuItem>
                  <MenuItem value={4}>เมษายน</MenuItem>
                  <MenuItem value={5}>พฤษภาคม</MenuItem>
                  <MenuItem value={6}>มิถุนายน</MenuItem>
                  <MenuItem value={7}>กรกฎาคม</MenuItem>
                  <MenuItem value={8}>สิงหาคม</MenuItem>
                  <MenuItem value={9}>กันยายน</MenuItem>
                  <MenuItem value={10}>ตุลาคม</MenuItem>
                  <MenuItem value={11}>พฤศจิกายน</MenuItem>
                  <MenuItem value={12}>ธันวาคม</MenuItem>
              </Select> 
            </div>
          <div style={{marginLeft:'10px'}}>
            <InputLabel style={{marginLeft:'10px'}} id="demo-simple-select-outlined-label" >ปี</InputLabel>
            <Select value={yearToday} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByYear(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
              {dateYears.map((year,index)=>(
                <MenuItem key={index} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </div>                   
            </div>
            <div style={{marginTop:'20px'}}>
              <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">ชื่อร้าน</StyledTableCell>
                      <StyledTableCell align="center">ตรวจสอบ</StyledTableCell>
                      <StyledTableCell align="center">ตรวจสอบโดย</StyledTableCell>
                      <StyledTableCell align="center">สถานะ</StyledTableCell>
                      <StyledTableCell align="center">ผลการตรวจ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataCleanlinessLevelList.map((dataList,index) => (
                      <StyledTableRow key={index}>                       
                        <StyledTableCell align="left" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={(month > monthToday || yearToday  !== yeartodayForcheck)|| dataList.admin_id!==null } variant="contained" onClick={(e)=>handleClickOpen(dataList.s_id)} style={{fontWeight:'bold'}}>ตรวจสอบ</Button></StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.admin_id!==null ? (<BeenhereRoundedIcon style={{color:'green'}} />) : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.status!==null ? dataList.status  : (<RemoveRoundedIcon />) }</StyledTableCell>
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
          <CleanlinessLevelForm active={id} forDate={yearToday+'-'+monthT+'-'+'01'} open={open}/>
          </div> 
      </Dialog>  
    </div>
    )
}

export default CleanlinessLevel
