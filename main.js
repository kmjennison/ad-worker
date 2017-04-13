(function() {

if (window.Worker) {

  // No config set, so don't fetch ads.
  if (!window || !window.adWorker || !window.adWorker.config) {
    console.log('AdWorker config not set.');
    return;
  }

  var myWorker = new Worker('worker.js');

  // Tell the worker to fetcha ads.
  myWorker.postMessage({
    type: 'fetchAds',
    data: adWorker.config,
  });

  // Handle messages from the worker.
  myWorker.onmessage = function(e) {
    switch (e.data.type) {
      case 'adResponse':
        var adResponse = e.data;
        console.log('Worker sent ad response:', adResponse);
        renderAds(adResponse);
        break;
      default:
        console.warn('Worker sent unhandled message');
    }
  };

} else {
  console.error('Browser does not support workers.');
}

function renderAds(adResponse) {
  if (!adResponse.data || !adResponse.data.ads) {
    console.log('No ad responses.');
    return;
  }
  for (var slotId in adResponse.data.ads) {
    var container = document.getElementById(slotId);
    container.innerHTML = adResponse.data.ads[slotId].ad;
    console.log(container);
  }
}

})();