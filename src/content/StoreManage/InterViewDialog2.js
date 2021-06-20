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

function InteViewDialog2() {
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
          - การแต่งกายถูกต้องตามหลักสุขาภิบาลอาหาร<br/>
          - การมีมนุษย์สัมพันธ์ที่ดี<br/>
          - การมีจิตบริการ
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

export default InteViewDialog2