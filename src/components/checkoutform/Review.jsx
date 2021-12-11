import React,{useState} from 'react'
import {Typography,ListItem} from '@material-ui/core';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const Review = ({checkoutToken}) => {
    console.log(checkoutToken.items)
    const[checkoutCart]=useState(checkoutToken);
    const[items]=useState(checkoutToken.items);
    const[refresh,setRefresh]=useState(false);
    const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
    return (
      <>
      <Typography variant="h6" >Order Summary</Typography>
     {checkoutToken!==undefined? <List 
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      /* subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      } */
    >
      {items.map((item,index)=>(
        <>
        <ListItemButton onClick={handleClick}  key={`lsb${index}`}>
         <ListItem key={item.product._id}>
         <ListItemText   primary={item.product.name} secondary={`Quantity ${item.quantity}  ${item.color!=='null'? ' , '+item.color+' , '+item.size:''}`} />   
           <Typography variant="body2">{`$${item.line_item_sub_price}`}</Typography>

         </ListItem>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={open} timeout="auto" unmountOnExit >
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} key={`lstb${index}`}>
            {/* <ListItemIcon>
              <StarBorder />
            </ListItemIcon> */}
            <ListItemText  key={`listItem${index}`}secondary={`Back:${item.measurement.back} Chest:${item.measurement.chest} Length:${item.measurement.shirtLength} Sleeve:${item.measurement.sleeve} Trouser Length:${item.measurement.trouserLength} Waist:${item.measurement.waist} Thigh:${item.measurement.thigh} Bust:${item.measurement.bust}`} />
          </ListItemButton>
        </List>
      </Collapse>
        </>
      ))}
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
