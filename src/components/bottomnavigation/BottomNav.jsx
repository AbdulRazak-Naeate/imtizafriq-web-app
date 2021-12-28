import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/HomeMiniOutlined';
import CartIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import useStyles from './styles';


const BottomNav = ({onBottomNavChange}) => {
     const[value,setValue]=React.useState(0)
     const classes =useStyles();
     

  return (
   
       <Paper className="bottomnav" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
    <BottomNavigation className={classes.root}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onBottomNavChange(newValue)
      }}
    >
      <BottomNavigationAction  className={classes.root}
    label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction className={classes.root} label="Cart" icon={<CartIcon />} />
      <BottomNavigationAction className={classes.root} label="Account" icon={<AccountIcon />} />
    </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
