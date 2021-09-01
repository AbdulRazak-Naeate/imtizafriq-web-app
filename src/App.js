import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard'
import './App.css';
import {useState} from 'react';

function App() {

     const[name,setName]=useState('')
     const[greetings,setGreetings]=useState('');

     const handleChange=(e)=>{
        setName(e.target.value)
     }
     const handleSubmit = (e) =>{
       e.preventDefault()
       fetch(`/api/greeting?name=${name}`)
       .then(response => response.json())
     }

  return (
       <Router>
       <Switch>
       <Route path="/" exact>
           Home
         </Route>
         <Route path="/dashboard">
            <Dashboard/>
         </Route>
       </Switch>
       </Router>
  );
}

export default App;
