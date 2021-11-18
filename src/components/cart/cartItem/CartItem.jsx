import React from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
    const classes = useStyles();
    console.log(item)
    var qty =item.quantity;

    console.log(qty)
    //calcSubTotal(item.product.price*qty);
  return (
    <div>
        <Card>
            <CardMedia image={`http://localhost:3001/server/uploads/products/${item.product.image[0].filename}`} alt={item.product.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.product.name}</Typography>
                <Typography variant="h5">{`$${item.line_item_sub_price}`}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>{onUpdateCartQty(item.product._id,item.quantity-1,item.product.price)}}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small"  color="secondary" onClick={()=>{onUpdateCartQty(item.product._id,item.quantity+1,item.product.price)}}>+</Button>
              </div>
              <Button type="button"   variant="contained" color="secondary" onClick={()=>{onRemoveFromCart(item.product._id)}}>Remove</Button>
            </CardActions>
        </Card>
      
    </div>
  )
}

export default CartItem