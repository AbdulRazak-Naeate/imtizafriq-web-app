import React from 'react'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core';
import useStyles from './styles';
import './styles.css';
const OrderItem = ({order}) => {
    const classes=useStyles();
     
  return (
    <div> 
      <Card className={classes.root}>
            <CardMedia className={classes.media} image={`http://localhost:3001/server/uploads/products/${order.filename}`}> </CardMedia>

                <CardContent className={classes.cardContent}>
                    <div className={classes.cardContentSub}>
                        <Typography variant="h5" gutterBottom>
                            {order.name}

                        </Typography>
                        <Typography variant="h5">
                            {`${order.priceEach}`}
                        </Typography>
                        
                    </div>
                    <div className={classes.orderDetails}>
                      
                        <Typography variant="body2">
                          Quantity :{order.quantity}  
                        </Typography>

                        <Typography variant="body2">
                          {`$${order.totalPrice}`}  
                        </Typography>
                         <Typography variant="body2">
                            {`${order.date}`}
                        </Typography>
                    </div>
                    <div className={classes.orderDetails2}>
                       {order.color!=='null' ?      <Typography variant="body2" className={classes.color}>
                          {order.color}  
                        </Typography>:''}
                       {order.size!=='null' ? <Typography variant="body2" className={classes.size}>
                          {order.size}  
                        </Typography>:''}
                        <Typography variant="body2">
                        </Typography>
                        <Typography variant="body2" className={order.status}>
                          {order.status}  
                        </Typography>

                    </div>
                </CardContent>

           
      </Card>
    </div>
  )
}

export default OrderItem
