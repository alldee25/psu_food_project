import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function RentalFeeInfo(props) {
    const [dataList,setDataList] = useState([])
    const classes = useStyles();
    
    useEffect(() => {
        axios.post(`http://localhost:3001/getRenInfo`,{
            RenId:props.id
        }).then((res) => {
            setDataList(res.data)
        })
        
    }, [])
    return (
        <div>
            {dataList.map((data,index) => (
                <div key={index} style={{display:'flex',flexDirection:'column'}}>
                    <TextField style={{marginTop:'10px'}} disabled id={index} label="จำนวนเงิน" defaultValue={data.price} variant="outlined" />
                    <TextField style={{marginTop:'10px'}} disabled id={index} label="วันที่บันทึก" defaultValue={data.date} variant="outlined" />  
                </div>             
            ))}
        </div>
    )
}
