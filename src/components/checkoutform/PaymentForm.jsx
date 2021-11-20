import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import Review from './Review'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
const PaymentForm = ({shippingData ,checkoutToken,backStep,onCaptureCheckout,nextStep}) => {
    const config = {
        public_key:process.env.FLUTTER_WAVE_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: checkoutToken.subtotal,
        currency: 'GHS',
        payment_options: 'card,mobilemoneyghana,ussd',
        customer: {
          email: shippingData.email,
          phonenumber: shippingData.phone,
          name: shippingData.firstName + " " +shippingData.lastName,
        },
        customizations: {
          title: 'Daabia',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
      const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
           console.log(response);
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
      const handleSubmit= async (event)=>{
        event.preventDefault();
          const orderData={
                    line_items : checkoutToken.items,
                    customer: {firstname:shippingData.firstName,lastname:shippingData.lastName,phone:shippingData.phone,
                     email:shippingData.email},
                    shipping:{name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.state,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.country,
                      }
                } 
              console.log(orderData)
                onCaptureCheckout(checkoutToken._id,orderData);
                 nextStep();
              }
            
  return (
    <>
     <Review checkoutToken={checkoutToken}/> 
             <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
         {/*    <FlutterWaveButton {...fwConfig} />
 */}
            <form onSubmit={(e)=>handleSubmit(e)}>
                               
                                <br/><br/>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Pay {`${checkoutToken.subtotal}`}
                                </Button>
                                </div>
                            </form>
    </>
  )
}

export default PaymentForm
