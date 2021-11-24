import React,{useState} from 'react'
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
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
    const ColorGridList= ({list}) =>(
          <>
          <span>{`Select Color`}</span>
         <div class={classes.specsListWrapper} >
          <div className={classes.gridSpecsList} >                        
               <div className={classes.specsGrid} > 
                {list.map((item,index)=>(
                  <div key={index} className={`${classes.gridSpecsItem} ${color===item ? classes.select:classes.disSelect}`} onClick={()=>{onGridColorItemClick(item)}}>{item}</div>
               
                ))}
                </div>
               </div>
        </div>
  </>
    )

    const SizeGridList= ({list}) =>(
      <>
      <span>{`Select Size`}</span>
     <div class={classes.specsListWrapper} >
      <div className={classes.gridSpecsList} >                        
           <div className={classes.specsGrid} > 
            {list.map((item,index)=>(
              <div key={index} className={`${classes.gridSpecsItem} ${size===item ? classes.select:classes.disSelect}`} onClick={()=>{onGridSizeItemClick(item)}}>{item}</div>
           
            ))}
            </div>
           </div>
    </div>
</>
  
  
)
  return (
    <div>
        <Card>
            <CardMedia image={`http://localhost:3001/server/uploads/products/${item.product.image[0].filename}`} alt={item.product.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
             <Typography variant="h5">{item.product.name}</Typography>
             <Typography variant="h6">{`$${item.line_item_sub_price}`}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
             <div className={classes.specifications}>
             <ColorGridList type={"color"} list={item.product.color}/>
             <SizeGridList type={"size"} list={item.product.size}/>
             </div>
              <div className={classes.buttons}>
                <Button type="button" size="small" onClick={()=>{onUpdateCartQty(item.product._id,item.quantity-1,item.product.price)}}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type="button" size="small"  color="secondary" onClick={()=>{onUpdateCartQty(item.product._id,item.quantity+1,item.product.price)}}>+</Button>
                   <Button type="button"   variant="contained" color="secondary" onClick={()=>{onRemoveFromCart(item.product._id)}}>Remove</Button>
              </div>
           
            </CardActions>
        </Card>
      
    </div>
  )
}

export default CartItem
