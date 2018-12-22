'use strict';

(function () {
  var MAX_PINS = 5;

  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;

  var renderPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(pins.length, MAX_PINS); i++) {
      var pinItem = mapPinsTemplate.cloneNode(true);
      pinItem.style.left = pins[i]['location']['x'] - pinWidth / 2 + 'px';
      pinItem.style.top = pins[i]['location']['y'] + pinHeight + 'px';
      var pinImg = pinItem.querySelector('.map__pin img');
      pinImg.src = pins[i]['author']['avatar'];
      pinImg.alt = pins[i]['offer']['title'];

      fragment.appendChild(pinItem);
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    MAX_PINS: MAX_PINS
  };
})();
