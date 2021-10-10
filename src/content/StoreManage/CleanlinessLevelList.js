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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CleanlinessLevelForm from './CleanlinessLevelForm';
import { MenuItem } from '@material-ui/core';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useHistory, useLocation } from 'react-router';



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
    const location = useLocation();

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
            if (response.data.reduce((sum,data) => sum+data,0) !== 0) {
              const data = []
              response.data.forEach(element => {
              data.push(element.Year)   
              });
              setDataYears([...new Set(data)]);  
            } else {
              setDataYears([yeartoday])
            }    
          })
          )
      },[])

      const transitions = useTransition(location.pathname == '/HomeStore/CleanlinessLevel', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 150},
        leave:  { opacity: 0},

      })
      
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}>  
              <div className="header">
                  <h1>
                    สุขาภิบาล
                  </h1>
              </div>       
            <div style={{display:'flex',position:'absolute',right:"75px",top:'30px'}}>
              <div style={{marginLeft:'10px'}}>
                <InputLabel  id="demo-simple-select-outlined-label" >เดือน</InputLabel>
                <Select value={month} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByMonth(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                  <MenuItem disabled={monthToday < 1} value={1}>มกราคม</MenuItem>
                  <MenuItem disabled={monthToday < 2} value={2}>กุมภาพันธ์</MenuItem>
                  <MenuItem disabled={monthToday < 3} value={3}>มีนาคม</MenuItem>
                  <MenuItem disabled={monthToday < 4} value={4}>เมษายน</MenuItem>
                  <MenuItem disabled={monthToday < 5} value={5}>พฤษภาคม</MenuItem>
                  <MenuItem disabled={monthToday < 6} value={6}>มิถุนายน</MenuItem>
                  <MenuItem disabled={monthToday < 7} value={7}>กรกฎาคม</MenuItem>
                  <MenuItem disabled={monthToday < 8} value={8}>สิงหาคม</MenuItem>
                  <MenuItem disabled={monthToday < 9} value={9}>กันยายน</MenuItem>
                  <MenuItem disabled={monthToday < 10} value={10}>ตุลาคม</MenuItem>
                  <MenuItem disabled={monthToday < 11} value={11}>พฤศจิกายน</MenuItem>
                  <MenuItem disabled={monthToday < 12} value={12}>ธันวาคม</MenuItem>
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
              <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">ชื่อร้าน</StyledTableCell>
                      <StyledTableCell align="center">ตรวจสอบโดย</StyledTableCell>
                      <StyledTableCell align="center">สถานะ</StyledTableCell>
                      <StyledTableCell align="center">ผลการตรวจ</StyledTableCell>
                      <StyledTableCell align="center">ตรวจสอบ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataCleanlinessLevelList.map((dataList,index) => (
                      <StyledTableRow key={index}>                       
                        <StyledTableCell align="left" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.admin_id!==null ? (<BeenhereRoundedIcon style={{color:'green'}} />) : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.status!==null ? dataList.status  : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={(month > monthToday || yearToday  !== yeartodayForcheck)|| dataList.admin_id!==null } variant="contained" onClick={(e)=>handleClickOpen(dataList.s_id)} style={{fontWeight:'bold'}}>ตรวจสอบ</Button></StyledTableCell>
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
      </animated.div>) 
    )
}
export default CleanlinessLevel
