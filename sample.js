'use strict';

const yelp = require('yelp-fusion');
const rp = require('request-promise');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'IxsHkHKxhXv2J9ijKnc3FKoL-HjpdvhmL6819Q2byKAHx47xM5UIIJnH_QL2hU8JYFyFWpE2WQPOGOfKCTfGd9H-Nu0AZLOrRcG0Kk6iIOVLTFu6ZA3Zaqu9peR3XXYx';

const searchRequest = {
  term: 'ice cream',
  location: 'Alpharetta, GA'
};

const client = yelp.client(apiKey);
let arr = [];

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses;

  console.log(firstResult.length)
  for (let i = 1; i < firstResult.length; i++) {

    const searchRequest2 = {
      alias: `${firstResult[i].alias}`
    };

    client.search(searchRequest2).then(response2 => {
      console.log("response2====",response2.jsonBody.businesses)
    }).catch(e => {
      console.log(e);
    });
    arr.push(firstResult[i]);
    if (i == 5) {
      break;
    }
  }

  const prettyJson = JSON.stringify(arr, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});