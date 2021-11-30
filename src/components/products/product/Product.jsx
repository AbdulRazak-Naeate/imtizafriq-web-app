import React from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@material-ui/core';

import useStyles from './styles';
import { AddShoppingCart } from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
const Product = ({product,onAddToCart}) => {
    const classes=useStyles();
    const history=useHistory();

    const handleProductOnClick=(productid)=>{
       history.push(`/proceedcheckout?productId=${productid}`)
    }
  return ( 
    <div>
    <Card className={classes.root} >
             <CardMedia className={classes.media}  image={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} title={product.name} onClick={()=>{handleProductOnClick(product._id)}}/>
              <CardContent className={classes.cardContent}>
                  <div className={classes.cardContentSub}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {`$${product.price}`}
                    </Typography>
                  </div>
                  <Typography dangerouslySetInnerHTML={{__html:product.description}} variant="body2" color="textSecondary"/>  
              </CardContent>
              <CardActions disableSpacing className={classes.cardActions}>
                  <IconButton aria-label="Add to Cart" onClick=
                  {()=>{onAddToCart(product,1)}}>
                    <AddShoppingCart/>  
                  </IconButton>

              </CardActions>
        </Card>
    </div>
  )
}

export default Product

