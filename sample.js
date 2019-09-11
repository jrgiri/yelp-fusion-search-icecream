'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'IxsHkHKxhXv2J9ijKnc3FKoL-HjpdvhmL6819Q2byKAHx47xM5UIIJnH_QL2hU8JYFyFWpE2WQPOGOfKCTfGd9H-Nu0AZLOrRcG0Kk6iIOVLTFu6ZA3Zaqu9peR3XXYx';

const searchRequest = {
  term: 'ice cream',
  location: 'Alpharetta, GA'
};

const client = yelp.client(apiKey);
let arr = [];

async function yelp_fusion() {
  await client.search(searchRequest).then(async response => {
    const firstResult = response.jsonBody.businesses;

    for (let i = 0; i < firstResult.length; i++) {

      let obj = { "business name": firstResult[i].name, "business address": firstResult[i].location.display_address };

      await client.reviews(`${firstResult[i].alias}`).then(async response => {
        let temp_arr = [];

        for (let j = 0; j < response.jsonBody.reviews.length; j++) {
          temp_arr.push({ "text": response.jsonBody.reviews[j].text, "name": response.jsonBody.reviews[j].user.name });
        }
        obj.reviews = temp_arr
      }).catch(error => {
        console.log(error);
      });
      arr.push(obj);
      // console.log("obj=====================",obj)

      if (i == 4) {
        break;
      }
    }
    // console.log(arr)
    const prettyJson = JSON.stringify(arr, " ", 4);
    console.log(prettyJson);
  }).catch(error => {
    console.log(error);
  });
}
yelp_fusion();