import React,{useState} from 'react'
import { Tabs, Tab, TabPanel, TabList} from 'react-web-tabs';
import './styles.css';
import SlidesImage  from '../slidesimages/SlidesImage'

const TabsPanel = () => {

  const [slidesImages,setSlidesImages]=useState([]);


 const handleImages=(Images)=>{
        let tmp=[];
       Images.map((item)=>{
          tmp.push(item)
         // console.log(tmp);
          return null
       })
       //setProductImages(tmp);
    }
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
