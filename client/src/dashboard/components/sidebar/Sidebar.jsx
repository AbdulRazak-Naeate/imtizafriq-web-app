import React from 'react'
import './sidebar.css'
import { LineStyle,Timeline,TrendingUp
    ,PermIdentity,MailOutline,AttachMoney 
    ,Storefront,BarChart,DynamicFeed,
    ChatBubbleOutline,WorkOutline,Report,Settings} from '@material-ui/icons'
import { Link} from 'react-router-dom';

export const Sidebar = () => {
    
    return (
        <div className="sidebar">
         <div className="sidebarWrapper">
             <div className="sidebarMenu">
                 <h3 className="sidebarTitle">Dashboard</h3>
                 <ul className="sidebarList">
                     <Link to="/dashboard" className="sidebarlink">
                     <li className="sidebarListItem active">
                         <LineStyle className="sidebarIcon"/>
                         DashBoard
                     </li>
                     </Link><br/>
                    
                 </ul>
                {/*  <h3 className="sidebarTitle">Quick menu</h3> */}
                 <ul className="sidebarList">
                 
                     <Link to="/dashboard/products" className="sidebarlink">
                       <li className="sidebarListItem">
                         <Storefront className="sidebarIcon"/>
                         Products
                     </li> </Link>
                       <Link to="/dashboard/transactions" className="sidebarlink"> 
                       <li className="sidebarListItem">
                         <AttachMoney className="sidebarIcon"/>
                         Transactions
                     </li>
                       </Link>
                       <Link to="/dashboard/sales" className="sidebarlink"> 
                       <li className="sidebarListItem">
                         <TrendingUp className="sidebarIcon"/>
                         Sales
                     </li>
                       </Link>
                       <Link to="/dashboard/users" className="sidebarlink">
                     <li className="sidebarListItem">
                         <PermIdentity className="sidebarIcon"/>
                         Users
                     </li></Link>
                  
                       <Link to="/dashboard/settings" className="sidebarlink"> 
                       <li className="sidebarListItem">
                         <Settings className="sidebarIcon"/>
                         Settings
                        </li>
                       </Link>
                    {/*  <li className="sidebarListItem">
                         <BarChart className="sidebarIcon"/>
                         Reports
                     </li> */}
                 </ul>
               {/*   <h3 className="sidebarTitle">Notifications</h3>
                 <ul className="sidebarList">
                     <li className="sidebarListItem">
                         <MailOutline className="sidebarIcon"/>
                         Mail
                     </li>
                     <li className="sidebarListItem">
                         <DynamicFeed className="sidebarIcon"/>
                         FeedBack
                     </li>   <li className="sidebarListItem">
                         <ChatBubbleOutline className="sidebarIcon"/>
                         Messages
                     </li>
                 </ul>
                 <h3 className="sidebarTitle">Staff</h3>
                 <ul className="sidebarList">
                     <li className="sidebarListItem">
                         <WorkOutline className="sidebarIcon"/>
                         Home
                     </li>
                     <li className="sidebarListItem">
                         <Timeline className="sidebarIcon"/>
                         Analytics
                     </li>   <li className="sidebarListItem">
                         <Report className="sidebarIcon"/>
                         Reports
                     </li>
                 </ul> */}
             </div>
         </div>
          </div>
    )
}
