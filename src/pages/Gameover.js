/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {useParams} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {useEffect} from 'react';

function GameOver(props) {

  const {group} = useParams();

  const style = css`
    
    & {
      margin: auto;
      width: 75%;
      padding: 50px;
      text-align: center;
    }

    h1 {
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
    }

    .button-option {
      min-width: 300px;
      background-color: #64785d;
      border: 2px solid #73856d;
      border-radius: 30px;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 6px 6px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }

    #score , #highscore {
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
      background: #799ca2;
      border: 2px solid #87aeb5;
      color: white;
      margin: 25px auto;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      font-size: 50px;
      line-height: 100px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
      text-align: center;
    }

    #highscore {
      background: #A9707F;
      border: 2px solid #b07c85;
    }

    .score-container {
      display: inline-block;
      margin: 0 25px;
    }

    #guess-image {
      overflow: hidden;
      margin: auto;
      width: auto;
      height: 400px;
      border-radius: 30px;
    }

    @media (max-width: 768px) {
      #guess-image {
        overflow: hidden;
        margin: auto;
        width: 100%;
        height: auto;
        border-radius: 30px;
      }
    }

  `;

  // if the score is higher than the high-score,
  // then update high-score
  useEffect(() => {
    switch(group) {
      case "Bird":
        if (props.score > props.highscore.bird) {
          props.onNewHighscore(props.score, group);
        }
        break;
      case "Cat":
        if (props.score > props.highscore.cat) {
          props.onNewHighscore(props.score, group);
        }
        break;
      case "Dog":
        if (props.score > props.highscore.dog) {
          props.onNewHighscore(props.score, group);
        }
        break;
      case "Fish":
        if (props.score > props.highscore.fish) {
          props.onNewHighscore(props.score, group);
        }
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.highscore, props.score]);

  let highscore;
  switch(group) {
    case "Bird":
      highscore = <div id={"highscore"}>{props.highscore.bird}</div>;
      break;
    case "Cat":
      highscore = <div id={"highscore"}>{props.highscore.cat}</div>;
      break;
    case "Dog":
      highscore = <div id={"highscore"}>{props.highscore.dog}</div>;
      break;
    case "Fish":
      highscore = <div id={"highscore"}>{props.highscore.fish}</div>;
      break;
    default:
      highscore = <div id={"highscore"}>?</div>;
  }

  return (
    <div css={style}>
      <img id={"guess-image"} src={props.image} alt="Animal" />
      <h1>Game Over</h1>
      <h2>The correct answer was {props.correctAnimal}</h2>
      <div>
        <div className={"score-container"}>
          <h3>Your score</h3>
          <div id={"score"}>{props.score}</div>
        </div>
        <div className={"score-container"}>
          <h3>High-score</h3>
          {highscore}
        </div>
      </div>
      <button className="button-option" onClick={() => props.onReset()}>
        Try again
      </button>
      <NavLink to={`/${group}`}>
        <button className="button-option">
          Quit
        </button>
      </NavLink>
    </div>
  );
}

export default GameOver;
