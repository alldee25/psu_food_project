import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import RemoveRedEyeRoundedIcon from '@material-ui/icons/RemoveRedEyeRounded';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { AuthContext } from '../../App';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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

function AdminWorkManage() {

    const [complaintList,setComplaintList] = useState([])
    const classes = useStyles();

    return (
        <div className="subcon">
            <div className='header' >
                <h1>
                    รายการข้อมูลรายการงานหน้าที่รับผิดชอบ
                </h1>
                <div style={{marginTop:'20px'}}>
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ครั้งที่</StyledTableCell>
                                <StyledTableCell align="center">แก้ไข</StyledTableCell>                                                      
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {complaintList.map((dataList,index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left" width="100px">{dataList.complaint_number}</StyledTableCell>                                  
                                    <StyledTableCell align="center" width="10px">
                                        <Button variant="contained" style={{fontWeight:'bold',width:'95px'}}>
                                            {dataList.attendant_comment !== '' ? <div>แก้ไข</div> : <div>ตรวจสอบ</div>}
                                        </Button>
                                    </StyledTableCell>                          
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>               
            </div>
        </div>
    )
}

export default AdminWorkManage
