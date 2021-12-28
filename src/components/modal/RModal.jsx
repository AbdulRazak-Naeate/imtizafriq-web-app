import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React,{useRef} from 'react';
import SignIn from '../signin/Signin';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '98%',
  bgcolor: 'background.paper',
  border: '2px solid cadetblue',
  borderRadius:'4px',
  boxShadow: 24,
  p: 4,
  padding:0,
};

 export const RModal =  React.forwardRef((props,ref) => {

  return (
    <div>
      
      <Modal
        open={props.openModal}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} ref={ref}>
          <SignIn handleCloseModal={props.handleCloseModal}/> 
        </Box>
      </Modal>
    </div>
  );
 })
