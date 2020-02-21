/** @jsx jsx */

import {css, jsx} from "@emotion/core";
import {useEffect, useState} from "react";

function Identify() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnimal, setCorrectAnimal] = useState("");
  const [wrongAnimals, setWrongAnimals] = useState(["", "", ""]);
  const [buttonAnimals, setButtonAnimals] = useState(["", "", "", ""]);
  const key = "f88afdf32072ce175c0cd9dcdec38def";
  const birdTypes = ["Sparrow", "Owl", "Robin", "Pigeon", "Duck", "Goose",
    "Eagle", "Hummingbird", "Finch", "Chicken", "Turkey", "Parrot", "Canary", 
    "Dove", "Toucan", "Quail", "Heron", "Roadrunner", "Cardinal", "Gull", "Albatross",
    "Willet"];
    const catTypes = ["Tiger", "Lion", "Lynx", "Cheetah"];
    const dogTypes = ["Husky", "Labrador", "Bulldog", "Pomeranian"];
    const fishTypes = ["Koi", "Goldfish", "Carp", "Bass"];

  const styleHeader = css`
    margin: auto;
    width: 50%;
    padding: 50px;
    text-align: center;

    #guess-image {
      margin: auto;
    }

    .button-guess {
      min-width: 300px;
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
  `;

  useEffect(() => {

    async function fetchImage(animals) {
    
      setLoading(true);
      try {
  
        // select the correct and incorrect animals
        setCorrectAnimal(animals[0]);
        setWrongAnimals([animals[1], animals[2], animals[3]]);
        setButtonAnimals(shuffle([animals[0], animals[1], animals[2], animals[3]]));
  
        const getUrl = `https://api.flickr.com/services/rest/?method=` +
        `flickr.photos.search&api_key=${key}&tags=bird,${animals[0]}&tag_mode=all&` +
        `per_page=100&media=photos&format=json&nojsoncallback=1`;
  
        const results = await fetch(getUrl);
  
        if (results.ok) {
          // randomly select an image from the results
          const obj = await results.json();
          const photosLength = obj.photos.photo.length;
          const photo = obj.photos.photo[Math.floor(Math.random() * photosLength)];
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

    // randomly get four types of an animal
    const animals = shuffle(birdTypes);
    fetchImage(animals);

  }, [score]);

  function shuffle(array) {
    const newArray = array.slice().sort(() => Math.random() - 0.5);
    return newArray;
  }

  function guess(animal) {
    console.log(animal);
    if(!loading) {
      if(animal === correctAnimal) {
        setScore(score + 1);
      } else {
        setScore(0);
        alert(`Correct answer was ${correctAnimal}`);
      }
    }
  }

  return (
    <div css={styleHeader}>
      <img id={"guess-image"} src={image} alt="Guess this animal" />
      <h1>Identify this Bird</h1>
      <h2>Score: {score}</h2>
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

export default Identify;
