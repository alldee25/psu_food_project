import React, { useState,useEffect } from "react";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import axios from "axios";
import swal from 'sweetalert';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {BrowserRouter as Router,Route,useParams,useRouteMatch,useHistory,} from "react-router-dom";
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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
      borderRadius: 15,
      minWidth: 700,
    },
  });
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
export default function DataListAnnounce() {
  const [checked, setChecked] = React.useState(true);
    const history = useHistory();
    const [dataList, setDataList] = useState([]);
    const { url, path } = useRouteMatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [regisStatus,setRegisStatus] = React.useState(null);
    const [displayStatus,setDisplayStatus] = React.useState(null);
    const [openDialog, setOpenDilog] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = React.useState('');
  const [id, setId] = React.useState('');

    const handleClickOpenDialog = () => {
      setOpenDilog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDilog(false);
    };
    
    const handleChangeRegisStatus = () => {
      
      setRegisStatus(!regisStatus)
    };

    const handleClickOpen = (e) => {
      setOpen(true);
    };
    const handleClickOpenEdit = (id,title,content,type) => {
      setEdit(true)
      setOpen(true);
      setTitle(title)
      setContent(content)
      setType(type)
      setId(id)
    };
  
    const handleClose = () => {
      setEdit(false)
      setOpen(false);
      setTitle('')
      setContent('')
      setType('')
      setId('')
    };
    const handleSave = () => {
      axios.post('http://localhost:3001/UpdateStatusRegis',{
        regisStatus:regisStatus
      }).then(res =>{
        if (res.data.err) {
        } else {
          swal('บันทึกเรียบร้อย','You clicked the button!',"success").then(
          history.push("/HomeStore"),
          history.go(),
          setOpenDilog(false)
          ) 
        }
      })
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

    useEffect(() => {
   axios.get("http://localhost:3001/get").then( res => {
        const dataList = res.data;
        setDataList(dataList)
      }).then(
        axios.get("http://localhost:3001/getRegisStatus",{
        }).then( res => {
        const [{status}] = res.data; 
        if (status==1) {
          setRegisStatus(true)
          setDisplayStatus('เปิด')
        } else {
          setRegisStatus(false)
          setDisplayStatus('ปิด')
        }       
        
      })
      )
  },[]);

    return (
        <div className="subcon">
             <div className="header" style={{display:"flex",alignItems:"center",position:"relative" }}>
                <h1>
                 ข้อมูลการเปิดรับสมัค
                </h1>
                <h3 style={{marginLeft:'20px'}}>
                 สถาณะเปิดรับสมัคร : {displayStatus}
                </h3> 
                <Button variant="outlined" color="primary" style={{position:'absolute',right:'150px',bottom:"10px",borderRadius:"10px",fontSize: "1rem",
                    fontWeight: "bold"}} onClick={handleClickOpenDialog}>
                เปลี่ยนสถานะการสมัคร
                </Button>
                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"ต้องการเปลี่ยนสถานะการสมัคร ?"}</DialogTitle>
                  <div>
                  <DialogContent>
                    <div id="alert-dialog-description" >
                      <div  style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <span style={{marginBottom:'10px'}}>
                          ปิดการสมัคร
                        </span>
                        <span>
                          <FormControlLabel
                          style={{width:'90px',display:'flex',justifyContent:'center',marginLeft:'5px'}}
                          control={<IOSSwitch checked={regisStatus} onChange={() =>handleChangeRegisStatus()}  value={regisStatus} />}
                        />
                        </span>                  
                        <span style={{marginBottom:'10px'}}>
                          เปิดการสมัคร
                        </span> 
                      </div>                  
                       สามารถเปลี่ยนสถานะการสมัครโดยการคลิกทีุ่ป๋ม                    
                    </div>
                  </DialogContent>
                  </div>
                  <DialogActions>
                    <Button onClick={handleSave} color="primary">
                      บันทึก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                      ยกเลิก
                    </Button>
                  </DialogActions>
                </Dialog>     
                  <Button onClick={handleClickOpen} style={{position:'absolute',right:'10px',bottom:"10px",width:"130px",borderRadius:"10px",fontSize: "1rem",
                    fontWeight: "bold",
                    color:"white"}} variant="contained" color="primary" >
                      เพิ่มประกาศ
                  </Button>
              </div>
            {dataList == '' ? 
            <div style={{position:'absolute',top:'50%',right:'40%'}}>
              <h1>ไม่พบข้อมูล</h1>
            </div> 
            : 
            <div style={{marginTop:'20px'}}>
              <TableContainer  style={{backgroundColor:'#EAF1F4',borderRadius:'15px'}} >
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>หัวข้อ</StyledTableCell>
                      <StyledTableCell align="right">id</StyledTableCell>
                      <StyledTableCell align="right">รายละเอียด</StyledTableCell>
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
                        <StyledTableCell align="right"><Button variant="outlined" color="primary" onClick={()=>{handleClickOpenEdit(dataList.id,dataList.Title,dataList.Content,dataList.type)}}>< EditAttributesRoundedIcon style={{fontSize:'2rem',color:''}} /></Button></StyledTableCell>
                        <StyledTableCell align="right"><Button variant="outlined" color="primary" onClick={()=>{DeleteItem(dataList.id)}}><DeleteForeverRoundedIcon style={{fontSize:'2rem',color:'red'}} /></Button></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            }
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
                <AnnouncementForm edit={edit} id={id} title={title} content={content} type={type}  open={open}/>
              </div> 
            </Dialog> 
    </div>
    )
}


