import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import LeaveForm from './LeaveForm';
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

function LeaveList() {

    const {auth,setIsload} = useContext(AuthContext)
    const [storeLeaveDataList,setLeaveStoreDataList] = useState([])
    var forYear = new Date();
    var ThisYears = forYear.getFullYear()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setIid] = useState()
    const location = useLocation();

    const handleClickOpen = (e) => {
        setIid(e)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(()=>{
        axios.post("http://localhost:3001/getStoreListLeave",{
            ThisYears:ThisYears
        }).then((res)=>{
                setLeaveStoreDataList(res.data);             
            }
        )
    },[])

    const transitions = useTransition(location.pathname == '/HomeStore/LeaveList', {
      from: { opacity: 0 },
      enter: { opacity: 1, delay: 150},
      leave:  { opacity: 0},

      })
    return transitions(
          ((styles, item) => item && <animated.div className="subcon" style={styles}>  
           <div className="header">
                <h1>
                ข้อมูลการลา
                </h1>
            </div>
            <div>
                <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>หมายเลขร้าน</StyledTableCell>
                        <StyledTableCell align="center">ชื่อร้าน</StyledTableCell>
                        <StyledTableCell align="center">ชื่อเจ้าของร้าน</StyledTableCell>
                        <StyledTableCell align="center">สถาณะ</StyledTableCell>  
                        <StyledTableCell align="center">ตรวจสอบ</StyledTableCell>  
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {storeLeaveDataList.map((dataList,index) => (
                        <StyledTableRow key={index}>
                        <StyledTableCell  align="left" width="100px">{dataList.store_id}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.store_name}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.name}</StyledTableCell>
                        <StyledTableCell align="center" width="100px">{dataList.status}</StyledTableCell>
                        <StyledTableCell align="center" width="10px"><Button variant="contained" disabled={(auth.usersData[0].id == dataList.admin_id) || (auth.usersData[0].id == dataList.admin_id1)} onClick={(e)=>handleClickOpen(dataList.leaveStoreId)} style={{fontWeight:'bold'}}>ตรวจสอบ</Button></StyledTableCell>
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
              รายละเอียดการลา
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{marginTop:'50px'}}>
          <LeaveForm active={id} open={open} />
          </div> 
        </Dialog> 
      </animated.div>)
    )
}

export default LeaveList
