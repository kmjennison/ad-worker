(function() {

  if (!window.Worker) {
    console.error('Browser does not support workers.');
    return;
  }

  // No config set, so don't fetch ads.
  if (!window.adWorker || !window.adWorker.config) {
    console.log('AdWorker config not set.');
    return;
  }

  var myWorker = new Worker('worker.js');

  // Handle messages from the worker.
  myWorker.onmessage = function(e) {
    switch (e.data.type) {

      case 'adResponse':
        var adResponse = e.data;
        renderAds(adResponse);
        break;

      case 'initConfirm':
        fetchAds();
        break;

      default:
        console.warn('Worker sent an unhandled message type.', e.data.type);
    }
  };

  // Send messages to the worker.
  function sendMessage(type, data) {
    console.log('Main: sending "' + type + '" with data:', data);
    myWorker.postMessage({
      type: type,
      data: data || {},
    });
  }

  function fetchAds() {
    sendMessage('fetchAds', adWorker.config);
  }

  function renderAds(adResponse) {
    if (!adResponse.data || !adResponse.data.ads) {
      console.log('No ad responses.');
      return;
    }
    for (var slotId in adResponse.data.ads) {
      var container = document.getElementById(slotId);
      container.innerHTML = adResponse.data.ads[slotId].ad;
    }
  }

  function clone(item) {
    return JSON.parse(JSON.stringify(item));
  }

  function pseudoDocumentObj() {
    return clone(window.document);
  }

  function pseudoWindowObj() {
    var partialWindow = {
      document: clone(window.document),
      location: clone(window.location),
    }
    partialWindow.top = partialWindow;
    return partialWindow;
  }

  function init() {
    sendMessage('init', {

      // Clone parts of the window and document objects that are
      // necessary for ad fetching.
      document: pseudoDocumentObj(),
      window: pseudoWindowObj(),
    });
  }

  init();

})();
