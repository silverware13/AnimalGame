/** @jsx jsx */

import {css, jsx} from "@emotion/core";
import {useEffect, useState} from "react";

function Identify() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const key = "f88afdf32072ce175c0cd9dcdec38def";
  const secret = "a72b00f22fead75e";
  const birdTypes = [""]

  const styleHeader = css`
    margin: 20px 10px 20px 10px;
  `;

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    
    setLoading(true);
    try {

      const getUrl = `https://api.flickr.com/services/rest/?method=` +
      `flickr.photos.search&api_key=${key}&tags=bird,sparrow&tag_mode=all&` +
      `per_page=500&media=photos&format=json&nojsoncallback=1`;

      const results = await fetch(getUrl);

      if (results.ok) {
        // pick an image from the results
        const obj = await results.json();
        const photosLength = obj.photos.photo.length;
        const photo = obj.photos.photo[Math.floor(Math.random() * photosLength)];
        const photoUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/` +
          `${photo.id}_${photo.secret}.jpg`
        setImage(photoUrl);
      } else {
        // we got a bad status code. Show the error
        //const obj = await results.json();
        console.log(results);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div css={styleHeader}>
      <img src={image} alt="Guess this animal" />
      <h1>Identify</h1>
    </div>
  );
}

export default Identify;
