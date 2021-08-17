const fetch = require("node-fetch");
const geocode = async (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      address +
      ".json?access_token=pk.eyJ1IjoicmliaGFnb2VsIiwiYSI6ImNrc2E5NnFpYjAxY3kydnF1azF2eDlkNG0ifQ.MWU1BWmxA3jG243q7bCUyw&limit=1";
    const res = await fetch(url);

    if (res.ok) {
      const resJSON = await res.json();
      if (resJSON.features.length === 0) {
        callback('Place not found', undefined);
      } else {
        callback(undefined, {
          latitude: resJSON.features[0].center[0],
          longitude: resJSON.features[0].center[1],
          location: resJSON.features[0].place_name,
        });
      }
    } else {
      callback('Error in n/w connection', undefined);
    }
  };

  module.exports = geocode;