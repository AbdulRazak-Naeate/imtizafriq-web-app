import React,{useRef} from 'react';import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Grid} from '@mui/material';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid} from '@material-ui/icons'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid',
    borderRadius:'4px',
    boxShadow: 24,
    p: 4,
  };
  
export const  CustomerDetailsModal =  React.forwardRef((props,ref) => {

    const componentRef = useRef();
    try {
        console.log('customer data :' +JSON.stringify(props.transData))
        var customer=props.transData.customer
       var  shippingData=props.transData.shippingData
       var  cusomer=props.transData.customer 
    } catch (error) {
        console.error(error)
    }
  return (
    <div>
      {
          customer ? <Modal 
          open={props.openCustomerModal}
          onClose={props.handleCloseCustomerModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} ref={componentRef}>
            <span id="modal-modal-title" variant="h6" component="h2">
              Customer Info
              
            </span>
          
            <span id="modal-modal-description" sx={{ mt: 2 }}>
              
             <Grid container justifyContent='space-between' spacing={2}>  
             <Grid item={true} xs={12} md={12} >
             <div className="userShowBottom">
                          <span className="userShowTitle">Name </span>
                          <div className="userShowInfo">
                               <PermIdentity className="userShowIcon"/>
                          <span className="userShowInfoTitle">{`${customer.firstname} ${customer.lastname}`}</span>
                          </div>
                          <div className="userShowInfo">
                               <CalendarToday className="userShowIcon"/>
                          <span className="userShowInfoTitle">{shippingData.date}</span>
                          </div>
                          <span className="userShowTitle">Contact Details</span>
                          <div className="userShowInfo">
                               <PhoneAndroid className="userShowIcon"/>
                          <span className="userShowInfoTitle "> <a  className='customer-contact-link' href={`tel:+233${customer.phone}`}>{`${customer.phone}`}</a> </span>
                          </div>
                          <div className="userShowInfo ">
                           <MailOutline className="userShowIcon"/>
                           <div className="emailverify">
                            <span className="userShowInfoTitle email "><a className='customer-contact-link' href={`mailto:${customer.email}`}>{`${customer.email}`}</a></span>
                            </div>  
                          </div>
                          <div className="userShowInfo">
                               <LocationSearching className="userShowIcon"/>
                          <span className="userShowInfoTitle">{`${shippingData.country} ,${shippingData.state} ,${shippingData.city}`}</span>
                          </div>
                         </div>
             </Grid>
            {/*  {
                props.tranxData.length>0? props.tranxData.map((data,index)=>{
                  return(
                      <Grid item={true} xs={12} md={6}  key={index}>
                          <div className="detailContainer">
                          
                         </div>
                      </Grid>
                    )
                 }):''
               } */}
             </Grid>
  
            </span>
          </Box>
        </Modal> :''
      }
    </div>
  )})