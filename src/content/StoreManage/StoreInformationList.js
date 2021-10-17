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
import StoreInfornationDetial from './storeInfornationDetial';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import swal from 'sweetalert';
import { useHistory, useLocation } from 'react-router';
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


function StoreInformation() {

    const [storeDataList,setStoreDataList] = useState([])
    var forYear = new Date();
    var ThisYears = forYear.getFullYear()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setIid] = useState()
    const history = useHistory()
    const [idRegis,setIdRegis] = useState();
    const location = useLocation();

    const deletestore = (id) => {
      swal("กด ok เพื่อยืนยันการบันทึก",{
      }).then((value) => {
        if (value) {
              axios.post('http://localhost:3001/deleteStore',{
                        storeId:id
              }).then((res)=>{
                if (res.data.err) {
                  swal('ไม่สามารถลบได้','โปรดตรวจสอบข้อมูลอีกครั้ง','warnning')
                } else {
                  swal('ลบเรียบร้อย','Ok','success')
                  history.push('/HomeStore/StoreInformation')
                  history.go() 
                }
              })
        }})
      
    }
    const handleClickOpen = (e) => {
        setIid(e)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=>{
        axios.post("http://localhost:3001/getStoreList",{
            ThisYears:ThisYears
        }).then((res)=>{
                setStoreDataList(res.data);             
            }
        )
    },[])
    const transitions = useTransition(location.pathname == '/HomeStore/StoreInformation', {
      from: { opacity: 0 },
      enter: { opacity: 1, delay: 150},
      leave:  { opacity: 0},

      })
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}>  
           <div className="header">
                <h1>
                ข้อมูลร้านค้า
                </h1>
            </div>
            <div style={{marginTop:'20px'}}>
            {storeDataList == '' ? 
            <div style={{position:'absolute',top:'50%',left:'40%'}}>
              <h1>
                ไม่พบข้อมูลร้านค้า
              </h1>
            </div> :
            <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">หมายเลขร้าน</StyledTableCell>
                        <StyledTableCell align="center" >ชื่อร้าน</StyledTableCell>
                        <StyledTableCell align="center">ชื่อเจ้าของร้าน</StyledTableCell>
                        <StyledTableCell align="center">สถาณะ</StyledTableCell>
                        <StyledTableCell align="center">รายละเอียดร้าน</StyledTableCell>  
                        <StyledTableCell align="center">ลบ</StyledTableCell>  
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {storeDataList.map((dataList) => (
                        <StyledTableRow key={dataList.id}>
                        <StyledTableCell  align="left" >{dataList.s_id}</StyledTableCell>
                        <StyledTableCell align="center" >{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" >{dataList.name}</StyledTableCell>
                        <StyledTableCell align="center" >{dataList.right_status == '' ? (<span>ยังไม่ยืนยัน</span>): (<span>ยืนยัน</span>)}</StyledTableCell>
                        <StyledTableCell align="center" ><Button variant="contained" onClick={(e)=>handleClickOpen(dataList.store_id)} style={{fontWeight:'bold'}}>ดู</Button></StyledTableCell>
                        <StyledTableCell align="center" ><Button variant="contained" onClick={(e)=>deletestore(dataList.store_id)} style={{fontWeight:'bold'}}>ลบ</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
              </TableContainer> }
                  
            </div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    รายละเอียดข้อมูลร้านค้า
                  </Typography>
                </Toolbar>
              </AppBar>
              <div  style={{marginTop:'50px',backgroundColor:'cyan',height:'1050px',position:'absolute'}}>
                <StoreInfornationDetial active={id} />
              </div> 
            </Dialog> 
      </animated.div>)
    )
}

export default StoreInformation
