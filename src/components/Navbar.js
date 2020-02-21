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
      background-color: #3B3B3B;
    }

    .left-bar {
      display: inline-block;
      margin: 0;
      text-align: left;
      vertical-align: middle;
      width: 50%;
    }

    .right-bar {
      display: inline-block;
      margin: 0;
      text-align: right;
      vertical-align: middle;
      width: 50%;
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
        background-color: #D3D3D3;
        color: #3B3B3B;
      }

    }

    .active-link-container {
      background-color: #D3D3D3;
      color: #3B3B3B;
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
        background-color: #3B3B3B;
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
        background-color: white;
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
        background-color: #3B3B3B;
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
        <div className="left-bar">
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
          <NavLink to="/news">
            <Switch>
              <Route exact path="/news">
                <div className="link-container active-link-container">
                  <p className="link-text">News</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">News</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
          <NavLink to="/about">
            <Switch>
              <Route exact path="/about">
                <div className="link-container active-link-container">
                  <p className="link-text">About</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">About</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
        </div>
        <div className="right-bar">
          <NavLink to="/login">
            <Switch>
              <Route exact path="/login">
                <div className="link-container active-link-container">
                  <p className="link-text">Identify</p>
                </div>
              </Route>
              <Route path="*">
                <div className="link-container">
                  <p className="link-text">Login</p>
                </div>
              </Route>
            </Switch>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
