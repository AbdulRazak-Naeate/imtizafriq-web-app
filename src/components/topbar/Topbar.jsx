import React ,{useState,useEffect}from 'react';
import "./topbar.css"
import {NotificationsNone,ShoppingCartOutlined,AccountCircleOutlined } from '@material-ui/icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory} from 'react-router-dom';
 const Topbar = () => {
  //const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [loggedin] = useState(JSON.parse(localStorage.getItem('loggedin')));
  
  const history=useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    // eslint-disable-next-line no-unused-vars
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
     useEffect(()=>{
       console.log(loggedin);
       if (!loggedin){
          window.location.href="http://localhost:3000/login"
       }
     });
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Daabia</span>
                </div>
                <div className="topRight">
                    <div className="topbarIonContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIonContainer">
                        <ShoppingCartOutlined/>
                        <span className="topIconBadge">2</span>
                    </div> 
                    <div className="topbarIonContainer">
                        <AccountCircleOutlined/>
                    </div>
                    <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="topAvatar" />
                </div>
                
            </div>
            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        </div>
    )
}

export default Topbar;