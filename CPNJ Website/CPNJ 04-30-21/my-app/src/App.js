import './App.css';
import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Gallery from './Gallery';
import logo from "./assets/images/cpnjLogo.PNG"



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
              <li><a href="index.html">Home</a></li>
              <li><Link to="/gallery">Portfolio</Link></li>
              <li><a href="events.html">Booking</a></li>
              <li><a href="aboutUs.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
        </header>
      </div>
      <Switch>
        <Route path="/gallery">
          <Gallery />
        </Route>
        {/* <Route path="/blog/:blogId">
          <Blog />
        </Route> */}
        <Redirect to="/" />
      </Switch>
      <div>
        <footer>
          <p>
            copyright CandindPhotographyNJ
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
