
var mockAds = true;

var window;
var document;
var initialized = false;

onmessage = function(e) {
  var data = e.data.data;
  switch (e.data.type) {

    case 'init':

      // Set pseudoclones of window objects. These are needed for header
      // bidding.
      window = data.window;
      document = data.document;

      // Load the header bidding wrapper.
      importScripts('bid-fetcher.js');

      initialized = true;
      sendMessage('initConfirm');

    case 'fetchAds':
      if (!initialized) {
        console.error('Worker not initialized.');
        return;
      }
      var config = e.data;

      mockAds ? fetchMockAds() : fetchAds(config);
      break;

    default:
      console.warn('Worker received an unhandled message type.', e.data.type);
  }
}

function sendMessage(type, data={}) {
  console.log('Worker: sending "' + type + '" with data:', data);
  postMessage({
    type: type,
    data: data,
  });
}

function mockAdResponse() {
  return {
    ads: {
      'div-gpt-ad-1464385742501-0': {
        ad: '<div><img src="http://goinkscape.com/wp-content/uploads/2015/07/leaderboard-ad-final.png"</img></div>',
      },
      'div-gpt-ad-1464385677836-0': {
        ad: '<div><img src="http://www.guardyourhealth.com/wp-content/uploads/2013/07/300x250_GYH_WebBanner.jpg"</img></div>',
      },
    }
  }
}

function fetchMockAds() {
  var adResponse = mockAdResponse();
  sendAdResponse(adResponse);
}

function sendAdResponse(adResponse) {
  sendMessage('adResponse', adResponse);
}

function fetchAds(config) {
  console.log('Fetching ads from bidder.');
  fetcher.fetchAds(function(adResponse) {
    console.log('Ad response:', adResponse);
  });
}
