'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;

  var isMapActive = false;

  var removeCards = function () {
    var carditems = document.querySelectorAll('.map__card');
    carditems.forEach(function (item) {
      item.remove();
      document.removeEventListener('keydown', onEscPress);
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
      removeActivePinLight();
      removeCards();
    });
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      removeActivePinLight();
      removeCards();
    }
  };

  var removeActivePinLight = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var mapPinOnClick = function (mapPin, pin) {
    mapPin.addEventListener('click', function () {
      removeActivePinLight();
      mapPin.classList.add('map__pin--active');
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        removeCards();
      }
      window.renderCard(pin);
      document.addEventListener('keydown', onEscPress);
    });
  };

  var showPins = function (pins) {
    if (pins) {
      for (var i = 0; i < pins.length; i++) {
        if (!(pins[i].hasOwnProperty('offer'))) {
          pins.splice(pins[i], 1);
          i--;
        }
      }
      window.pin.renderPins(pins);
      var mapPins = document.querySelectorAll('.map__pin');
      for (var j = 0; j < Math.min(pins.length, window.pin.MAX_PINS); j++) {
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
    Array.prototype.forEach.call(window.form.mapFiltersSelects, function (select) {
      select.disabled = false;
    });
    window.form.addressField.value = Math.floor(window.form.pinMain.offsetLeft + window.form.pinMain.offsetWidth / 2) + ', ' + Math.floor(window.form.pinMain.offsetTop - window.form.pinMain.offsetHeight / 2);
  };

  window.map = {
    popupCloseOnClick: popupCloseOnClick,
    activateMap: activateMap,
    showPins: showPins,
    isMapActive: isMapActive,
    removeCards: removeCards,
    removePins: removePins,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
  };
})();

