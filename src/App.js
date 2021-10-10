import {BrowserRouter as Router,Switch,Route
} from "react-router-dom";
import  Dashboard from './dashboard/Dashboard'
import './App.css';
import LogIn from "./pages/login/LogIn";
import SignUp from './pages/signup/SignUp';
import Topbar from './components/topbar/Topbar';
function App() {

  return (
       <Router>
       
       <Switch>
       <Route path="/" exact>
           <Topbar/>
        <Switch>

        </Switch> 
         </Route>
         <Route path="/login">
           <LogIn/>
         </Route>
          <Route path="/signup">
           <SignUp/>
         </Route>
         <Route path="/dashboard">
            <Dashboard/>
         </Route>
       </Switch>
       </Router>
  );
}

export default App;
