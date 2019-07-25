//use to load information about beer/brewery/...
//Thanks Untappd !

import { Client_ID, Client_Secret } from '../Access_Token/Access_Token_Untappd'

export function getsBeersFromApiWithSearchedText (text) {
  console.log('====================================');
  console.log("Appel de Untappd API");
  console.log('====================================');
  const url ='https://api.untappd.com/v4/search/beer?client_id=' + Client_ID +'&client_secret=' + Client_Secret + '&q=' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getBeerDetailFromApi (BID) {
  console.log('====================================');
  console.log("Appel de Untappd API");
  console.log('====================================');
  return fetch('https://api.untappd.com/v4/beer/info/' + BID + '?&client_id=' + Client_ID + '&client_secret=' + Client_Secret)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
