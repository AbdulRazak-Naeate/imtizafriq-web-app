import * as React from 'react'

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/HomeMiniOutlined';
import CartIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';

const BottomNav = () => {

     const[value,setValue]=React.useState(0)
    
  return (
   
       <Paper className="bottomnav" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Cart" icon={<CartIcon />} />
      <BottomNavigationAction label="Account" icon={<AccountIcon />} />
    </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
