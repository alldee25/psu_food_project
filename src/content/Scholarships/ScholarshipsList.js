import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
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
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import { MenuItem, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  useLocation } from 'react-router';
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

function ScholarshipsList() {

    const [date,setDate] = useState('')
    const [dataScholarList,setDataScholarList] = useState([])
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dateYears,setDataYears] = useState([])
    const [yearToday,setYeartoday] = useState('')
    const {auth} = useContext(AuthContext)
    const [type,setType] = useState('')
    const [name,setName] = useState('')
    const [dateEnd,setDateEnd] = useState('')
    const [studentNumber,setStudentNumber] = useState('')
    const location = useLocation();
    
    const SelectByYear =(e)=>{
      setDataScholarList([])
      setYeartoday(e)
      axios.post("http://localhost:3001/getScholarshipsByYear",{
        yearToday:e
      }).then((res)=>{
        setDataScholarList(res.data)
      })
    }

    const save =()=>{

        if (name !== '' && type !== '' && studentNumber !== ''!== '') {
          axios.post('http://localhost:3001/insertScholarship',{
                studentNumber:studentNumber,
                dateEnd:dateEnd,
                date:date,
                type:type,
                name:name,
                adminId:auth.usersData[0].id

          }).then((res)=>{
              if (res.data.err) {
                  console.log(res.data.err);
              } else {
                 setType('')
                 setName('')
                 setDateEnd('')
                 setStudentNumber('')
                 swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                    window.location.reload(false)
                   setOpen(false) 
                 }) 
              }
              
          })
        } else {
          swal("ข้อมูลไม่ครบ","Click","wanning")
        }
          
      }
      const handleClose = () => {
        setType('')
        setName('')
        setDateEnd('')
        setStudentNumber('')
        setOpen(false);
      };
      
    const handleClickOpenForm = (e) => {
        setOpen(true);
        
      };
      const DeleteItem =(id)=>{
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
        
          if (willDelete) {
            axios.post('http://localhost:3001/delete/',{
              id:id
            }).then( res =>{
              swal(res, {
              icon: "success",
            })
            }).then(window.location.reload(false))
          } else {
            swal("Your imaginary file is safe!");
          }
          })
      }

      useEffect(()=>{ 

        const today = new Date();
        const yeartoday = today.getFullYear() 
        const month = today.getMonth() +1
        setYeartoday(yeartoday)
        const date = today.getDate()
        if(month < 10 && date > 9){
          const forday = `${yeartoday}-0${month}-${date}`
          setDate(forday) 
        }
        else if(date < 10 && month > 9){
          const forday = `${yeartoday}-${month}-0${date}`
          setDate(forday)     
        }
        else if(date < 10 && month < 10){       
          const forday = `${yeartoday}-0${month}-0${date}`
          setDate(forday)      
        }else{
         const forday = `${yeartoday}-${month}-${date}`
         setDate(forday) 
        } 
       
      axios.post('http://localhost:3001/getSchohalarList',{
        yearToday:yearToday
      }).then((res)=>{
        setDataScholarList(res.data)
      }).then(
        axios.get("http://localhost:3001/getYearsOfSchohalar").then((response)=>{

          if (response.data.reduce((sum,data) => sum+data,0) !== 0) {
            const data = []
            response.data.forEach(element => {
            data.push(element.YEAR)   
            });
            setDataYears([...new Set(data)]);  
          } else {
            setDataYears([yeartoday])
          }    
        })
      )
        
    },[])

    const transitions = useTransition(location.pathname == '/HomeScholarships', {
      from: { opacity: 0 },
      enter: { opacity: 1, delay: 150},
      leave:  { opacity: 0},
  
      })
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}>
                <div className="header" style={{display:"flex",alignItems:"center",position:"relative" }} >
                    <h1>
                        รายการทุนการศึกษา
                    </h1>
                    <Button variant="outlined" color="primary" style={{position:'absolute',right:'150px',bottom:"-5px",borderRadius:"10px",fontSize: "1rem",
                     fontWeight: "bold"}} onClick={handleClickOpenForm}>
                        เพิ่มรายการทุน
                </Button>
                </div>       
                <div style={{display:'flex',position:'absolute',right:"75px",top:'30px'}}>
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
                        <StyledTableCell align="left">ชื่อทุน</StyledTableCell>
                        <StyledTableCell align="center">ประเภททุน</StyledTableCell>
                        <StyledTableCell align="center">เพิ่มวันที่</StyledTableCell>
                        <StyledTableCell align="center">สิ้นสุดวันที่</StyledTableCell>
                        <StyledTableCell align="center">ลบ</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataScholarList.map((dataList,index) => (
                        <StyledTableRow key={index}>                       
                            <StyledTableCell align="left" width="100px">{dataList.scholarship_name}</StyledTableCell>
                            <StyledTableCell align="center" width="100px">{dataList.type}</StyledTableCell>
                            <StyledTableCell align="center" width="100px">{dataList.date}</StyledTableCell>
                            <StyledTableCell align="center" width="100px">{dataList.date_end}</StyledTableCell>
                            <StyledTableCell align="center" width="100px"><Button variant="outlined" color="primary" onClick={()=>{DeleteItem(dataList.id)}}><DeleteForeverRoundedIcon style={{fontSize:'2rem',color:'red'}} /></Button></StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </div>
                <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"เพิ่มรายการชำระ"}</DialogTitle>
                    <DialogContent style={{width:'500px',height:'600px'}}>
                        <DialogContentText id="alert-dialog-description">
                          <TextField fullWidth variant="outlined" type="text" label='ชื่อทุน' onChange={(e)=>{setName(e.target.value)}} value={name}></TextField>
                          
                            <TextField 
                              style={{marginTop:'10px'}} 
                              fullWidth variant="outlined" 
                              label='สิ้นสุดวันที่' 
                              InputLabelProps={{
                                shrink: true,
                              }} 
                              inputProps={{ min: (date)}}
                              type="date" 
                              onChange={(e)=>{setDateEnd(e.target.value)}} 
                              value={dateEnd} />
                            <TextField style={{marginTop:'10px'}} fullWidth variant="outlined" label='จำนวนรับ' type="number" onChange={(e)=>{setStudentNumber(e.target.value)}} value={studentNumber}></TextField>
                            <div style={{marginTop:'10px'}}>
                              <InputLabel id="demo-simple-select-outlined-label" >ประเภททุน</InputLabel>
                              <Select value={type} labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="ประเภททุน" variant="outlined" onChange={(e)=>{setType(e.target.value)}} style={{width:'150px',height:"40px"}}>      
                                <MenuItem value='ทุนทั่วไป'>ทุนทั่วไป</MenuItem>
                                <MenuItem value='ทุนเก็บชั่วโมง'>ทุนเก็บชั่วโม</MenuItem>
                              </Select>
                            </div>
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
            </animated.div>) 
    )
}

export default ScholarshipsList
