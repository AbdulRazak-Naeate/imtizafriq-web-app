import React,{useState} from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({cartitem,onUpdateCartQty,onUpdateSpecs,onRemoveFromCart}) => {
    const classes = useStyles();
    const[color,setColor]=useState('');
    const[size,setSize]=useState('');
     
     const onGridColorItemClick=(item)=>{
         setColor(item)
         console.log(item)
     }
     const onGridSizeItemClick=(item)=>{
      setSize(item)
      console.log(item)
      
 }
    const ColorGridList= ({list,onUpdateSpecs}) =>(
          <>
          <Typography variant="body2">{`Select Color`}</Typography>
         <div class={classes.specsListWrapper} >
          <div className={classes.gridSpecsList} >                        
               <div className={classes.specsGrid} > 
                {list.map((item,index)=>(
                 item!=='' ? <div key={index} className={`${classes.gridSpecsItem} ${color===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateSpecs(cartitem.product._id,'color',item);onGridColorItemClick(item)}}>{item}</div>:''
               
                ))}
                </div>
               </div>
        </div>
  </>
    )

    const SizeGridList= ({list ,onUpdateSpecs}) =>(
      <>
      <Typography variant="body2">{`Select Size`}</Typography>
     <div class={classes.specsListWrapper} >
      <div className={classes.gridSpecsList} >                        
           <div className={classes.specsGrid} > 
            {list.map((item,index)=>(
             item!==''? <div key={index} className={`${classes.gridSpecsItem} ${size===item ? classes.select:classes.disSelect}`} onClick={()=>{onUpdateSpecs(cartitem.product._id,'size',item);onGridSizeItemClick(item)}}>{item}</div>:''
           
            ))}
            </div>
           </div>
    </div>
</>
  
  
)
  return (
    <div>
        <Card>
            <CardMedia image={`http://localhost:3001/server/uploads/products/${cartitem.product.image[0].filename}`} alt={cartitem.product.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
             <Typography variant="h6">{cartitem.product.name}</Typography>
             <Typography variant="h6">{`$${cartitem.line_item_sub_price}`}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
             <div className={classes.specifications}>
              {cartitem.product.color.length>0 ?  <ColorGridList type={"color"} onUpdateSpecs={onUpdateSpecs} list={cartitem.product.color}/>:''}
              {
                cartitem.product.size.length>0 ?  <SizeGridList type={"size"} onUpdateSpecs={onUpdateSpecs} list={cartitem.product.size}/>:''
              }
             </div>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity-1,cartitem.product.price)}}>-</Button>
                <Typography>{cartitem.quantity}</Typography>
                <Button type="button" size="small"  color="secondary" onClick={()=>{onUpdateCartQty(cartitem.product._id,cartitem.quantity+1,cartitem.product.price)}}>+</Button>
                   <Button type="button"   variant="contained" color="secondary" onClick={()=>{onRemoveFromCart(cartitem.product._id)}}>Remove</Button>
              </div>
           
            </CardActions>
        </Card>
      
    </div>
  )
}

export default CartItem
