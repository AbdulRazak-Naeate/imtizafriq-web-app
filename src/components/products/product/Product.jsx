import React,{useState,useEffect} from 'react'
import {Card,CardMedia,CardContent,CardActions,Typography,IconButton} from '@mui/material';

import useStyles from './styles';
import { AddShoppingCart,FavoriteBorderOutlined,Favorite } from '@mui/icons-material';
import {useHistory} from 'react-router-dom';
import { blue, orange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Product = ({product,onAddToCart,onUpdateLikes,favorites}) => {
    const classes=useStyles();
    const history=useHistory();
    const[like,setLike]=useState(false);
    const theme = createTheme({
      palette: {
        primary:{
          main:blue[500],
        /*   main:"#3f51b5", */
        },
          secondary: {
              main:orange[500],
              contrastText:'#fff'
          }
        },
  });  
  const truncateString=(str, num) => {
    if(str.length>num){
      return str.slice(0,num)+"...";
    }else{
      return str;
    }
  }
    const handleProductOnClick=(productid)=>{
       history.push(`/proceedcheckout?productId=${productid}`)
    }
      useEffect(() => {
           if (favorites.includes(product._id,0)){
             setLike(true)
           }else{
             setLike(false)
           }
      },[favorites,setLike,product])
  return ( 
    <ThemeProvider theme={theme}>

    <div>
    <Card className={classes.root} >
           <Typography variant="h6" className={classes.price}>
                        {`$${product.price}`}
                    </Typography>  
                     <CardMedia className={classes.media}  image={`http://localhost:3001/server/uploads/products/${product.image[0].filename}`} title={product.name} onClick={()=>{handleProductOnClick(product._id)}}/>
            
              <CardContent className={classes.cardContent}>
                  <div className={classes.cardContentSub}>
                    <Typography variant='span' gutterBottom noWrap>
                        {product.name}
                    </Typography>
                    <Typography variant="span">
                        {`$${product.price}`}
                    </Typography>
                  </div>
                  <div className={classes.description}>
                  <Typography  dangerouslySetInnerHTML={{__html:truncateString(product.description,54)}} variant="body2" color="textSecondary" noWrap={false}/>  
                  </div>
              </CardContent>
              <CardActions disableSpacing className={classes.cardActions}>
              <IconButton aria-label="Add to Favourite">
                   { like ===true ?  <Favorite className={classes.icon} onClick={()=>{ setLike(!like);onUpdateLikes(product._id,product.storeId)}}/>: <FavoriteBorderOutlined className={classes.icon} onClick={()=>{ setLike(!like);onUpdateLikes(product._id,product.storeId)}}/> }
                  </IconButton>

                  <IconButton aria-label="Add to Cart">
                    <AddShoppingCart  onClick=
                  {()=>{onAddToCart(product,1)}}className={classes.icon}/>  
                  </IconButton>

              </CardActions>
        </Card>
    </div>
    </ThemeProvider>
  )
}

export default Product

