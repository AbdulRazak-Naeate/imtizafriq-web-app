import React,{useState} from 'react'
import {Typography,List,ListItem,ListItemText} from '@material-ui/core';
const Review = ({checkoutToken}) => {
   // console.log(checkoutToken.items)
    const[checkoutCart]=useState(checkoutToken);
    const[items]=useState(checkoutToken.items);
    const[refresh,setRefresh]=useState(false);
   
    return (
      <>
      <Typography variant="h6" >Order Summary</Typography>
     {checkoutToken!==undefined? <List disablePadding>
          {
            items.map((item)=>(
             <ListItem style={{padding:'10px 0px'}} key={item.product._id}>
                 <ListItemText primary={item.product.name} secondary={`Quantity ${item.quantity}`}/>
                 <Typography variant="body2">{`$${item.line_item_sub_price}`}</Typography>

             </ListItem>

            ))
          }
          <ListItem style={{padding:'10px 0'}}>
            <ListItemText primary="total"/>
            <Typography variant="subtitle1">{`$${checkoutCart.subtotal}`}</Typography>
          </ListItem>

      </List>:setRefresh(!refresh)
      }
    </>
  )
}

export default Review
