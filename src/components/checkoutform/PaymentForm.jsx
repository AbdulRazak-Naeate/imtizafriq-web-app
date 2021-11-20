import React from 'react'
import {Typography,Button,Divider} from '@material-ui/core';
import Review from './Review'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
const PaymentForm = ({shippingData ,checkoutToken,backStep,onCaptureCheckout,nextStep}) => {
    const config = {
        public_key: 'FLWPUBK-37d2e9fba8018282c3139e2a90c8ef76-X',
        tx_ref: Date.now(),
        amount: 100,
        currency: 'GHS',
        payment_options: 'card,mobilemoneyghana,ussd',
        customer: {
          email: 'user@gmail.com',
          phonenumber: '07064586146',
          name: 'joel ugwumadu',
        },
        customizations: {
          title: 'My store',
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
  /*   const orderData={
                    line_items : checkoutToken.live.line_items,
                    customer: {firstname:shippingData.firstName,lastname:shippingData.lastname,phone:shippingData.phone,
                     email:shippingData.email},
                    shipping:{name:'Primary',
                    street:shippingData.address1,
                    town_city:shippingData.city,
                    county_state:shippingData.shippingSubdivision,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry,
                      }
                } 

                onCaptureCheckout(checkoutToken.id,orderData);*/
               // nextStep();

            
  return (
    <>
     <Review checkoutToken={checkoutToken}/> 
             <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
            <FlutterWaveButton {...fwConfig} />
    </>
  )
}

export default PaymentForm
