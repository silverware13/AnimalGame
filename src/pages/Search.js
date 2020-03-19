/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageSpinner from '../components/PageSpinner';

function Search(props) {

  const {group} = useParams();
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");
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

    .animal-image {
      overflow: hidden;
      margin: auto;
      height: 400px;
      max-width: 400px;
      border-radius: 30px;
    }

    .image-container {
      display: inline-block;
      padding: 50px;
      width: 400px;
    }

  `;

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


  // load new images when a new breed is selected
  useEffect(() => {

    if (currentBreed !== "") {
      fetchImages(group, currentBreed);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBreed]);

  async function fetchImages(group, currentBreed) {
  
    setLoading(true);

    try {

      const getUrl = `https://api.flickr.com/services/rest/?method=` +
      `flickr.photos.search&api_key=${key}&tags=${group},${currentBreed}&tag_mode=all&` +
      `per_page=99&media=photos&format=json&nojsoncallback=1`;

      const results = await fetch(getUrl);
      
      if (results.ok) {

        // set the images to show
        const obj = await results.json();
        const photos = obj.photos.photo;
        let photoUrls = [];

        for (const element of photos) {
          photoUrls.push(`https://farm${element.farm}.staticflickr.com/${element.server}/` +
            `${element.id}_${element.secret}.jpg`);
        }

        setImages(photoUrls);

      } else {
        // we got a bad status code. Show the error
        console.log("Error, could not get photo.");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  }

  // set the current breed when it is selected 
  function handleSelectChange() {
    const select = document.getElementById("animal-types-select");
    const newBreed = select.value;
    setCurrentBreed(newBreed);
  }

  return (
    <div css={style}>
      <PageSpinner loading={loading}/>

      <div id="select-container">
        <h1>Select Breed</h1>
        <select id="animal-types-select" defaultValue={""}
          onChange={() => handleSelectChange()}>
          <option value="" disabled hidden>Select a breed...</option>
          {breeds.map((breed, index) =>
              <option key={breed} value={breed}>
                {breeds[index]}
              </option>
            )
          }
        </select>
      </div>

      {images.map((image) =>
          <div className={"image-container"}>
            <img key={image} className={"animal-image"} src={image}
              alt="Animal" />
          </div>
        )
      }

    </div>
  );

}

export default Search;
