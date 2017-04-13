
window.pbjs = {};
window.pbjs.que = [];
pbjs = window.pbjs;

importScripts('prebid.js');

// `fetcher` is our "exported" global variable.
var fetcher = {};

fetcher.fetchAds = function(callback) {

  // BROKEN: lots of bidders call `document.createElement` to load
  // scripts or create iframes, which is fundamentally at odds with the
  // inability to create DOM elements from web workers.

  // var adUnits = [{
  //   code: 'div-gpt-ad-1438287399331-0',
  //   sizes: [[300, 250], [300, 600]],
  //   bids: [{
  //       bidder: 'appnexus',
  //       params: { placementId: '4799418' }
  //     },
  //   ]
  // }];
  // pbjs.addAdUnits(adUnits);

  // pbjs.requestBids({

  //   // This callback gets triggered when all bids for this
  //   // ad unit come back. 
  //   bidsBackHandler: function(bidResponses) {
  //     callback(bidResponses)
  //   }
  // });

  var adResponse = {some: 'ad'};
  callback(adResponse);

};
