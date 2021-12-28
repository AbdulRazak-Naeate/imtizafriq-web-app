import React from 'react'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish,Done } from '@material-ui/icons';
import CheckIcon from '@mui/icons-material/Check';

import {Button,Grid} from '@mui/material';
import './user.css'
import {useState} from 'react';
import {Link} from 'react-router-dom';
import QueryParams from '../../QueryParams';
import {post,patch}from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Avatar from '../../assets/icons/user_96px.png';
import useStyles from './styles'
const Account = () => {
   const classes = useStyles()
  const query =QueryParams();    
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const[username,setUsername]=useState(user.name);
  const[firstname,setFirstname]=useState(user.firstname);
  const[lastname,setLastname]=useState(user.lastname);
  const[email,setEmail]=useState(user.email);
  const[phone,setPhone]=useState(user.phone);
  const[location,setLocation]=useState('Ghana');
  const[image,setImage]=useState(null)
  const [imagename,setImageName]=useState(null);
  const[onuserUpdated,setonuserUpdated]=useState(false);
  const[onImageChanged,setOnImageChanged]=useState(false)
   
  const imgonLoadError=(e)=>{
      e.target.onerror = null; e.target.src = Avatar
  }
  return (
    <div className={classes.root}>
      <form  className="userUpdateForm" onSubmit={{/* handleUpdate */}}>

      <Grid container justifyContent='space-around' spacing={2}> 

        <Grid item={true} xs={11} sm={4} md={4} lg={4}>
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={`http://localhost:3001/server/uploads/users/${user.image[0].filename}`}  id="avatar"  onError={imgonLoadError} alt="" className="userShowImg" />
                        
                       <div className="userShowTopTitle">
                           <span className="userShowUsername">{username}</span>  <span className="active"></span>
                           <span className="userShowUserTitle">{username}</span>
                       </div>
                    
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                             <PermIdentity className="userShowIcon"/>
                        <span className="userShowInfoTitle">{`${firstname} ${lastname}`}</span>
                        </div>
                        <div className="userShowInfo">
                             <CalendarToday className="userShowIcon"/>
                        <span className="userShowInfoTitle">12.43.1996</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                             <PhoneAndroid className="userShowIcon"/>
                        <span className="userShowInfoTitle">{phone}</span>
                        </div>
                        <div className="userShowInfo ">
                         <MailOutline className="userShowIcon"/>
                         <div className="emailverify">
                          <span className="userShowInfoTitle">{email}</span>
                       {user.confirmed ? <CheckIcon style={{marginLeft:10}} color="success"/> :  <Button style={{marginLeft:10}}  variant='outlined' size="small" color='primary'  onClick={{/* handleVerifyEmail */}}>verify</Button>}
                          </div>  
                        </div>
                        <div className="userShowInfo">
                             <LocationSearching className="userShowIcon"/>
                        <span className="userShowInfoTitle">{location}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{location}</span>
                        </div>
                        <div className="userShowInfo">
                        <span className="userShowInfoTitle">{location}</span>
                        </div>
                       </div>
                </div>
                </Grid>
                <Grid item={true} xs={12} sm={4} md={4} lg={4}>

                <div className="userUpdateWrapper"> 
                    <span className="userUpdateTitle">Edit</span>
                  
                  <div className="userUpdateLeft">
                        {/* <div className="userUpdateItem">
                            <label>UserName</label>
                            <input type="text" placeholder="mardiaabu33" className="userUpdateInput" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                        </div> */}
                        <div className="userUpdateItem">
                            <label>First Name</label> 
                            <input type="text" placeholder="Mardia Abubakari" className="userUpdateInput" onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Last Name</label> 
                            <input type="text" placeholder="Mardia Abubakari" className="userUpdateInput" onChange={(e)=>{setLastname(e.target.value)}} value={lastname}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input type="text" placeholder="mardiaabu33@gmail.com" className="userUpdateInput" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input type="text" placeholder="+23358473829" className="userUpdateInput" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>Country</label>
                            <input type="text" placeholder="Ghana" className="userUpdateInput" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>State</label>
                            <input type="text" placeholder="Northern" className="userUpdateInput" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                        </div>
                        <div className="userUpdateItem">
                            <label>City</label>
                            <input type="text" placeholder="Tamale" className="userUpdateInput" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                        </div>
                        </div> 
                        </div>
                        </Grid>
               <Grid item={true} xs={12} sm={4} md={4} lg={2}>
                    <div className="userUpdateUploadWrapper">
                        <div className="userUpdateUpload">
                            <img src={`http://localhost:3001/server/uploads/users/${user.image[0].filename}`} onError={imgonLoadError} alt=""  id="user-image"className="userUpdateImg" />
                            <label htmlFor="file"> <Publish className="userUpdateIcon"/> </label>
                                <input type="file" onChange={{/* onFileInputChange */}} id="file" style={{display:"none"}}/>
                       </div>
                       <button className="userUpDateButton">Update</button>
                    </div>
                        </Grid>
              </Grid> 
             </form>
    </div>
  )
}

export default Account
