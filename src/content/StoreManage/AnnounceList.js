import React, { useState,useEffect } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import axios from "axios";
import swal from 'sweetalert';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {BrowserRouter as Router,Link,Route,useParams,useRouteMatch,useHistory,} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditAttributesRoundedIcon from '@material-ui/icons/EditAttributesRounded';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import AnnouncementForm from "./AnnouncementForm";


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

export default function DataListAnnounce() {
    const history = useHistory();
    const [dataList, setDataList] = useState([]);
    const { url, path } = useRouteMatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  useEffect(() => {
   axios.get("http://localhost:3001/get").then( res => {
        const dataList = res.data;
        setDataList(dataList)
      })
  },[]);

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

    
    return (
        <div className="subcon">
             <div className="header" style={{height:'90px',display:"flex",alignItems:"center",position:"relative" }}><h1>ข้อมูลการเปิดรับสมัค</h1>            
                  <Button onClick={handleClickOpen} style={{position:'absolute',right:'10px',bottom:"10px",width:"100px",borderRadius:"10px",fontSize: "1rem",
                    fontWeight: "bold",
                    color:"white"}} variant="contained" color="primary" >
                      เพิ่ม
                  </Button>
              
              </div>
            {dataList == '' ? 
            <div style={{position:'absolute',top:'50%',right:'40%'}}>
              <h1>ไม่พบข้อมูล</h1>
            </div> : <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                      <StyledTableCell align="right">id</StyledTableCell>
                      <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                      <StyledTableCell align="right">แก้ไข</StyledTableCell>
                      <StyledTableCell align="right">ลบ</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataList.map((dataList) => (
                      <StyledTableRow key={dataList.Title}>
                        <StyledTableCell component="th" scope="row">
                          {dataList.Content}
                        </StyledTableCell>
                        <StyledTableCell align="right">{dataList.id}</StyledTableCell>
                        <StyledTableCell align="right">{dataList.Title}</StyledTableCell>
                        <StyledTableCell align="right"><Button variant="outlined" color="primary" href={`${url}/ApplicationAnnouncement`}>< EditAttributesRoundedIcon style={{fontSize:'2rem',color:''}} /></Button></StyledTableCell>
                        <StyledTableCell align="right"><Button variant="outlined" color="primary" onClick={()=>{DeleteItem(dataList.id)}}><DeleteForeverRoundedIcon style={{fontSize:'2rem',color:'red'}} /></Button></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>}
              <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    เพิ่มข้อมูลประกาศรับสมัครร้านค้า
                  </Typography>
                </Toolbar>
              </AppBar>
              <div style={{marginTop:'50px'}}>
                <AnnouncementForm open={open}/>
              </div> 
            </Dialog> 
    </div>
    )
}


