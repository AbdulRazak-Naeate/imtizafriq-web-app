const { CLIENT_ORIGIN } = require('../../config')
const cheerio = require('cheerio');


function formatWithCurrencySymbol (amount,currency){
	// Create GH Cedi currency symbol.
  var formatter = new Intl.NumberFormat('en-GH', {
	  style: 'currency', 
	  currency: currency, //   currency: 'GHS',
	});
	return formatter.format(amount)
  }
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.


 const confirmEmail= id => ({
    subject: 'React Confirm Email',
    html: `
      <a href='${CLIENT_ORIGIN}/dashboard/email/confirm?_id=${id}'>
        click to confirm email
      </a>
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/dashboard/email/confirm?_id=${id}`
  })
	    

  const generateHtmlTemplate =(orderdata)=>{
   console.log("order data "+orderdata.line_items)
   let customer=orderdata.customer;
   let items=orderdata.line_items
   let shippingData=orderdata.shipping
   let total =orderdata.subtotal+shippingData.shippingFees;
   let selectedItems=[];
   for (let i=0;i<items.length;i++){
	   if (items[i].selected){
		  selectedItems.push(items[i])
	   }
   }


	let html =`
	<!DOCTYPE html>
<html>
    <head>
        <title>
            
        </title>
        <style type="text/css">
            body{
                padding: 5px;
				color:black
            }
                .itemsTable, .billing{
                    width: 600px;
                }
             .tdborder{
                 border: 1px solid darkgray;
             }
			 span h3{
				 color:#000;
			 }
			 
             @media only screen and (max-device-width: 480px) {
                .itemsTable, .billing{
                    width: 100%;
                }


           a[href^="tel"], a[href^="sms"] {
            text-decoration: none;
            color: black; /* or whatever your want */
            pointer-events: none;
            cursor: default;
        }

.mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
            text-decoration: default;
            color: orange !important; /* or whatever your want */
            pointer-events: auto;
            cursor: default;
        }
}
            </style>
    </head>
<body>
	<div style="height:80px;padding:5px;color:#fff;background-color:orange;text-align:center;mergin:10px" ><h2>Thank you for Shopping with us<h2/></div>
	<span style="margin:3px">Hi ${customer.firstname}</span><br/>
	<span  style="margin:3px">We have finished processing your order</span>
	<h3 style="color:orange">Order #${shippingData.orderNumber}    [${shippingData.date}]</h3>
	<table width="600" cellpadding="4" cellspacing="0" border="1" bordercolor="darkgray" class="itemsTable" id="backgroundTable">
	<tr>
	<th>Porduct</th> <th>Quantity</th> <th>Price</th>  <th>SubTotal</th>
	</tr>
	 ${ 
		 selectedItems.map((item,index)=>{
	     return(`<tr>
			   <td>${item.product.name}</td>
			 <td>${item.quantity}</td>
			  <td>${formatWithCurrencySymbol(item.product.price,'GHS')}</td>
			  <td>${formatWithCurrencySymbol(item.line_item_sub_price,'GHS')}</td>
			 </tr>`
		 )})
	  }
	  <tr>
     	<td colspan="3" >Shipping Fees:</td>
    	<td>${formatWithCurrencySymbol(shippingData.shippingFees,'GHS')}</td>
    	</tr>
	   <tr>
     	<td colspan="3" >Payment method:</td>
    	<td>FlutterWave</td>
    	</tr>

	   <tr>
	   <td colspan="3" >Total:</td>
       <td>${formatWithCurrencySymbol(total,'GHS')}</td>
	</tr>
	 
	</table>
 
      <div class="billing" style="margin-top:40px;border:1px solid darkgray;border-radius:3px;padding:4px">
	 <table width="600" border="0">
	 <tr>
	    <td> <h3>Billing address<h3></td>
     </tr>
	 <tr>
	 <td> <span>${customer.firstname +" "+ customer.lastname}</td></span>
	 </tr>
	 <tr>
	 <td>
	 <span>${customer.phone}</span></td>
	 </tr>
	 <tr>
	 <td><span>${customer.email}</span></td>
	 </tr>
	 <tr>
	 <td> <span>${shippingData.country}</span></td>
	  </tr> 
	  <tr>
	 <td>
	 <span>${shippingData.postal_zip_code}</span>
	 </td>
	 </tr>
	  <tr>
	  <td>
	 <span>${shippingData.county_state}</span>
	 </td>
	 </tr>
	 <tr>
	 <td>
	 <span>${shippingData.town_city}</span>
	 </td>
	 </tr>
	 <tr>
	 <td>
	 <span>${shippingData.street}</span>
	 </td>
	 </tr>
	 <tr>
	 <td>
	 <span>${shippingData.home_address}</span>
	 </td>
	 </tr>
	 </table> 
	 </div>
	 </body>
</html>
 ` 
  const $ =cheerio.load(html)
 return $.html()
  
 }
  
 const confirmOrder= (data) =>({
	
    subject: `${process.env.REACT_APP_WEBSITE_NAME}.com , We recieve your Order Successfully`,
    html:generateHtmlTemplate(data)
    
  })

  module.exports.confirmEmail=confirmEmail
  module.exports.confirmOrder=confirmOrder