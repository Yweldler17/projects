
import './App.css';
import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Gallery from './Gallery';
import Booking from './Booking';
import Contact from './Contact';
import logo from "./assets/images/cpnjLogo.PNG"
import backgroundImage from "./assets/images/homeBackground.jpg"



function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div className="logo">
            <img src={logo} alt="CPNJ Logo" />
          </div>
          <nav className="navigation">
            <ul>
              {/* <!--li><img src="media/images/cpnjLogo.PNG" alt="CPNJ Logo"></li--> */}
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Portfolio</Link></li>
              <li><Link to="/booking">Booking</Link></li>
              <li><a href="aboutUs.html">About</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>
      </div>
      <Switch>
        <Route path="/gallery">
          <Gallery />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <div id="homepageDiv">
          <img src={backgroundImage} alt="" />
          <h2 class="centered">Candid Photography NJ</h2>
        </div>
        <Redirect to="/" />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
