/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { NavLink } from 'react-router-dom';
import bird from "../silhouettes/bird.png";
import cat from "../silhouettes/cat.png";
import dog from "../silhouettes/dog.png";
import fish from "../silhouettes/fish.png";
import { useParams } from 'react-router-dom';

function Animal(props) {

  const {group} = useParams();
  const groupLowercase = group.toLowerCase();

  const style = css`

    & {
      margin: auto;
      width: 50%;
      padding: 50px;
      text-align: center;
    }

    .animal-column {
      display: inline-block;
      text-align: center;
    }

    .silhouette {
      max-height: 150px;
    }

    #score {
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
      background: #A9707F;
      border: 2px solid #b07c85;
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

    .animal-function-button {
      display: block;
      min-width: 300px;
      background-color: #64785d;
      border: 2px solid #73856d;
      border-radius: 30px;
      color: white;
      padding: 15px 32px;
      text-align: center;
      font-size: 16px;
      margin: 25px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
      text-decoration: none;
      cursor: pointer;
    }

    a {
      text-decoration: none;
    }

  `;

  let image;
  switch(group) {
    case "Bird":
      image = <img className={"silhouette"} src={bird} alt={`${group}`} />;
      break;
    case "Cat":
      image = <img className={"silhouette"} src={cat} alt={`${group}`} />;
      break;
    case "Dog":
      image = <img className={"silhouette"} src={dog} alt={`${group}`} />;
      break;
    case "Fish":
      image = <img className={"silhouette"} src={fish} alt={`${group}`} />;
      break;
    default:
      image = <img className={"silhouette"} alt={"Silhouette"} />;
  }

  let score;
  switch(group) {
    case "Bird":
      score = <div id={"score"}>{props.highscore.bird}</div>;
      break;
    case "Cat":
      score = <div id={"score"}>{props.highscore.cat}</div>;
      break;
    case "Dog":
      score = <div id={"score"}>{props.highscore.dog}</div>;
      break;
    case "Fish":
      score = <div id={"score"}>{props.highscore.fish}</div>;
      break;
    default:
      score = <div id={"score"}>?</div>;
  }

  return (
    <div css={style}>
      <div className={"animal-column"}>
        <h1>{group}</h1>
        {image}
        <h3>High-score</h3>
        {score}
        <NavLink to={`/${group}/Identify`}>
          <button className="animal-function-button">
            Play identify {groupLowercase} game
          </button>
        </NavLink>
        <NavLink to={`/${group}/Search`}>
          <button className="animal-function-button">
            View {groupLowercase} images
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Animal;
