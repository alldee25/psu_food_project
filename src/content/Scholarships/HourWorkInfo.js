import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AuthContext} from '../../App'
import { useContext } from 'react';
import { animated, useTransition } from 'react-spring';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

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
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,       
      },
    },
  }))(TableRow);

export default function HourWorkInfo(props) {
    const classes = useStyles();
    const {auth,setIsload,isload} = useContext(AuthContext)
    const [dataList,setDataList] = useState([])
    
    const transitions = useTransition(!isload, {
        from: { opacity: 0, y: 800 },
        enter: { opacity: 1, y: 0,delay:150 },
        leave:  { opacity: 0,y: 800},
      })
    useEffect(()=> {
        axios.post('http://localhost:3001/getQiuntityHour',{
            scId:props.id,
            userId:props.studentId,
            }).then((res) =>{
                setDataList(res.data) 
            })
            
    },[])

        return transitions(
            (styles, item) =>item && <animated.div style={styles}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div className="containFormTableWork">
                        <div className="headerFormClean">
                            <h4>รายละเอียดตารางชั่งโมงการทำงาน</h4>
                        </div>
                        <div style={{
                            display:'flex',
                            justifyContent:'flex-start',
                            flexDirection:'column',
                            height:'90%',
                            width:'90%',
                            }} 
                        >
                            <TableContainer style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ร้าน</StyledTableCell>
                                        <StyledTableCell align="left">วันที่</StyledTableCell>
                                        <StyledTableCell align="left">จำนวน</StyledTableCell>                                    
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {dataList.map((row,i) => (
                                        <StyledTableRow key={i}>
                                            <StyledTableCell align="left">{row.store_name}</StyledTableCell>
                                            <StyledTableCell align="left">{row.date_work}</StyledTableCell>
                                            <StyledTableCell align="left"  >{row.quantity}</StyledTableCell>                                               
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            <div
                              style={{
                                width:'100%',
                                display:'flex',
                                justifyContent:'flex-end',
                                marginTop:'20px',
                                fontWeight:'bold'
                              }}
                            >
                          รวม {dataList.reduce((sum,data) => sum+data.quantity,0)} ชั่วโมง
                        </div>  
                        </div>

                        
                    </div>              
                </div>
            </animated.div>
        
    )
}
