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
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import BeenhereRoundedIcon from '@material-ui/icons/BeenhereRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import CleanlinessLevelForm from './CleanlinessLevelForm';
import { MenuItem, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useLocation } from 'react-router';
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import RentalFeeInfo from './RentalFeeInfo';

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

function RentalFeeList() {
    
    const [dataCleanlinessLevelList,setDataCleanlinessLevelList] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [openSave, setOpenSave] = React.useState(false);
    const [id,setId] = useState()
    const [dateYears,setDataYears] = useState([])
    const [yearToday,setYeartoday] = useState('')
    const [status,setStatus] = useState('')
    const [datePay,setDatePay] = useState('')
    const [today,setToday] = useState('')
    const history = useHistory()
    const [monthToday,setMonthToday] = useState('')
    const [price,setPrice] = useState('')
    const {auth} = useContext(AuthContext)
    const location = useLocation();
    const [month,setMonth] = useState('')

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
                date:today,
                price:price,
                adminId:auth.usersData[0].id

          }).then((res)=>{
              if (res.data.err) {
                  console.log(res.data.err);
              } else {
                 setPrice(0)
                 setStatus('')
                 swal("?????????????????????????????????????????????","Click","success").then((value)=>{
                   history.go('HomeStore/RentalFeeList')
                   setOpen(false) 
                 }) 
              }
              
          })
        } else {
          swal("????????????????????????????????????","Click","wanning")
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
                swal("?????????????????????????????????????????????","Click","success").then((value)=>{
                  history.go('HomeStore/RentalFeeList')
                  setOpenSave(false) 
                })
              }
              
          })
        } else {
          swal("????????????????????????????????????","Click","wanning")
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
        const handleClickOpenInfo = (e) => {
          setId(e)
          setOpenInfo(true);  
        };
        const handleCloseInfo = () => {
          setOpenInfo(false);
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
          setMonthToday(month)
          setMonth(month)
          setYeartoday(yeartoday)
          const date = today.getDate() 
          if(month < 10 && date > 9){
            const forday = `${yeartoday}-0${month}-${date}`
            
            setToday(forday) 
          }
          else if(date < 10 && month > 9){
            const forday = `${yeartoday}-${month}-0${date}`
            
            setToday(forday)     
          }
          else if(date < 10 && month < 10){
            const forday = `${yeartoday}-0${month}-0${date}`          
            setToday(forday)      
          }else{ 
          const forday = `${yeartoday}-${month}-${date}`
          setToday(forday) 
          }      
          axios.post("http://localhost:3001/getRenListByYearAndMonth",{
            yearToday:yeartoday,
            month:month
          }).then((res)=>{
            setDataCleanlinessLevelList(res.data)
          }).then(
            axios.get("http://localhost:3001/getYearsOfRen").then((response)=>{
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

        const transitions = useTransition(location.pathname == '/HomeStore/RentalFeeList', {
          from: { opacity: 0 },
          enter: { opacity: 1, delay: 150},
          leave:  { opacity: 0},
    
          })
        return transitions(
              ((styles, item) => item && <animated.div className="subcon" style={styles}>  
                <div className="header">
                    <h1>
                    ????????????????????????????????????????????????????????????
                    </h1>
                </div>       
            <div style={{display:'flex',position:'absolute',right:"75px",top:'30px'}}>
              <div style={{marginLeft:'10px'}}>
                <InputLabel  id="demo-simple-select-outlined-label" >???????????????</InputLabel>
                <Select value={month} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByMonth(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
                  <MenuItem disabled={monthToday < 1} value={1}>??????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 2} value={2}>??????????????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 3} value={3}>??????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 4} value={4}>??????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 5} value={5}>?????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 6} value={6}>????????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 7} value={7}>?????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 8} value={8}>?????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 9} value={9}>?????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 10} value={10}>??????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 11} value={11}>???????????????????????????</MenuItem>
                  <MenuItem disabled={monthToday < 12} value={12}>?????????????????????</MenuItem>
              </Select> 
            </div>
          <div style={{marginLeft:'10px'}}>
            <InputLabel style={{marginLeft:'10px'}} id="demo-simple-select-outlined-label" >??????</InputLabel>
            <Select value={yearToday}  labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{SelectByYear(e.target.value)}} style={{width:'100px',height:"40px",outline:'none',background:'transparent'}}>
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
                      <StyledTableCell align="left">????????????????????????</StyledTableCell>
                      <StyledTableCell align="center">??????????????????????????????</StyledTableCell>
                      <StyledTableCell align="center">???????????????</StyledTableCell>
                      <StyledTableCell align="center">???????????????????????????</StyledTableCell>
                      <StyledTableCell align="center">?????????????????????</StyledTableCell>                   
                      <StyledTableCell align="center">??????????????????????????????</StyledTableCell>                   
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataCleanlinessLevelList.map((dataList,index) => (
                      <StyledTableRow key={index}>                       
                        <StyledTableCell align="left" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="center" width="10px">{dataList.status!==null ? dataList.status  : (<RemoveRoundedIcon />) }</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={ dataList.admin_id !==null } variant="contained" onClick={(e)=>handleClickOpen(dataList.s_id)} style={{fontWeight:'bold'}}>???????????????</Button></StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={ dataList.status !== '' } variant="contained" onClick={(e)=>handleClickOpensave(dataList.s_id)} style={{fontWeight:'bold'}}>??????????????????</Button></StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button disabled={ dataList.status == '' } variant="contained" onClick={(e)=>handleClickOpenInfo(dataList.id)} style={{fontWeight:'bold'}}>??????</Button></StyledTableCell>
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
                    <DialogTitle id="alert-dialog-title">{"?????????????????????????????????????????????????????????"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <Select value={status} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Age" variant="outlined" onChange={(e)=>{setStatus(e.target.value)}} style={{width:'150px',height:"40px",outline:'none',backgroundColor:'transparent'}}>
                              <MenuItem value='????????????????????????'>????????????????????????</MenuItem>
                              <MenuItem value='????????????????????????'>????????????????????????</MenuItem>                         
                          </Select>
                          <div style={{marginTop:'20px'}}>
                          <TextField 
                            fullWidth 
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{ max: (today)}}
                            margin="normal" 
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }} 
                            type="date" 
                            label='??????????????????????????????' 
                            onChange={(e)=>{setDatePay(e.target.value)}} 
                            value={datePay} />
                          </div> 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseSave} color="primary">
                          ?????????
                      </Button>
                      <Button onClick={saveStatusRen} color="primary" autoFocus>
                          ??????????????????
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
                    <DialogTitle id="alert-dialog-title">{"?????????????????????????????????????????????"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <TextField fullWidth variant="standard" type="number" onChange={(e)=>{setPrice(e.target.value)}} value={price}></TextField>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                          ?????????
                      </Button>
                      <Button onClick={save} color="primary" autoFocus>
                          ??????????????????
                      </Button>
                    </DialogActions>
                </Dialog>
              </div>  
              <div>
                <Dialog
                    open={openInfo}
                    onClose={handleCloseInfo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"????????????????????????????????????????????????????????????????????????"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{width:'200px',height:'400px'}} id="alert-dialog-description">
                            <RentalFeeInfo id={id} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseInfo} color="primary">
                          ?????????
                      </Button>                     
                    </DialogActions>
                </Dialog>
              </div>  
              
            </animated.div>)
    )
}

export default RentalFeeList
