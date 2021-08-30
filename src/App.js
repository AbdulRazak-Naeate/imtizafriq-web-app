import logo from './logo.svg';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{greetings}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
