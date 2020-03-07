import React from 'react';
import { Global, css } from '@emotion/core';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Animal from './pages/Animal';
import Identify from './pages/Identify';
import {useState} from 'react';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet');
  @import url('https://fonts.googleapis.com/css?family=Goudy+Bookletter+1911" rel="stylesheet');
  body {
    font-family: 'Goudy Bookletter 1911', Georgia, Times, serif;
    color: white;
    margin: 0;

    background-color:#435052;
    background-image:
    radial-gradient(circle at 100% 150%, #435052 24%, #3c4749 24%, #3c4749 28%, #435052 28%, #435052 36%, #3c4749 36%, #3c4749 40%, transparent 40%, transparent),
    radial-gradient(circle at 0    150%, #435052 24%, #3c4749 24%, #3c4749 28%, #435052 28%, #435052 36%, #3c4749 36%, #3c4749 40%, transparent 40%, transparent),
    radial-gradient(circle at 50%  100%, #3c4749 10%, #435052 10%, #435052 23%, #3c4749 23%, #3c4749 30%, #435052 30%, #435052 43%, #3c4749 43%, #3c4749 50%, #435052 50%, #435052 63%, #3c4749 63%, #3c4749 71%, transparent 71%, transparent),
    radial-gradient(circle at 100% 50%, #3c4749 5%, #435052 5%, #435052 15%, #3c4749 15%, #3c4749 20%, #435052 20%, #435052 29%, #3c4749 29%, #3c4749 34%, #435052 34%, #435052 44%, #3c4749 44%, #3c4749 49%, transparent 49%, transparent),
    radial-gradient(circle at 0    50%, #3c4749 5%, #435052 5%, #435052 15%, #3c4749 15%, #3c4749 20%, #435052 20%, #435052 29%, #3c4749 29%, #3c4749 34%, #435052 34%, #435052 44%, #3c4749 44%, #3c4749 49%, transparent 49%, transparent);
    background-size: 50px 25px;
  }

  @keyframes gradient {
      0% {
          background-position: 0% 50%;
      }
      50% {
          background-position: 100% 50%;
      }
      100% {
          background-position: 0% 50%;
      }
  }
`;

function App() {

  const [highscore, setHighscore] = useState({
    bird: 0,
    cat: 0,
    dog: 0,
    fish: 0
  })

  return (
    <div>
      <Global styles={globalStyles} />
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/">
            <Home highscore={highscore} />
          </Route>
          <Route path="/:group/Identify">
            <Identify />
          </Route>
          <Route path="/:group">
            <Animal highscore={highscore} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
