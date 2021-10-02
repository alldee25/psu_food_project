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
import { MenuItem, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

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

function RentalFeeList() {
    
    const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openSave, setOpenSave] = React.useState(false);
    const [id,setId] = useState()
    const [dateYears,setDataYears] = useState([])
    const [yearToday,setYeartoday] = useState('')
    const [month,setMonth] = useState('')
    const [status,setStatus] = useState('')
    const [datePay,setDatePay] = useState('')
    const [monthT,setMonthT] = useState('')
    const history = useHistory()
    const [monthToday,setMonthToday] = useState('')
    const [yeartodayForcheck,setYeartodayForcheck] = useState('')
    const [price,setPrice] = useState('')
    let date = new Date();
    const {auth} = useContext(AuthContext)

    const SelectByMonth =(e)=>{
        setDataCleanlinessLevelList([])
        setMonth(e)
        axios.post("http://localhost:3001/getRenListByYearAndMonth",{
          month:e,
          yearToday:yearToday
        }).then((res)=>{
          setDataCleanlinessLevelList(res.data)
        })
      }
      const SelectByYear =(e)=>{
        setDataCleanlinessLevelList([])
        setYeartoday(e)
        axios.post("http://localhost:3001/getRenListByYearAndMonth",{
          yearToday:e,
          month:month
        }).then((res)=>{
          setDataCleanlinessLevelList(res.data)
        })
      }
      const save =()=>{
        if (price !== '') {
          axios.post('http://localhost:3001/insertRen',{
                sroreId:id,
                date:date,
                price:price,
                adminId:auth.usersData[0].id

          }).then((res)=>{
              if (res.data.err) {
                  console.log(res.data.err);
              } else {
                 setPrice(0)
                 setStatus('')
                 swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                   history.go('HomeStore/RentalFeeList')
                   setOpen(false) 
                 }) 
              }
              
          })
        } else {
          swal("ข้อมูลไม่ครบ","Click","wanning")
        }
          
      }
      const saveStatusRen =()=>{
        if (status !== '' && datePay !== '') {
          axios.post('http://localhost:3001/insertStatusRen',{
                sroreId:id,
                status:status,
                datePay:datePay,

          }).then((res)=>{
              if (res.data.err) {
                  console.log(res.data.err);
              } else {
                setStatus('')
                swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                  history.go('HomeStore/RentalFeeList')
                  setOpenSave(false) 
                })
              }
              
          })
        } else {
          swal("ข้อมูลไม่ครบ","Click","wanning")
        }
          
      }
      
  
      const handleClickOpen = (e) => {
          setId(e)
          setOpen(true);  
        };
        const handleClickOpensave = (e) => {
          setId(e)
          setOpenSave(true);  
        };
        const handleClose = () => {
          setOpen(false);
          setPrice(0)
        };
        const handleCloseSave = () => {
          setOpenSave(false);
          setStatus('')
          setDatePay('')
        };
  
        useEffect(()=>{      
            const today = new Date();
            const yeartoday = today.getFullYear() 
            const month = today.getMonth() +1
            setMonth(month)
            setMonthToday(month)
            setYeartoday(yeartoday)
            setYeartodayForcheck(yeartoday)
          axios.post("http://localhost:3001/getRenListByYearAndMonth",{
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
                รายการการชำระค่าเช่า
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
              <TableContainer component={Paper} >
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
                        <StyledTableCell align="center" width="10px">{dataList.status!==null ? dataList.status  : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={ dataList.admin_id !==null } variant="contained" onClick={(e)=>handleClickOpen(dataList.s_id)} style={{fontWeight:'bold'}}>เพิ่ม</Button></StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={ dataList.status !== '' } variant="contained" onClick={(e)=>handleClickOpensave(dataList.s_id)} style={{fontWeight:'bold'}}>บันทึก</Button></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
                <Dialog
                    open={openSave}
                    onClose={handleCloseSave}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"สถานะการชำระค่าเช่า"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <Select value={status} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{setStatus(e.target.value)}} style={{width:'150px',height:"40px",outline:'none',backgroundColor:'transparent'}}>
                              <MenuItem value='ค้างชำระ'>ค้างชำระ</MenuItem>
                              <MenuItem value='ชำระแล้ว'>ชำระแล้ว</MenuItem>                         
                          </Select>
                          <div style={{marginTop:'20px'}}>
                          <TextField 
                            fullWidth 
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal" 
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }} 
                            type="date" 
                            label='วันที่ชำระ' 
                            onChange={(e)=>{setDatePay(e.target.value)}} 
                            value={datePay} />
                          </div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseSave} color="primary">
                          ปิด
                      </Button>
                      <Button onClick={saveStatusRen} color="primary" autoFocus>
                          บันทึก
                      </Button>
                    </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"เพิ่มรายการชำระ"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <TextField fullWidth variant="standard" type="number" onChange={(e)=>{setPrice(e.target.value)}} value={price}></TextField>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                          ปิด
                      </Button>
                      <Button onClick={save} color="primary" autoFocus>
                          บันทึก
                      </Button>
                    </DialogActions>
                </Dialog>
              </div>  
            </div>
    )
}

export default RentalFeeList
