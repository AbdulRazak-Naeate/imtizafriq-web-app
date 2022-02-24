import React ,{useEffect,useState}from 'react';
import "./topbar.css"
import {ShoppingCartOutlined,AccountCircleOutlined} from '@material-ui/icons';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Menu from '@mui/material/Menu';
import {MenuItem} from '@mui/material';
import {Link} from 'react-router-dom';
import SearchField from './searchfield/SearchField';
import axios from 'axios';

 const Topbar = ({totalItems,totalOrders,handlesearchProduct,handleUserClick}) => {
   
   const[loggedin,setLoggedin]=useState(false);
   //const [user] = useState(JSON.parse(localStorage.getItem('user')));
   // const [loggedin] = useState(JSON.parse(localStorage.getItem('loggedin')));
  
    //const history=useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
   
    //eslint-disable-next-line no-unused-vars
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(()=>{

       
    
    })
    return (
        <div className="topbar">
        
            <div className="topbarActions">
                <div className="topLeft">
                  <div className='logowrapper'>
                  <Link to ="/" className="link">
                     <img className='logo-img' src="logo192.png" alt='logo'/>
                   </Link>      
                   <Link to ="/" className="link">
                   <span className="siteName">{process.env.REACT_APP_WEBSITE_NAME}</span>
                   </Link>                
                 
                  </div>
                </div>
                <div className="searchfield">
                  <SearchField handlesearchProduct={handlesearchProduct}/>
                </div>
                <div className="topRight">
                   {/*  <div className="topbarIonContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div> */}

                    <div className="topbarIonContainer">
                      
                       <Link to="/orders">
                       <ShoppingBagOutlinedIcon className="link"/>
                       </Link>
                        <span className="topIconBadge">{totalOrders}</span>
                    </div>
                    <div className="topbarIonContainer">
                      <Link  to="/cart"><ShoppingCartOutlined className="link"/>
                        <span className="topIconBadge" >{totalItems}</span>
                        </Link>
                    </div> 
                   
                   
                </div>
              { loggedin ?  <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="topAvatar" />: <div className="topbarIonContainer">
                        <AccountCircleOutlined onClick={()=>{handleUserClick()}}/>
                    </div>}
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