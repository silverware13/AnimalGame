/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageSpinner from '../components/PageSpinner';

function Search(props) {

  const {group} = useParams();
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);
  console.log(breeds);
  const [images, setImages] = useState([]);
  const key = "f88afdf32072ce175c0cd9dcdec38def";

  const style = css`
    
    & {
      margin: auto;
      width: 75%;
      padding: 50px;
      text-align: center;
    }

    h1 {
      margin: 20px 0;
      font-family: 'Raleway', Helvetica, Arial, sans-serif;
    }

    #select-container {
      width: 50%;
      margin: 0 auto;
      padding: 10px;
      background-color: #64785d;
    }

    #animal-types-select {
      display:inline-block;
      width: 80%;
      margin: 20px 0;
      border-radius: 0.5rem;
      padding: 1rem 1rem;
      font-size: large;
    }

  `;

  // show photos of the currently selected animal
  /*
  useEffect(() => {

    async function fetchImage(animals) {
    
      setLoading(true);
      try {
  
        // select the correct and incorrect animals
  
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
  }, [score, group, gameCount]);
*/

  // whenever the animal group changes reset the list of breeds
  useEffect(() => {
    switch(group) {
      case "Bird":
        setBreeds(props.birdTypes.sort());
        break;
      case "Cat":
        setBreeds(props.catTypes.sort());
        break;
      case "Dog":
        setBreeds(props.dogTypes.sort());
        break;
      case "Fish":
        setBreeds(props.fishTypes.sort());
        break;
      default:
        setBreeds(props.birdTypes.sort());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  return (
    <div css={style}>
      <PageSpinner loading={loading}/>

      <div id="select-container">
        <h1>Select Breed</h1>
        <select id="animal-types-select">
          {breeds.map((breed, index) =>
              <option value={breed}>
                {breeds[index]}
              </option>
            )
          }
        </select>
      </div>

      {images.map((image) =>
          <img id={"animal-image"} src={image} alt="Animal" />
        )
      }

    </div>
  );

}

export default Search;
