import React ,{useState,useEffect} from 'react'
 import{Container,Typography,Button, Grid} from '@material-ui/core';
 import useStyles from './styles';
 import CartItem from './cartItem/CartItem';
 import {Link} from 'react-router-dom';
const Cart = ({cart, handleUpdateCartQty,handleUpdateSpecs,handleupdateMeasurement,handleRemoveFromCart, handleEmptyCart}) => {
  
    const classes= useStyles();
    const [itemsCount,setItemsCount]=useState(0);
    useEffect(()=>{
       try{
        cart.items.length!==undefined?setItemsCount(cart.items.length):setItemsCount(cart.items.length)
       }catch(err){
           console.log(err)
       }
    },[cart,setItemsCount])
    const EmptyCart = ()=>(
        <Typography variant="subtitle1">You have no items in your shopping cart,
        <Link to="/" className={classes.link}>start adding some !</Link>
        </Typography>
    );
    const  FilledCart =()=>(
          <>
            <Grid container spacing={3}> 
                {cart.items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.porductId}>
                        <CartItem cartitem={item} key={item.porductId} onUpdateCartQty={handleUpdateCartQty} onUpdateSpecs={handleUpdateSpecs} onUpdateMeasurement={handleupdateMeasurement} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: ${cart.subtotal}</Typography>
                <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button> 
                 <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Check Out</Button>
                </div>

            </div>
        </>
    )

    if (!cart) return 'Loading ...';

    return (
        <div>
            <Container>
                <div  className={classes.toolbar}>
                <Typography className={classes.title} variant="h4" gutterBottom>Your Shopping Cart</Typography>
                </div>
                
                {itemsCount===0 ? EmptyCart(): FilledCart()}
            </Container>
        </div>
    )
}

export default Cart
