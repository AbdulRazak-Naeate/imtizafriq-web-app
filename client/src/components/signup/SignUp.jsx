import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './signup.css';
import axios from 'axios';
import {Typography,Button} from '@mui/material'
/* var loki = require('lokijs'); */
const SignUp = ({handleCloseModal,handleSwitchForm,replacePermanentId}) => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [repeatPassword,setRepeatPassword]=useState('');
   
    const history=useHistory();
  
  /* 
    const _db = new loki('csc.db');
    const[db]=useState(_db); */
      
    const onFormSubmit =(e)=>{
      
      e.preventDefault()// Stop form default submit
      if( password===repeatPassword ) {
   
        SignUp().then((response) => {
  
        console.log(response.data);
       if (response.data.status===200){
        const user = response.data;
        localStorage.setItem('_id', user._id);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loggedin', true);
        replacePermanentId(user);

        //localStorage.setItem('auth-token',response.headers)
  
        console.log(response.headers);
        handleCloseModal();
        history.replace("/account");
       }
      }).catch((error)=>{
         console.log(error.request)
      });
      }
    } 
  
  
  
    
    const SignUp =()=>{
          
      const url = `/api/user/register`;

   
      return axios.post(url,  {
        username:username.toLowerCase(),
        firstname:'null',
        lastname:'null',
        email: email ,
        phone:'null',
        password: password,
        fromGoogle:false,
      })
    
    };
  
    return (
      <div className="signupContainer">
                      <div className="FormWrapper">
                    <div className="signupTitle">
                      <h1 className="title">Signup</h1>
                    </div>
                      <form  className="signupForm" onSubmit={onFormSubmit}>
                    {/*  <div className="signupItem">
                          <select name="country" id="country"  onChange={onCountryChange} className="signupItemInput">
                               { 
                                countries.map((c ,index)=>(
                                   <option key={index} value={c.id}>{c.name}</option>
                                 ))
                               }
                          </select>
                        </div>
                        <div className="signupItem">
                          <select name="state" id="state" onChange={onStateChange} className="signupItemInput">
                              { states.map((s,i)=>(
                             <option key={i} value={s.id}>{s.name}</option>
                             ))}
                          </select>
                        </div>
                        <div className="signupItem">
                          <select name="cities" id="city" className="signupItemInput">
                             { 
                                cities.map((c ,index)=>(
                                   <option key={index} value={c.id}>{c.name}</option>
                                 ))
                               }
                          </select>
                        </div> */}
                          <div className="signupItem">
                              <label>UserName</label>
                              <input type="text"  className="signupInput" required value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                          </div>
  
                          <div className="signupItem">
                              <label>Email</label>
                              <input type="text"  className="signupInput" required  value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                          </div>
                          <div className="signupItem">
                              <label>Phone</label>
                              <input type="text"  className="signupInput" required  value={phone}  onChange={(e)=>{setPhone(e.target.value)}}/>
                          </div>
  
                          <div className="signupItem">
                              <label>Password</label>
                              <input type="password"  className="signupInput" required  value={password}  onChange={(e)=>{setPassword(e.target.value)}}/>
                          </div>
                          <div className="signupItem">
                              <label>Repeat Password</label>
                              <input type="password"  className="signupInput" required  value={repeatPassword}  onChange={(e)=>{setRepeatPassword(e.target.value)}}/>
                          </div>
                          <div className="signUpLoginItem">
                         <Button type="submit" fullWidth variant="contained" color="primary" >Register</Button>
                          </div>  
                           <div className="signUpsignupItem">
                          
                           <Typography variant="body2" color="primary" align="center" className="log" onClick={()=>{handleSwitchForm(true)}}>Alrady SignUp ? LogIn</Typography>
                           </div>
                      </form>
                      </div>
                
        </div>
    )
}

export default SignUp
