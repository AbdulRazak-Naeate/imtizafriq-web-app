
import React,{useState,useEffect} from 'react'
import { Tabs, Tab, TabPanel, TabList} from 'react-web-tabs';
import './styles.css';
import SlidesImage  from '../slidesimages/SlidesImage';
import SocialLinks from '../sociallinks/SocialLinks';
import Contacts from '../contacts/Contacts'
import axios,{ post } from 'axios';

const TabsPanel = () => {
 
  const [user]=useState(JSON.parse(localStorage.getItem('user')));
  const [slidesImages,setSlidesImages]=useState([]);
  const [base64EncodedImage,setBase64EncodedImage]=useState([])
  const[isSlidesLoaded,setIsSlidesLoaded]=useState(false);
  const[position,setPosition]=useState(0);


  useEffect(()=>{
    const loadSlides =async ()=>{
     try{
      const url =`/api/slides`
      await axios.get(url).then((response)=>{
           //console.log(response.data.slides[0].image);
           setSlidesImages(response.data.slides[0].image)
      })
     }catch(err){
       console.log(err)
     }
    }
    if (!isSlidesLoaded){
      loadSlides()
    }
    return ()=>{
      setIsSlidesLoaded(true)
    }
  })

 const handleImages=(Images,currentfile)=>{
        //setCurrrentFile(currentfile)
        console.log(currentfile)
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
       //setslidesImages(tmp);
     if (tmp.length>0 && currentfile != null){
     /*  updateSlides(currentfile).then((response)=>{
        console.log(response)
      }) */
      addAndUpdateSlides(base64EncodedImage).then((response)=>{
        console.log(response)
      })
     }
    }
    const  updateSlides =(currentfile)=>{
        
      const url = `/api/slides/`;
  
      const formData = new FormData();
  
      //append files to image to create an a file array
       formData.append('name', 'heroslide');
       formData.append('length',slidesImages.length);
       formData.append('position',position);

      //for (var i = 0; i <= slidesImages.length; i++) {
        formData.append('image', currentfile);
        //console.log(slidesImages);
     // }
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token':
            user.auth_token,
        },
      }
      return post(url, formData, config)
    
    };

    const addAndUpdateSlides = async (base64EncodedImage) => {
      try {
        const url = `/api/slides/`;
            const body ={
              name: 'heroslide',
              position:position,
              encodedimages: base64EncodedImage[0]
            }
         
          const config = {
            headers: {
              'Content-Type': 'application/json',
             
            },
          }
          return post(url, JSON.stringify(body), config)
          
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <div className='tabsPanelContainer'>
        <Tabs   defaultTab="one"
          onChange={(tabId) => { console.log(tabId) }}>
            <TabList className='tablist' >
            <Tab className='tab' tabFor="one">Slide</Tab>
            <Tab className='tab 'tabFor="two">Social Links</Tab>
            <Tab className='tab 'tabFor="three">Contact</Tab>
            
          </TabList>
          <TabPanel className='tab__panel' tabId="one">
          <div className="tabs__panel_content">
             <SlidesImage slidesImages={slidesImages} setSlidesImages={setSlidesImages}handleImages={handleImages} base64EncodedImage={base64EncodedImage} setPosition={setPosition}/>
             <div style={{width:'25%'}}></div>
            </div>  

         
          </TabPanel> <div style={{width:'25%'}}></div>
          <TabPanel className='tab__panel' tabId="two">
            <div className="tabs__panel_content">
                <SocialLinks/>
              <div style={{width:'25%'}}></div>
              </div>  
          
          </TabPanel>
          <TabPanel className='tab__panel' tabId="three">
            <div className="tabs__panel_content">
                <Contacts/>
              <div style={{width:'25%'}}></div>
              </div>  
          
          </TabPanel>
      
        </Tabs>
      
    </div>
  )
}

export default TabsPanel
