/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react';
import FormInput from './CustomTextField';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { Grid,Select,Button, InputLabel, Typography, MenuItem } from '@material-ui/core';
import countriesjon from '../../dashboard/world-db/countries.json'
var loki = require('lokijs');


const AddressForm = ({checkoutToken,next}) => {
    const methods=useForm();
    const {register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const [countries,setCountries]=useState([]);
    const [country,setCountry]=useState(0);
    const [countrylabel,setCountryLabel]=useState('');
    const [states,setStates]=useState([]);
    const [state,setState]=useState('');
    const [statelabel,setStateLabel]=useState('');
    const [cities,setCities]=useState([]);
    const [city,setCity]=useState('');
    const [citylabel,setCityLabel]=useState('');
    const [orderNumber,setOrderNumber]=useState('');
    const _db = new loki('csc.db');
    const[db]=useState(_db);

    
  const onCountryChange =(e)=>{
    let countryColl = db.getCollection("countries");
    // console.log(statesColl.data)
     
    var cid=e.target.value;
    let country= countryColl.find({id: parseInt(cid) });
      console.log(country[0].name)
    setCountry(cid);
    setCountryLabel(country[0].name)
     filterStates(cid,db);
  }
  const onStateChange=(e)=>{
    let stateColl = db.getCollection("states");
    var cid=e.target.value;
    let city= stateColl.find({id: parseInt(cid) });
    setState(cid)
    setStateLabel(city[0].name);
    filterCities(cid,db);
  }
  const onCityChange=(e)=>{
    let citiesColl = db.getCollection("cities");
    
    var sid=e.target.value;
    let city= citiesColl.find({id: parseInt(sid) });
    setCityLabel(city[0].name)
      setCity(sid)
  }
  const filterStates = async(cid,db)=> {
    let statesColl = db.getCollection("states");
   // console.log(statesColl.data)
    let states = await statesColl.find({ country_id: parseInt(cid) });
        setStates(states);
  
  }
  const filterCities = async(sid,db)=> {
    let citiesColl = db.getCollection("cities");
    console.log(citiesColl.data)
    let cities = await citiesColl.find({ state_id: parseInt(sid) });
        setCities(cities);
  
  }
    useEffect(()=>{
      const  initializeCountries  = async (db,countriesJSON)  => {
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
        const init = async () =>{
            const countriesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json';
            const statesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json';
            const citiesJSON = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json';
       try{
             //get country data from server
          const countriesfromServer = await initializeCountries(db,countriesJSON)
          setCountries(countriesfromServer.data);
          console.log("countries "+countriesfromServer)

            //get states data from server
      const statesfromServer = await initiateStates(db,statesJSON)
      setStates(statesfromServer.data);
     // console.log(statesfromServer.data[0]);
     //get cities data from server
      const citiesfromServer = await initiateCities(db,citiesJSON)
      setCities(citiesfromServer.data);
     // console.log(citiesfromServer.data[0]);
       }catch(err){
         
       }


      }
      
      const uniqueOrderNumber= ()=> {//Unique Identifier
      var result           = '';
     // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var characters       = '0123456789';
  
      var charactersLength = characters.length;
      for ( var i = 0; i < 8; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      console.log(result);
      setOrderNumber(result)
      return result;
    }
    uniqueOrderNumber()
      init();
    },[db]);
    
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
          <form onSubmit = {handleSubmit((data) =>{ 
            next({...data,countrylabel,statelabel,citylabel,orderNumber})
            }) } >
            <Grid container spacing={3}>
                <FormInput name='firstName'  label='First name' register={register}/>
                <FormInput name='lastName'   label='Last name' register={register}/>
                <FormInput name='address1'   label='Address' register={register}/>
                <FormInput name='email'    label='Email' register={register} />
                <FormInput name='phone' label='Phone' register={register}/>
                <FormInput name='zip'   label='Zip/Postal code' register={register}/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={country} name="country" fullWidth onChange={onCountryChange}>
                    {countries.map((c)=>(
                       <MenuItem key={c.id} value={c.id}>
                            {c.name}
                       </MenuItem>
                   ))}
                   </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping State</InputLabel>
                    <Select value={state}  fullWidth onChange={onStateChange}>
                    {states.map((s)=>(
                       <MenuItem key={s.id} value={s.id}>
                            {s.name}
                       </MenuItem>
                   ))}
                   </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping City</InputLabel>
                    <Select value={city}  fullWidth onChange={onCityChange}>
                    {cities.map((c)=>(
                       <MenuItem key={c.id} value={c.id}>
                            {c.name}
                       </MenuItem>
                   ))}
                   </Select>
                </Grid>
            </Grid>
            <br/>
              <div style={{display:'flex',justifyContent:'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
            </>
  )
}

export default AddressForm
