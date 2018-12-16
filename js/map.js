'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;

  var isMapActive = false;

  var removeCards = function () {
    var carditems = document.querySelectorAll('.map__card');
    carditems.forEach(function (item) {
      item.remove();
    });
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var popupCloseOnClick = function (close) {
    close.addEventListener('click', function () {
      removeCards();
    });
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      removeCards();
    }
  });

  var mapPinOnClick = function (mapPin, pin) {
    mapPin.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        removeCards();
      }
      window.renderCard(pin);
    });
  };

  var showPins = function () {
    var pins = window.data.getPins();
    if (pins) {
      for (var i = 0; i < pins.length; i++) {
        if (!(pins[i].hasOwnProperty('offer'))) {
          pins.splice(pins[i], 1);
          i--;
        }
      }
      window.pin.renderPins(pins);
      var mapPins = document.querySelectorAll('.map__pin');
      for (var j = 0; j < pins.length; j++) {
        mapPinOnClick(mapPins[j + 1], pins[j]);
      }
    }
  };

  var activateMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var i = 0; i < window.form.adFormFieldsets.length; i++) {
      window.form.adFormFieldsets[i].disabled = false;
    }
    window.form.addressField.value = Math.floor(window.form.pinMain.offsetLeft + window.form.pinMain.offsetWidth / 2) + ', ' + Math.floor(window.form.pinMain.offsetTop - window.form.pinMain.offsetHeight / 2);
    showPins();
  };

  window.map = {
    popupCloseOnClick: popupCloseOnClick,
    activateMap: activateMap,
    showPins: showPins,
    isMapActive: isMapActive,
    removeCards: removeCards,
    removePins: removePins,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE
  };
})();

