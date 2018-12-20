'use strict';

(function () {
  var PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;
  var PIN_WIDTH = document.querySelector('.map__pin').offsetWidth;
  var MAX_PINS = 5;

  var renderPins = function (pins) {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(pins.length, MAX_PINS); i++) {
      var pinItem = mapPinsTemplate.cloneNode(true);
      pinItem.style.left = pins[i]['location']['x'] - PIN_WIDTH / 2 + 'px';
      pinItem.style.top = pins[i]['location']['y'] + PIN_HEIGHT + 'px';
      var pinImg = pinItem.querySelector('.map__pin img');
      pinImg.src = pins[i]['author']['avatar'];
      pinImg.alt = pins[i]['offer']['title'];

      fragment.appendChild(pinItem);
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    PIN_WIDTH: PIN_WIDTH,
    MAX_PINS: MAX_PINS
  };
})();
