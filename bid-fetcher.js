
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

importScripts('prebid.js');

// `fetcher` is our "exported" global variable.
var fetcher = {};

fetcher.fetchAds = function(callback) {

  // TODO  
  var adResponse = {some: 'ad'};
  callback(adResponse);
};
