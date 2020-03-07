/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { NavLink } from 'react-router-dom';
import bird from "../silhouettes/bird.png";
import cat from "../silhouettes/cat.png";
import dog from "../silhouettes/dog.png";
import fish from "../silhouettes/fish.png";

function Home(props) {

  const style = css`

    & {
      margin: 50px auto;
    }

    .animal-column {
      display: inline-block;
      text-align: center;
      width: 25%;
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

    .animal-select-button {
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

  `;

  return (
    <div css={style}>
      <div className={"animal-column"}>
        <h1>Bird</h1>
        <img className={"silhouette"} src={bird} alt={"bird"} />
        <h3>High-score</h3>
        <div id={"score"}>{props.highscore.bird}</div>
        <NavLink to="/Bird">
          <button className="animal-select-button">
            Bird Homepage
          </button>
        </NavLink>
      </div>
      <div className={"animal-column"}>
        <h1>Cat</h1>
        <img className={"silhouette"} src={cat} alt={"cat"} />
        <h3>High-score</h3>
        <div id={"score"}>{props.highscore.cat}</div>
        <NavLink to="/Cat">
          <button className="animal-select-button">
            Cat Homepage
          </button>
        </NavLink>
      </div>
      <div className={"animal-column"}>
        <h1>Dog</h1>
        <img className={"silhouette"} src={dog} alt={"dog"} />
        <h3>High-score</h3>
        <div id={"score"}>{props.highscore.dog}</div>
        <NavLink to="/Dog">
          <button className="animal-select-button">
            Dog Homepage
          </button>
        </NavLink>
      </div>
      <div className={"animal-column"}>
        <h1>Fish</h1>
        <img className={"silhouette"} src={fish} alt={"fish"} />
        <h3>High-score</h3>
        <div id={"score"}>{props.highscore.fish}</div>
        <NavLink to="/Fish">
          <button className="animal-select-button">
            Fish Homepage
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
