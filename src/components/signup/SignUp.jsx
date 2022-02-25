import {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './signup.css';
import axios,{post} from 'axios';
import {Typography,Button} from '@mui/material'
/* var loki = require('lokijs'); */
const SignUp = ({handleCloseModal,handleSwitchForm,replacePermanentId}) => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [repeatPassword,setRepeatPassword]=useState('');
   /*  const [countries,setCountries]=useState([]);
    const [states,setStates]=useState([]);
    const [cities,setCities]=useState([]);
   */
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
  /* 
    const onCountryChange=(e)=>{
      var sid=e.target.value;
       filterStates(sid,db);
    }
  
    const onStateChange=(e)=>{
      var cid=e.target.value;
       filterCities(cid,db);
    }
  
    
  const filterStates = async(cid,db)=> {
    console.log(cid);
    let statesColl = db.getCollection("states");
   // console.log(statesColl.data)
    let states = await statesColl.find({ country_id: parseInt(cid) });
        setStates(states);
  
  }
  
    
  const filterCities = async(sid,db)=> {
    console.log(sid);
    let citiesColl = db.getCollection("cities");
    console.log(citiesColl.data)
    let cities = await citiesColl.find({ state_id: parseInt(sid) });
        setCities(cities);
  
  }
  
  const initiateCities = async (db,citiesJSON) =>{
    var _cities = db.getCollection("cities");
   if (!_cities) {
       _cities = db.addCollection('cities');
       const cities=  await fetch(citiesJSON)
       .then(cities => cities.json())
     
       await cities.forEach((c) => {
         _cities.insert(c);
       });
  
    }
    return _cities;
  }
    const initiateStates = async (db,statesJSON) =>{
      var _states = db.getCollection("states");
     if (!_states) {
     _states = db.addCollection('states');
   const states=  await fetch(statesJSON)
       .then(states => states.json())
       
         await states.forEach((s) => {
           _states.insert(s);
         });
    
      }
      return _states;
    }
    const  initializeData  = async (db,countriesJSON)  => {
      var _countries = db.getCollection("countries");
      if (!_countries) {
        _countries = db.addCollection('countries');
         const countries =  await fetch(countriesJSON)
      .then(countries=>countries.json());
      
       await countries.forEach((c) => {
         
        _countries.insert(c);
        });
      }
     
      return _countries;
  
    } */
  
    useEffect(()=>{
     
  
       /* const init = async () =>{
       const countriesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json';
  
      const statesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json';
      const citiesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';
  
        try{
         //get country data from server
        const countriesfromServer = await initializeData(db,countriesJSON)
        setCountries(countriesfromServer.data);
       // console.log(countriesfromServer.data[0]);
  
         //get states data from server
        const statesfromServer = await initiateStates(db,statesJSON)
        setStates(statesfromServer.data);
       // console.log(statesfromServer.data[0]);
       //get cities data from server
        const citiesfromServer = await initiateCities(db,citiesJSON)
        setCities(citiesfromServer.data);
       // console.log(citiesfromServer.data[0]);
        }catch(err){
          console.log(err);
        }
      }
      
      init();
   */
      
       
      
     });
  
    
    const SignUp =()=>{
          
      const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/user/register`;
  
     
      const formData = new FormData();
     
      formData.append('name', username);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', repeatPassword);
     
   
      return post(url,  {
        username:username,
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
