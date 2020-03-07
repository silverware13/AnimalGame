/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
const random = require('random');
const shuffle = require('fisher-yates')

function Identify() {

  const {group} = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnimal, setCorrectAnimal] = useState("");
  const [buttonAnimals, setButtonAnimals] = useState(["", "", "", ""]);
  const key = "f88afdf32072ce175c0cd9dcdec38def";
  
  const birdTypes = ["Sparrow", "Owl", "Robin", "Pigeon", "Duck", "Goose",
    "Eagle", "Hummingbird", "Finch", "Chicken", "Turkey", "Parrot", "Canary", 
    "Dove", "Toucan", "Quail", "Heron", "Roadrunner", "Cardinal", "Gull", "Albatross",
    "Willet"];

  const catTypes = ["Persian", "Ragdoll", "Maine Coon", "Siamese", "American Shorthair",
    "Burmese", "Himalayan", "Exotic Shorthair", "Russian Blue", "Savannah", "Scottish Fold",
    "Sphynx", "Bengal", "Manx"];

  const dogTypes = ["Husky", "Labrador", "Bulldog", "Pomeranian", "Pug", "Shiba Inu", "Golden Retriever",
    "German Shepherd", "Poodle", "Chihuahua", "Beagle", "Rottweiler", "Maltese", "Dachshund",
    "Dobermann", "Chow Chow", "Shih Tzu", "Great Dane", "Newfoundland", "Corgi", "St. Bernard",
    "Greyhound", "Border Collie", "Boston Terrier", "Dalmatian"];

  const fishTypes = ["Yellow Tang", "Clownfish", "Butterflyfish", "Lionfish", "Seahorse",
    "Eel", "Pufferfish", "Angelfish", "Parrotfish", "Swordfish"];

  const style = css`
    
    & {
      margin: auto;
      width: 50%;
      padding: 50px;
      text-align: center;
    }

    h1 {
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
    }

    #guess-image {
      margin: auto;
      height: 400px;
      border-radius: 30px;
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
          console.log("Photo array size:", photosLength, " (", photoIndex + 1,")");
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
        animals = shuffle(birdTypes);
        break;
      case "Cat":
        animals = shuffle(catTypes);
        break;
      case "Dog":
        animals = shuffle(dogTypes);
        break;
      case "Fish":
        animals = shuffle(fishTypes);
        break;
      default:
        animals = shuffle(birdTypes);
    }
    fetchImage(animals);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, group]);

  // whenever the animal group changes reset the score
  useEffect(() => {
    setScore(0);
  }, [group]);

  function guess(animal) {
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
    <div css={style}>
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

export default Identify;
