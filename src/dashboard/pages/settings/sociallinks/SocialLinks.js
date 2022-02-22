/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import './style.css';
import axios from 'axios';
const SocialLinks = () => {
    const getbyValue = (arr,value)=>{
       console.log(arr)
        var result =arr.filter(function(o){  return o.name===value });
          try{
            console.log(result[0].linktext)
            return result ? result[0].linktext : '';

          }catch(err){
              console.log(err)
          }
    }
    const getVal =(medialinks,title)=>{
        console.log(medialinks[0])
      try{
        var obj=null;
        for (let i=0 ;i <=  medialinks.length;i++){
            if (medialinks[i].title===title){

                console.log(medialinks[i])
                obj=medialinks[i];
            }
        }
        return obj.linktext;
      }catch(err){
          console.log(err)
      }
    }
    const [medialinks,setMedialinks]=useState([])
    const [faceBook,setFaceBook]=useState('');
    const [twitter,setTwitter]=useState('');
    const [instagram,setInstagram]=useState(''); 
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
   


    const handleOnInstagramChange=(e)=>{
        setInstagram(e.target.value)
         updatelink();
    }
    const handleOnFacebookChange=(e)=>{
        setFaceBook(e.target.value)
         updatelink();
    }
    const handleOnTwitterChange=(e)=>{
        setTwitter(e.target.value)
         updatelink();
    }
    const updatelink = async ()=>{
        const medialinks = [{
                title:'Facebook',
                linktext:faceBook
            },
            {
                title:'Instagram',
                linktext:instagram
            },  {
                title:'Twitter',
                linktext:twitter
            },]
            
        
        const url=`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/socialmedialinks`

        await axios.post(url,{ linktype:'social',medialinks:JSON.stringify(medialinks)}).then((response)=>{
            //console.log(response)
            setMedialinks(response.data.socialmedialinks);
        })  
      }
      
    useEffect(()=>{
        const handlegetLinks = async ()=>{
            const url=`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/socialmedialinks`
    
            await axios.get(url).then((response)=>{
                console.log(response.data.socialmedialinks[0].medialinks[0].linktext);
                setMedialinks(response.data.socialmedialinks[0].medialinks);
              try{
                setFaceBook(response.data.socialmedialinks[0].medialinks[0].linktext)
                setTwitter(response.data.socialmedialinks[0].medialinks[1].linktext)
                setInstagram(response.data.socialmedialinks[0].medialinks[2].linktext)
                //getObjectbyValue(response.data.socialmedialinks,'Twitter')
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
    <div className='sociallink'>
        {

        }
       <form action="" className="social-media-link" onSubmit={handleSubmit}>
            <div className="social-media-link-item">
                <label>FaceBook</label>
                <input type="text" placeholder="www.facebook.com/#" value={faceBook} required onChange={(e)=>{handleOnFacebookChange(e)}}/>
            </div>
            <div className="social-media-link-item">
                <label>Twitter</label>
                <input type="text" placeholder="www.twitter.com/#" value={twitter} required onChange={(e)=>{handleOnTwitterChange(e)}}/>
            </div>
            <div className="social-media-link-item">
                <label>Instagram</label>
                <input type="text" placeholder="www.instagram.com/#" value={instagram} required onChange={(e)=>{handleOnInstagramChange(e)}}/>
            </div>
          

            
          {/*  <div className="social-media-link-item">
           <button className="newUserButton">Save</button>
           </div> */}
            </form>
    </div>
  )
}

export default SocialLinks
