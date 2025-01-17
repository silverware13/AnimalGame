/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageSpinner from '../components/PageSpinner';
import GameOver from './GameOver';
const random = require('random');
const shuffle = require('fisher-yates');

function Identify(props) {

  const {group} = useParams();
  const [gameCount, setGameCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnimal, setCorrectAnimal] = useState("");
  const [buttonAnimals, setButtonAnimals] = useState(["", "", "", ""]);
  const key = "f88afdf32072ce175c0cd9dcdec38def";

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

    .button-guess {
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

    #score {
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

  // find a new image whenever the score updates
  useEffect(() => {

    async function fetchImage(animals) {
    
      setLoading(true);
      try {
  
        // select the correct and incorrect animals
        setCorrectAnimal(animals[0]);
        setButtonAnimals(shuffle([animals[0], animals[1], animals[2], animals[3]]));
  
        const getUrl = `https://api.flickr.com/services/rest/?method=` +
        `flickr.photos.search&api_key=${key}&tags=${group},${animals[0]}&tag_mode=all&` +
        `per_page=100&media=photos&format=json&nojsoncallback=1`;
  
        const results = await fetch(getUrl);
        
        if (results.ok) {
          // randomly select an image from the results
          const obj = await results.json();
          const photosLength = obj.photos.photo.length;
          const photoIndex = random.int(0, photosLength - 1);
          const photo = obj.photos.photo[photoIndex];
           const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/` +
            `${photo.id}_${photo.secret}.jpg`
          setImage(photoUrl);
        } else {
          // we got a bad status code. Show the error
          console.log("Error, could not get photo.");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);

    }

    let animals = [];
    switch(group) {
      case "Bird":
        animals = shuffle(props.birdTypes);
        break;
      case "Cat":
        animals = shuffle(props.catTypes);
        break;
      case "Dog":
        animals = shuffle(props.dogTypes);
        break;
      case "Fish":
        animals = shuffle(props.fishTypes);
        break;
      default:
        animals = shuffle(props.birdTypes);
    }
    fetchImage(animals);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, group, gameCount]);

  // whenever the animal group changes reset the score
  useEffect(() => {
    setScore(0);
  }, [group]);

  function guess(animal) {
    if(!loading) {
      if(animal === correctAnimal) {
        setScore(score + 1);
      } else {
        setGameOver(true);
      }
    }
  }

  function handleReset() {
    setGameCount(gameCount + 1);
    setScore(0);
    setGameOver(false);
  }

  if(gameOver) {
    return (
      <GameOver score={score} correctAnimal={correctAnimal} 
        highscore={props.highscore} image={image} onReset={() => handleReset()}
        onNewHighscore={(score, group) => props.onNewHighscore(score, group)} />
    );
  } else {
    return (
      <div css={style}>
        <PageSpinner loading={loading}/>
        <img id={"guess-image"} src={image} alt="Guess this animal" />
        <h1>Identify this {group}</h1>
        <div id={"score"}>{score}</div>
        <div className="button-box">
          <button className="button-guess" onClick={() => guess(buttonAnimals[0])}>
            {buttonAnimals[0]}
          </button>
          <button className="button-guess" onClick={() => guess(buttonAnimals[1])}>
            {buttonAnimals[1]}
          </button>
        </div>
        <div className="button-box">
          <button className="button-guess" onClick={() => guess(buttonAnimals[2])}>
            {buttonAnimals[2]}
          </button>
          <button className="button-guess" onClick={() => guess(buttonAnimals[3])}>
            {buttonAnimals[3]}
          </button>
        </div>
      </div>
    );
  }

}
export default Identify;
