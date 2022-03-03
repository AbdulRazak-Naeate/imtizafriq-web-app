import Box from '@mui/material/Box';
import React,{useState} from 'react'
import {Modal,Typography,Button,Checkbox,FormControlLabel} from '@mui/material';
import {orange } from '@mui/material/colors';
import {Link} from 'react-router-dom';
import useStyles from './styles';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '98%',
    bgcolor: 'background.paper',
    border: 0,
    borderRadius:'4px',
    boxShadow: 24,
    p: 4,
    padding:10,
  };
export const PrefareStyleAlertModal =  React.forwardRef((props,ref) => {
    const classes= useStyles();
    console.log();
    const showagain=JSON.parse(localStorage.getItem('show-pref-alert'));

    const [checked,setChecked]=useState(showagain ? false : true);
    const label = { inputProps: { 'aria-label': 'Dont show again' } };

    const handleUpdateCheck = (check,props)=>{
       setChecked(!checked);
       localStorage.setItem('show-pref-alert',checked);
        props.setOpenPrefStyleModal(!props.openModal)
    } 
  return (
    <div>
       <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.root} ref={ref}>
        <div className={classes.content}>
          <div className={classes.contentLeft}>
          <div className={classes.contentLeftSub}>
                <Typography className={classes.contentLeftText} variant='h5'>
                Order by Uploading your style
                </Typography>
               <Link to={'/prefaredstylecheckout'} className={classes.link}>
                <Button type="button"  variant="outlined" size='large' onClick={()=>{props.setOpenPrefStyleModal(false)}}>Order Now</Button></Link>
              </div>
                <FormControlLabel style={{margin:'5% 5px'}} control={ <Checkbox {...label}  sx={{color: orange[800],'&.Mui-checked': {color: orange[600],},
                 }} checked={checked} onChange={(e)=>{setChecked(e.target.checked); console.log(e.target.checked);
handleUpdateCheck(e.target.checked,props) }} />} label="Don't show again" />
               
          </div>
          <div className={classes.contentRight}>
           <img src='/images/captan_thumb_nail.png' alt='prefare style' className={classes.captanImage}/>
           </div>
        </div>
        </Box>
      </Modal>
    </div>
  )
});


