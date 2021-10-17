import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useLocation } from 'react-router';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaximizeRoundedIcon from '@material-ui/icons/MaximizeRounded';
import { AuthContext } from '../../App';
import InterViewForm from './interViewForm';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import InterViewDetial from './interViewFormDetial';
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
  });
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function InterView() {
    const [dataApplicationList, setDataApplicationList] = useState([])
    const [date,setDate] = useState('')
    const classes = useStyles();
    const [dataYears, setDataYears] = useState([])
    const [year, setYear] = useState('')
    const [open, setOpen] = React.useState(false);
    const [openDetil, setOpenDetial] = React.useState(false);
    const [id, setIid] = useState()
    const [idLocation, setIdLocation] = useState()
    const {auth,setIsload} = useContext(AuthContext);
    const location = useLocation();

    const handleClickOpen = (id,id_location) => {
      setIdLocation(id_location);
        setIid(id)
        setOpen(true);
      };
    const handleClickOpenDetial =(e)=>{
      setIid(e)
      setOpenDetial(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDetial = () => {
        setOpenDetial(false);
    };

      var forYear = new Date();
      var ThisYears = forYear.getFullYear()
      useEffect(()=>{
        setYear(ThisYears)
          axios.post("http://localhost:3001/getStoreInterViewList",{
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

      const selectInterviewListByYear =(e)=>{
          setYear(e.target.value)
          axios.post("http://localhost:3001/getStoreInterViewList",{
              date:e.target.value
          }).then((res)=>{
          
              setDataApplicationList(res.data)
          })
      }
      const transitions = useTransition(location.pathname == '/HomeStore/InterView', {
        from: { opacity: 0 },
        enter: { opacity: 1, delay: 150},
        leave:  { opacity: 0},

      })
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}>  
              
            <div className="header">
                <h1>
                ข้อมูลการสัมภาษณ์
                </h1>
            </div>       
            <div style={{position:'absolute',right:"5%",top:'30px'}}>
              <InputLabel  id="demo-simple-select-outlined-label" >ปี</InputLabel>
              <Select onChange={selectInterviewListByYear} value={year} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                {dataYears.map((years,index)=>( 
                  <MenuItem key={index} value={years}>{years}</MenuItem > 
                ))}
              </Select>
            </div>
            <div style={{marginTop:'20px'}}>
              <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ชื่อ-นามสกุล</StyledTableCell>
                      <StyledTableCell align="left">หมายเลขบัตรประชาชน</StyledTableCell>
                      <StyledTableCell align="left">ชื่อร้าน</StyledTableCell>
                      <StyledTableCell align="center">ผู้ตรวจสอบ</StyledTableCell>
                      <StyledTableCell align="left">สถานะ</StyledTableCell>
                      <StyledTableCell align="left">ตรวจสอบ</StyledTableCell>
                      <StyledTableCell align="left">รายละเอียด</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataApplicationList.map((dataList) => (
                      <StyledTableRow key={dataList.id}>
                        <StyledTableCell  align="left" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="left" width="100px">{dataList.idcard}</StyledTableCell>
                        <StyledTableCell align="left" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.admin_name}{dataList.adminName===null && <MaximizeRoundedIcon/> }</StyledTableCell>
                        <StyledTableCell align="left" width="10px">{dataList.admin_id!==null ? (<BeenhereRoundedIcon style={{color:'green'}} />) : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="left" width="10px"><Button disabled={dataList.admin_id!==null} variant="contained" onClick={()=>handleClickOpen(dataList.id,dataList.id_locations)} style={{fontWeight:'bold'}}>ลงคะแนน</Button></StyledTableCell>
                        <StyledTableCell align="left" width="10px"><Button disabled={dataList.admin_id==null} variant="contained" onClick={(e)=>handleClickOpenDetial(dataList.id)} style={{fontWeight:'bold'}}>ดู</Button></StyledTableCell>
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
              <div style={{marginTop:'50px',backgroundColor:'cyan'}}>
                <InterViewForm active={id} id_locations={idLocation} open={open}/>
              </div> 
            </Dialog>
            <Dialog fullScreen open={openDetil} onClose={handleCloseDetial} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleCloseDetial} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    รายละเอียด
                  </Typography>
                </Toolbar>
              </AppBar>
              <div style={{marginTop:'50px',backgroundColor:'cyan'}}>
                <InterViewDetial active={id} open={openDetil}/>
              </div> 
            </Dialog>
        </animated.div>)
    )
}
