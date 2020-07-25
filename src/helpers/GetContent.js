import React, { useState } from 'react';
import axios from 'axios'
import GetNYTimes from './GetNYTimes'

function getContent(url) {

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  console.log('sending out', proxyUrl + url)

  let result;

  return new Promise(function (resolve) {
    axios.get(proxyUrl + url)
      .then((blob) => {

        // check for NY times
        if (blob.config.url.includes('nytimes.com')) {
          console.log('ny times detected')
          return [true, blob]
        }
      }).then((arr) => {
        if (arr[0] === true) {
          return GetNYTimes(arr[1])
        }
      }).then((response) => {
        result = response
        resolve(result)
      })
      .catch((e) => {
        console.error(e);
        resolve(e)
      });
  })


}

export default getContent;



 // https://www.nytimes.com/2020/04/04/opinion/sunday/coronavirus-trump-jared-kushner.html