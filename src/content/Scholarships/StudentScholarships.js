import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import { AuthContext } from "../../App";
import { MenuItem, TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useLocation } from "react-router";
import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import "./StudentScholarships.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#531061",
    color: "#FFFF",
    fontSize: "1.1rem",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function StudentScholarships() {
  const [date, setDate] = useState("");
  const [dataScholarList, setDataScholarList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dateScholarships, setDateScholarships] = useState([]);
  const [yearToday, setYeartoday] = useState("");
  const { auth } = useContext(AuthContext);
  const [scholarshipId, setScholarshipId] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [studentId, setStudentId] = useState([]);
  const location = useLocation();
  const [suggestion, setSuggestion] = useState([]);

  const onChangHandler = (text) => {
    
    let matches = [];
    if (text.length > 0) {
      matches = studentList.filter((data) => {
        const regex = new RegExp(`${text}`, "gi");
        return String(data.id).match(regex);
      });
    }
    setSuggestion(matches);
    setStudentId(text);
  };
  const onSuggestHandler = (id) => {
    setStudentId(id);
    setSuggestion([]);
  };

  const SelectByScholar = (e) => {
    setScholarshipName(e.target.value);
    setScholarshipId(e.target.value);
    axios.post("http://localhost:3001/getStudentScholarship", {
        id: e.target.value,
      })
      .then((res) => {
        setDataScholarList(res.data);
        console.log(res.data);
      });
  };

  const save = () => {
    if (studentId !== '' && scholarshipId !== '') {
            axios.post('http://localhost:3001/insertStudenScholarships',{
              scholarshipId:scholarshipId,
              adminId:auth.usersData[0].id,
              studentId:studentId,
              date:date
            }).then((res)=>{
                if (res.data.err) {
                    console.log(res.data.err);
                } else {
                    setStudentId('')
                    setSuggestion([]);
                    setStudentList([])
                   swal("บันทึกเรียบร้อย","Click","success").then((value)=>{
                      window.location.reload(false)
                     setOpen(false) 
                   }) 
                } 
            })
          } else {
            swal("ข้อมูลไม่ครบ","Click","wanning")
          }
  };
  const handleClose = () => {
    setStudentId('')
    setOpen(false);
    setSuggestion([]);
    setStudentList([])
  };

  const handleClickOpenForm = (e) => {
    setOpen(true);
    axios.get("http://localhost:3001/getStudentList").then((response) => {
      setStudentList(response.data);
    });
  };

  const DeleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.post("http://localhost:3001/deleteStudentSch",{
            id:id,
          })
          .then((res) => {
            swal(res.data, {
              icon: "success",
            });
          })
          .then(window.location.reload(false));
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  useEffect(() => {
    let isMouted = true;
    const today = new Date();
    const yeartoday = today.getFullYear();
    const month = today.getMonth() + 1;
    setYeartoday(yeartoday);
    const date = today.getDate();
    if (month < 10 && date > 9) {
      const forday = `${yeartoday}-0${month}-${date}`;
      setDate(forday);
    } else if (date < 10 && month > 9) {
      const forday = `${yeartoday}-${month}-0${date}`;
      setDate(forday);
    } else if (date < 10 && month < 10) {
      const forday = `${yeartoday}-0${month}-0${date}`;
      setDate(forday);
    } else {
      const forday = `${yeartoday}-${month}-${date}`;
      setDate(forday);
    }
    axios.get("http://localhost:3001/getSchohalarList").then((response) => {
      setDateScholarships(response.data);
    });
    return () => {
      isMouted = false;
    };
  }, []);

  const transitions = useTransition(
    location.pathname == "/HomeScholarships/StudentScholarships",
    {
      from: { opacity: 0 },
      enter: { opacity: 1, delay: 150 },
      leave: { opacity: 0 },
    }
  );

  return transitions(
    (styles, item) =>
      item && (
        <animated.div className="subcon" style={styles}>
          <div
            className="header"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <h1>รายการนักศึกษาทุน</h1>
            <Button
              variant="outlined"
              color="primary"
              style={{
                position: "absolute",
                right: "150px",
                bottom: "-5px",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
              disabled={!scholarshipId}
              onClick={handleClickOpenForm}
            >
              เพิ่มนักศึกษาทุน
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "75px",
              top: "30px",
            }}
          >
            <div style={{ marginLeft: "10px" }}>
              <InputLabel
                style={{ marginLeft: "10px" }}
                id="demo-simple-select-outlined-label"
              >
                ทุน
              </InputLabel>
              <Select
                value={scholarshipName}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
                variant="outlined"
                onChange={(e) => {
                  SelectByScholar(e);
                }}
                style={{
                  width: "100px",
                  height: "40px",
                  outline: "none",
                  background: "transparent",
                }}
              >
                {dateScholarships.map((data, index) => (
                  <MenuItem
                    key={index}
                    value={data.id}
                    name={data.scholarship_name}
                  >
                    {data.scholarship_name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <TableContainer
              style={{ backgroundColor: "#EAF1F4", borderRadius: "15px" }}
            >
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">รหัสนักศึกษา</StyledTableCell>
                    <StyledTableCell align="center">
                      ชื่อ-นามสกุล
                    </StyledTableCell>
                    <StyledTableCell align="center">เพิ่มโดย</StyledTableCell>
                    <StyledTableCell align="center">
                      เพิ่มวันที่
                    </StyledTableCell>
                    <StyledTableCell align="center">ลบ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataScholarList.map((dataList, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left" width="100px">
                        {dataList.student_id}
                      </StyledTableCell>
                      <StyledTableCell align="center" width="100px">
                        {dataList.name} {dataList.lastname}
                      </StyledTableCell>
                      <StyledTableCell align="center" width="100px">
                        {dataList.ad_name} {dataList.ad_lastname}
                      </StyledTableCell>
                      <StyledTableCell align="center" width="100px">
                        {dataList.date}
                      </StyledTableCell>
                      <StyledTableCell align="center" width="100px">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            DeleteItem(dataList.sch_id);
                          }}
                        >
                          <DeleteForeverRoundedIcon
                            style={{ fontSize: "2rem", color: "red" }}
                          />
                        </Button>
                      </StyledTableCell>
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
              <DialogTitle id="alert-dialog-title">
                {"เพิ่มนักสึกษาทุน"}
              </DialogTitle>
              <DialogContent style={{ width: "500px", height: "600px" }}>
                <DialogContentText id="alert-dialog-description">
                  <div style={{ marginTop: "10px",display:'flex',alignItems:'center',flexDirection:'column' }}>
                    <TextField
                      fullWidth
                      label="รหัสนักศึกษา"
                      variant="outlined"
                      type="text"
                      onChange={(e) => onChangHandler(e.target.value)}
                      value={studentId}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestion([]);
                        }, 400);
                      }}
                    />
                    {suggestion.map((data, index) => (
                      <div
                        className="suggestionPointer"
                        onClick={() => onSuggestHandler(data.id)}
                        key={index}
                      >
                        {data.id}: {data.name} {data.lastname}
                      </div>
                    ))}
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
        </animated.div>
      )
  );
}

export default StudentScholarships;
