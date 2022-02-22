import Box from '@mui/material/Box';
import React from 'react'
import {Modal,Typography,Button} from '@mui/material';
import {useHistory} from 'react-router-dom';
import useStyles from './styles'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '98%',
    bgcolor: 'background.paper',
    border: '2px solid conflowerblue',
    borderRadius:'4px',
    boxShadow: 24,
    p: 4,
    padding:10,
  };
export const PrefareStyleAlertModal =  React.forwardRef((props,ref) => {
    const classes= useStyles();
    const history=useHistory();
  return (
    <div>
       <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.root} ref={ref}>
        <div className='' style={{width:'60%'}}>
            <Typography variant='h3' >
                Order by Uploading your style
            </Typography>
           <Button variany='outlined' size='large' onClick={()=>{history.location=`http://localhost:3000/prefaredstylecheckout`}}>Order Now</Button>
        </div>
        </Box>
      </Modal>
    </div>
  )
});


