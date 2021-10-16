import './store.css';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import QueryParams from '../../QueryParams';
import {patch} from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default function Store() {
    const query=QueryParams();

    
     const [store,setStore]=useState(JSON.parse(localStorage.getItem('store')));
     const [name,setName]=useState(store.name)
     const [email,setEmail]=useState(store.email)
     const [description,setDescription]=useState(store.description)
     const [phone,setPhone]=useState(store.phone)
     const [country,setCountry]=useState(store.country)
     const [state,setState]=useState(store.state)
     const [city,setCity]=useState(store.city)
     const [storeUpdated,setStoreUpdated]=useState(false);


     const handleUpdate=(e)=>{
        e.preventDefault();
        updateStore().then((response)=>{
            if(response.status===200){
                 setName(response.data.name)
                 setDescription(response.data.description);
                 setPhone(response.data.phone);
                 setEmail(response.data.email);
                 setCountry(response.data.country);
                 setState(response.data.state);
                 setCity(response.data.city);

                 Alert.success('update successfully', {
                    position: 'top-right',
                    effect: 'stackslide'
        
                }); 
                            
                setStoreUpdated(!storeUpdated)
               
           }else{
            Alert.error('update was unsuccessful', {
                position: 'top-right',
                effect: 'jelly'
    
            });
           }
           

        });
  }

  const updateStore =()=>{
     
    const url = `http://localhost:3001/api/stores/${store._id}`;
 
    const body={
             storeId:store._id,
             name:name,
             email:email,
             phone:phone,
             description:description,
             country:country,
             state:state,
             city:city
    }
    const config = {
        headers: {
            'auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwNjc4YWY2NzA3ZTI1YzAyODBiNmQiLCJpYXQiOjE2MjQyNzA3NjN9.YGbjKlP3gQTGY_-3Epsik8N6QCWmtTYrOABFm7Iu2fY',
          },
    }
    return patch(url, body,config)
  
  };
    useEffect(()=>{


        const fetchStore = async () => { //get specific Store
         try {
          const res = await fetch(`http://localhost:3001/api/stores/${store._id}`);
          const data = await res.json();
          return data;
         } catch (error) {
           console.log({fetch_store_message:error})
         }
        }
        const getStore = async () => {
            try {
             const storefromServer = await fetchStore();
             console.log(storefromServer)
            if (storefromServer.length >0){
                setStore(storefromServer)
            }
        
            } catch (error) {
              console.log({message:error})
            }
           };

           getStore();
        
          
    },[]);
  return (
    <div className="store">
        <Alert stack={{limit: 3}} />
      <div className="updateStoreTitle">
            <div className="storeTitleContainer">
                <h1 className="storeTitle">Edit Store Details</h1>
                <Link to="/dashboard/newStore">
                 <button className="storeAddButton">Create</button>
              </Link>
            </div>
            <div className="storeContainer">
                <div className="storeShow">
                    <div className="storeShowTop">
                        <img src={`http://localhost:3001/server/uploads/stores/${store.image[0].filename}`} alt="" className="storeShowImg" />
                       <div className="storeShowTopTitle">
                           <span className="storeShowstorename">{name}</span>
                           <span className="storeShowstoreTitle">{description}</span>
                       </div>
                    </div>
                    <div className="storeShowBottom">
                        <span className="storeShowTitle">Contact Details</span>
                        <div className="storeShowInfo">
                             <PhoneAndroid className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{phone}</span>
                        </div>
                        <div className="storeShowInfo">
                             <MailOutline className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{email}</span>
                        </div>
                        <div className="storeShowInfo">
                             <LocationSearching className="storeShowIcon"/>
                        <span className="storeShowInfoTitle">{`${country} , ${state} , ${city}`}</span>
                        </div>
                       </div>
                </div>
                <div className="storeUpdate"> 
                    <span className="storeUpdateTitle" >Edit</span>
                    <form  className="storeUpdateForm" onSubmit={handleUpdate}>
                    <div className="storeUpdateLeft">
                        <div className="storeUpdateItem">
                            <label>StoreName</label>
                            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="storeUpdateInput"/>
                        </div> 
                        
                        <div className="storeUpdateItem">
                            <label>Email</label>
                            <input type="text" className="storeUpdateInput" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>Description</label>
                            <textarea rows="3" value={description}  onChange={(e)=>{setDescription(e.target.value)}} className="storeUpdateTextarea"/>
                        </div>
                       
                        <div className="storeUpdateItem">
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="storeUpdateInput"/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>Country</label>
                            <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} className="storeUpdateInput"/>
                        </div>
                        <div className="storeUpdateItem">
                            <label>State</label>
                            <input type="text" value={state} onChange={(e)=>{setState(e.target.value)}}className="storeUpdateInput"/>
                        </div><div className="storeUpdateItem">
                            <label>City</label>
                            <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} className="storeUpdateInput"/>
                        </div>

                        </div> 
                    <div className="storeUpdateRight">
                        <div className="storeUpdateUpload">
                            <img src={`http://localhost:3001/server/uploads/stores/${store.image[0].filename}`} alt="" className="storeUpdateImg" />
                            <label htmlFor="file"> <Publish className="storeUpdateIcon"/> </label>
                                <input type="file" id="file" style={{display:"none"}}/>
                       </div>
                       <button className="storeUpDateButton">Update</button>
                    </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}


