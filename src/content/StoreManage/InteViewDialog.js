import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import './InteViewDialog.css'
import { Link } from 'react-router-dom';

function InteViewDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
            <Link to="#" className="icon"><HelpOutlineRoundedIcon onClick={handleClickOpen}></HelpOutlineRoundedIcon></Link> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          - ด้านสุขาภิบาลอาหาร(20 คะแนน) <br/>
          (สามารถอธิบายถึงการเลือกซื้อวัตถุดิบมภาชนะที่มีคุณภาพ และการแต่งกายที่ถูกต้องตามหลักสุขาภิบาลอาหารสำหรับผู้ประกอบการได้)<br/>
          - ด้านการประกอบอาหาร (20 คะแนน)<br/>
          (มีการความสามารถในการประกอบอาหารและการพัฒนารายการอาหาร)<br/>
          - ด้านความสามารถในการประกอบกิจการ (20 คะแนน)<br/>
          (มีความพร้อมด้านทุนทรัพย์ สามารถประกอบกิจการได้ด้วยตัวเอง,มีความสามารในการบริหารจัดการร้านค้าได้)<br/>
          - ด้านความคิดสร้างสรรค์ (10 คะแนน)
          (ใช้ภาชนะทดแทนหรือย่อยสลายได้บรรจุอาหาร,มีโปรโมชั่นการขายส่งเสริมการลดใช้พลาสติกทุกชนิด)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog> 
        </div>
    )
}

export default InteViewDialog
