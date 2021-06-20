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

export default function DataListAnnounce() {
    const history = useHistory();
    const [dataList, setDataList] = useState([]);
    const { url, path } = useRouteMatch();
    const classes = useStyles();

  useEffect(() => {
   axios.get("http://192.168.1.101:3001/get").then( res => {
        const dataList = res.data;
        setDataList(dataList)
      })
  },[]);

  const DeleteItem =(id)=>{
    console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
    
      if (willDelete) {
        axios.post(`http://192.168.1.101:3001/delete/${id}`).then( res =>{
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
             <div className="header" style={{height:'90px',display:"flex",alignItems:"center",position:"relative" }}><h1>ข้อมูลการเปิดรับสมัค</h1><Link 
                                to={`${url}/ApplicationAnnouncement`}
                            
                              ><Button style={{position:'absolute',right:'10px',bottom:"10px",width:"100px",borderRadius:"10px",fontSize: "1rem",
                                  fontWeight: "bold",
                                  color:"white"}} variant="contained" color="primary" >
                                เพิ่ม
                              </Button></Link></div>
             <TableContainer component={Paper} >
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
    </TableContainer>
    </div>
    )
}


