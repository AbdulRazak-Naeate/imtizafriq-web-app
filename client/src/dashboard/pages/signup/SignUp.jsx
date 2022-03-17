/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './signup.css';
import {post} from 'axios';



export default function SignUp({toggleSideBar}) {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [repeatPassword,setRepeatPassword]=useState('');


  const history=useHistory();


 /*  const _db = new loki('csc.db');
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
      //localStorage.setItem('auth-token',response.headers)

      console.log(response.headers);
       
      history.replace("/dashboard");
     }
    }).catch((error)=>{
       console.log(error.request)
    });
    }
  } 

 

  useEffect(()=>{
    toggleSideBar(false);

   
    
   },[toggleSideBar]);

  const SignUp =()=>{
        
    const url = `/api/user/register`;

    return post(url,  {
      username:username.toLowerCase(),
      firstname:'null',
      lastname:'null',
      email: email ,
      phone:'null',
      role:'administrator',
      password: password,
    })
  
  };

  return (
    <div className="signup">
      <div className="signupLeft"></div>
      <div className="signupMiddle">
                    <div className="signupFormWrapper">
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
                         <div className="signUpsignupItem">
                        
                       <Link to="/dashboard/login" className="link">
                       <button className="btnSignUp">Login</button>
                       </Link>
                       <button className="btnsignup" >Signup</button>
                         </div>
                    </form>
                    </div>
              
      </div>
      <div className="signupRight"></div>
    </div>
  )
}
