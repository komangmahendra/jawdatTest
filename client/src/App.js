import React from 'react';
import './App.css';
import Navbar from './components/NavbarHome'
import Home from './views/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Details from './components/Details';

function App() {
  return (
    <>
     <Router>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/details/:ip/:port" component={Details} />
     </Router>
      
    </>
  );
}

export default App;
