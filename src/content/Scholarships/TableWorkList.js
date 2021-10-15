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
    const [id, setId] = useState('')
    const [scholarships, setScholarships] = useState([])
    const location = useLocation();
    const [dateFilter,setDateFilter] = useState(false)
    const todayDate = new Date()

    const SelectByName =(e)=>{
        setId(e)
        axios.post("http://localhost:3001/getTableList",{
            ScholarshipsId:e
        }).then((res)=>{
            setData(res.data);
            }
        ).then(
            axios.post('http://localhost:3001/getFilterDate',{
                ScholarshipsId:e
            }).then((res)=>{
                console.log(res.data);
                const [{date_work}] = res.data
                const date = new Date(date_work)
                setDateFilter(todayDate.getTime() > date.getTime());
            })
        )
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    
    useEffect(()=>{
        axios.get("http://localhost:3001/getScholarshipsList",{
        }).then((res)=>{
            setScholarships(res.data);            
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
                        disabled={id == '' || !dateFilter}
                        onClick={() => handleClickOpen()}
                        >
                        เพิ่ม
                        </Button>
                </div>
                <div style={{display:'flex',position:'absolute',right:"75px",top:'30px',alignItems:'center'}}>
                    <div style={{marginLeft:'10px'}}>
                        <InputLabel style={{marginLeft:'10px'}} id="demo-simple-select-outlined-label" >เลือกทุน</InputLabel>
                        <Select value={id} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByName(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                            {scholarships.map((data,index)=>(
                                <MenuItem key={index} value={data.id}>{data.scholarship_name}</MenuItem>
                            ))}
                        </Select>
                    </div>                  
                </div>
                
                <div style={{marginTop:'20px'}}>
                    <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ของวันที่</StyledTableCell>
                                    <StyledTableCell align="center">วันที่เพิ่ม</StyledTableCell>
                                    <StyledTableCell align="center">เพิ่มโดย</StyledTableCell>                                
                                    <StyledTableCell align="center">รายละเอียด</StyledTableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((dataList,index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="left" width="100px">{dataList.date_work}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.date}</StyledTableCell>
                                        <StyledTableCell align="center" width="100px">{dataList.name} {dataList.lastname}</StyledTableCell>
                                        
                                        <StyledTableCell align="center" width="10px">
                                            <Button variant="contained" onClick={(e)=>handleClickOpen(dataList.id)} style={{fontWeight:'bold',width:'95px'}}>
                                                <div>ดู</div>
                                            </Button>
                                        </StyledTableCell>
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </div>
               {/*  <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                </Dialog> */}
                <Dialog fullScreen  open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                        <div className="containFormDialog" style={{marginTop:'50px'}}>
                            <TableWorkForm id={id} />
                        </div> 
                </Dialog> 
            </animated.div>) 
    )
}

export default TableWork
