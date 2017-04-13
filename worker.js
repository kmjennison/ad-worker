onmessage = function(e) {
  switch (e.data.type) {
    case 'fetchAds':
      var config = e.data;
      console.log('Worker received request to fetch ads.', config);
      fetchAds(config);
      break;
    default:
      console.warn('Worker sent unhandled message type.', e.data.type);
  }
}

function mockAdResponse(config) {
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

function fetchAds(config) {
  var adResponse = mockAdResponse(config);
  postMessage({
    type: 'adResponse',
    data: adResponse,
  });
}
