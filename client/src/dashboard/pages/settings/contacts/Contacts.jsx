import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './style.css';
const Contact = () => {
    const [contacts,setContacts]=useState([])
    const [phone,setphone]=useState('');
    const [email,setemail]=useState('');
    const [islinksloaded,setIslinksLoaded]=useState(false);

    const handleSubmit=(e)=>{
       e.preventDefault();
       //createNewUser(e)
    };
    const getObjectbyValue =(obj,name)=>{
        var result =obj.filter(obj => {
            console.log(obj)
            return  obj.name===name
        });
    }  
   

    const handleOnphoneChange=(e)=>{
        setphone(e.target.value)
         updateContact();
    }
    const handleOnemailChange=(e)=>{
        setemail(e.target.value)
         updateContact();
    }
    const updateContact = async ()=>{
        const contacts = [{
                title:'phone',
                contacttext:phone
            },
           {
                title:'email',
                contacttext:email
            },]
            
        
        const url=`/api/contacts`

        await axios.post(url,{ contacttype:'support',contacts:JSON.stringify(contacts)}).then((response)=>{
            //console.log(response)
            setContacts(response.data.socialcontacts);
        })  
      }
      
    useEffect(()=>{
        const handlegetLinks = async ()=>{
            const url=`/api/contacts`
    
            await axios.get(url).then((response)=>{
                console.log(response.data.contacts[0].contacts[0]);
                setContacts(response.data.contacts[0].contacts);
              try{
                setphone(response.data.contacts[0].contacts[0].contacttext)
                setemail(response.data.contacts[0].contacts[1].contacttext)
               
              }catch(err){
                  console.log(err)
              }
            })
        }

        if (!islinksloaded){
           handlegetLinks();
        }
        return ()=>{
            setIslinksLoaded(true)
        }
    })
  return (
    <div className='contactContainer'>
       <form action="" className="contact" onSubmit={handleSubmit}>
            <div className="contact-item">
                <label>phone</label>
                <input type="text" placeholder="+2330548496121" value={phone} required onChange={(e)=>{handleOnphoneChange(e)}}/>
            </div>
            <div className="contact-item">
                <label>email</label>
                <input type="text" placeholder="example@email.com" value={email} required onChange={(e)=>{handleOnemailChange(e)}}/>
            </div>
        
            
          {/*  <div className="contact-item">
           <button className="newUserButton">Save</button>
           </div> */}
            </form>
    </div>
  )
}

export default Contact
