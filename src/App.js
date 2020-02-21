import React from 'react';
import { Global, css } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import News from './pages/News';
import About from './pages/About';
import Identify from './pages/Identify';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Muli');
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
  }
`;

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Identify />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
