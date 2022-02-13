import React,{useState,useEffect} from 'react'
import { Tabs, Tab, TabPanel, TabList} from 'react-web-tabs';
import './styles.css';
import SlidesImage  from '../../pages/settings/slidesimages/SlidesImage'
import axios,{ post } from 'axios';

const TabsPanel = () => {
 
  const [user]=useState(JSON.parse(localStorage.getItem('user')));
  const [slidesImages,setSlidesImages]=useState([]);
  const[isSlidesLoaded,setIsSlidesLoaded]=useState(false);
 // const[images,setImages]=useState([])
  useEffect(()=>{
    const loadSlides =async ()=>{
      const url =`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/slides/`
      await axios.get(url).then((response)=>{
           console.log(response.data.slides[0].image);
           setSlidesImages(response.data.slides[0].image)
      })
    }
    if (!isSlidesLoaded){
      loadSlides()
    }
    return ()=>{
      setIsSlidesLoaded(true)
    }
  })

 const handleImages=(Images)=>{
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
       //setslidesImages(tmp);
     if (tmp.length>0)(
      updateSlides().then((response)=>{
        console.log(response)
      })
     )
    }
    const  updateSlides =()=>{
        
      const url = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/slides/`;
  
      const formData = new FormData();
  
      //append files to image to create an a file array
       formData.append('name', 'slide');
      formData.append('length',slidesImages.length);

      for (var i = 0; i <= slidesImages.length; i++) {
        formData.append('image', slidesImages[i]);
        //console.log(slidesImages);
      }
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token':
            user.auth_token,
        },
      }
      return post(url, formData, config)
    
    };

  return (
    <div className='tabsPanelContainer'>
        <Tabs   defaultTab="one"
          onChange={(tabId) => { console.log(tabId) }}>
            <TabList className='tablist' >
            <Tab className='tab' tabFor="one">Slide</Tab>
            <Tab className='tab 'tabFor="two">Social Links</Tab>
            
          </TabList>
          <TabPanel className='tab__panel' tabId="one">
          <SlidesImage slideImages={slidesImages} handleImages={handleImages}/>
          </TabPanel>
          <TabPanel className='tab__panel' tabId="two">
         
         Two
          </TabPanel>
      
        </Tabs>
      
    </div>
  )
}

export default TabsPanel
