import React from 'react'
import useStyles from'./styles';
import {Container, Grid,Typography } from '@material-ui/core';
import OrderItem from './order/orderItem';
import {Link} from 'react-router-dom';
import Comments from '../comments/Comments';
const Orders = ({orders}) => {
  const classes =useStyles();
  const EmptyOrder = ()=>(
    <Typography variant="subtitle1">You have no items in your orders,
    <Link to="/" className={classes.link}>Go to home !</Link>
    </Typography>
);

const FilledOrder = ()=>(
      <>
     <Grid container justifyContent="center" spacing={3}>
         {
           orders.map((order)=>(
             <Grid item key={order._id} xs={12} sm={12} md={12} lg={12}>
               <OrderItem order={order}></OrderItem>
               </Grid>
           ))
         }
       </Grid>

      </>
) 
if (!orders) return 'loading ...';
  return (
    <div className={classes.root}>
      <Container>
        <Comments/>
      <div className={classes.toolbar}>  
      <Typography variant="h4" gutterBottom className={classes.title}>
      Your Current Orders
      </Typography>
        </div>
        {
          orders.length===0 ? EmptyOrder():FilledOrder()
        }
      </Container>
     
  
    </div>
  )
}

export default Orders
