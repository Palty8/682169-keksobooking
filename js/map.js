'use strict';

(function () {
  var ESCAPE_KEYCODE = 27;
  var PIN_COUNT = 8;

  var hideCards = function () {
    var carditems = document.querySelectorAll('.map__card');
    for (var i = 0; i < carditems.length; i++) {
      carditems[i].classList.add('hidden');
    }
  };

  var popupCloseOnClick = function (close) {
    close.addEventListener('click', function () {
      hideCards();
    });
  };
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      hideCards();
    }
  });

  var mapPinOnClick = function (mapPin, pin) {
    mapPin.addEventListener('click', function () {
      window.renderCard(pin);
    });
  };

  var showPins = function () {
    var pins = window.data.generateData(PIN_COUNT);
    window.renderPins(pins);
    var mapPins = document.querySelectorAll('.map__pin');
    for (var j = 0; j < pins.length; j++) {
      mapPinOnClick(mapPins[j + 1], pins[j]);
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
    activateMap: activateMap
  };
})();

