import React ,{useState,useEffect}from 'react';
import "./topbar.css"
import {NotificationsNone,ShoppingCartOutlined,AccountCircleOutlined,ListAltOutlined, ListOutlined } from '@material-ui/icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory,Link} from 'react-router-dom';
 const Topbar = ({totalItems}) => {
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
      var user =localStorage.getItem('user');
       //console.log("user "+user)
       if (user===null){
        // history.push('/dashboard/login'); 
       }
    })
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                   <Link to ="/" className="link">
                   <span className="logo">Daabia</span>
                   </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIonContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>

                    <div className="topbarIonContainer">
                       <Link to="/orders" className="link">
                       <ListOutlined/>
                       </Link>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIonContainer">
                      <Link  to="/cart"><ShoppingCartOutlined className="link"/>
                        <span className="topIconBadge" >{totalItems}</span>
                        </Link>
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