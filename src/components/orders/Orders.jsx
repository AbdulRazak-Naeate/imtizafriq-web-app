import React,{useState} from 'react'
import useStyles from'./styles';
import {Container, Grid,Typography,Card,CardMedia } from '@material-ui/core';
import OrderItem from './order/orderItem';
import {Link} from 'react-router-dom';
import Comments from '../comments/Comments';
import {Button} from '@mui/material';
const Orders = ({orders}) => {
  const classes =useStyles();
  const user =localStorage.getItem('user');
  const [openComments,setOpenComments]=useState(false);
  const [order,setOrder]=useState([]);

  const handleonReviewClick =(order)=>{
       setOrder(order)
        setOpenComments(!openComments);
  }
  const EmptyOrder = ()=>(
    <Typography variant="subtitle1">You have no items in your orders,
    <Link to="/" className={classes.link}>Go to home !</Link>
    </Typography>
);

const CommentsContainer = ({order})=>(
 <> <Card className={classes.ordercard}>
      <CardMedia className={classes.media} image={`http://localhost:3001/server/uploads/products/${order.filename}`}></CardMedia>
    </Card>
    <div className={classes.commentsTitle}>
    
   <Typography variant="h5">Comments and Review
  </Typography>
  <Button   size='small' color='primary' variant='text' onClick={()=>{setOpenComments(!openComments)}}>Done</Button>
 </div>
  <Comments order={order}/></> 
);
const FilledOrder = ()=>(
      <>
     <Grid container justifyContent="center" spacing={3}>
         {
           orders.map((order)=>(
             <Grid item key={order._id} xs={12} sm={12} md={12} lg={12}>
               <OrderItem order={order} onReviewClick={handleonReviewClick} ></OrderItem>
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
       {
         openComments ? <CommentsContainer order={order}/> : <><div className={classes.toolbar}>  
      <Typography variant="h4" gutterBottom className={classes.title}>
      Your Current Orders
      </Typography>
        </div>
      {
          orders.length===0 ? EmptyOrder():FilledOrder()
        }</>
       }
      </Container>
     
  
    </div>
  )
}

export default Orders
