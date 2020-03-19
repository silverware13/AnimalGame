/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Switch, Route, NavLink } from 'react-router-dom';

function Navbar(props) {

  const styleNavbar = css`

    .navbar {
      margin: 0;
      text-align: left;
      vertical-align: middle;
      width: 100%;
      height: 50px;
      background-color: #64785d;
    }

    .link-container {
      margin: 0;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      min-width: 100px;
      height: 50px;
      color: white;
      
      &:hover {
        background-color: #a2ae9d;
        color: #1e241b;
      }

    }

    .active-link-container {
      background-color: #a2ae9d;
      color: #1e241b;
    }

    .link-text {
      margin: 0;
      padding: 10px;
      text-align: center;
      vertical-align: middle;
      font-size: x-large;
      font-family: 'Muli', sans-serif;
    }

    .open-navdrawer-button {
      display: none;
    }

    .close-navdrawer-button {
      display: none;
    }

    @media (max-width: 768px) {

      .navbar {
        position: absolute;
        left: 0;
        top: 0;
        display: block-inline;
        margin: 0;
        text-align: left;
        vertical-align: middle;
        width: 0;
        height: 3200px;
        background-color: #1e241b;
        overflow-x: hidden;
        transition: 0.5s;
      }

      .navbar.active {
        width: 325px;
      }

      .open-navdrawer-button {
        display: block;
        font-size: 200%;
        margin: 5px;
        font-family: inherit;
        font-weight: bold;
        background-color: #a2ae9d;
        border: 0;
      }

      .close-navdrawer-button {
        position: absolute;
        top: 0;
        left: 265px;
        z-index: 50;
        display: block;
        margin: 5px;
        font-size: 300%;
        font-family: inherit;
        font-weight: bold;
        color: white;
        background-color: #1e241b;
        border: 0;
      }

      .link-text {
        text-align: left;
      }

      .link-container {
        width: 250px;
        text-align: left;
      }

      .left-bar {
        margin: 0;
        display: block;
        text-align: left;
      }

      .right-bar {
        margin: 0;
        display: block;
        text-align: left;
      }
    }

  `;

  function setActiveClass(state) {
    let element = document.getElementById("navbar-id");
    if(state) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }

  return (
    <div className="navbar-container" css={styleNavbar}>
      <button className="open-navdrawer-button" onClick={() => {setActiveClass(true)}}>
        &#x2630;
      </button>
      <nav className="navbar" id="navbar-id">
        <button className="close-navdrawer-button" onClick={() => {setActiveClass(false)}}> 
          &#x276E;
        </button>
          <NavLink to="/">
            <Switch>
              <Route exact path="/">
                <div className="link-container active-link-container">
                  <p className="link-text">Home</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Home</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
          <NavLink to="/Bird">
            <Switch>
              <Route path="/Bird">
                <div className="link-container active-link-container">
                  <p className="link-text">Bird</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Bird</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
          <NavLink to="/Cat">
            <Switch>
              <Route path="/Cat">
                <div className="link-container active-link-container">
                  <p className="link-text">Cat</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Cat</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
          <NavLink to="/Dog">
            <Switch>
              <Route path="/Dog">
                <div className="link-container active-link-container">
                  <p className="link-text">Dog</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Dog</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
          <NavLink to="/Fish">
            <Switch>
              <Route path="/Fish">
                <div className="link-container active-link-container">
                  <p className="link-text">Fish</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Fish</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
