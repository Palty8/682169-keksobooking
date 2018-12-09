'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var pinMain = document.querySelector('.map__pin--main');

  var addressField = document.querySelector('#address');

  addressField.value = Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.floor(pinMain.offsetTop - pinMain.offsetHeight / 2);

  var typeField = document.querySelector('#type');

  var price = document.querySelector('#price');

  var typeFieldMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
  };

  var disableMap = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
  };

  typeField.onchange = function () {
    price.placeholder = typeFieldMap[typeField.options[typeField.selectedIndex].value];
  };

  addressField.disabled = true;

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var syncTime = function (firstSelect, secondSelect) {
    firstSelect.addEventListener('input', function () {
      secondSelect.value = firstSelect.value;
    });
  };

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var syncRoomsAndGuests = function (select) {
    select.addEventListener('input', function () {
      var capacityInt = parseInt(capacity.value, 10);
      var roomInt = parseInt(roomNumber.value, 10);
      if (capacityInt > roomInt && capacityInt > 0) {
        select.setCustomValidity('Количество гостей не должно превышать количество комнат');
      } else if (roomInt === 100 && capacityInt > 0) {
        select.setCustomValidity('100 комнат сдаются не для гостей');
      } else if (roomInt !== 100 && capacityInt === 0) {
        select.setCustomValidity('Выберите количество гостей');
      } else {
        roomNumber.setCustomValidity('');
        capacity.setCustomValidity('');
      }
    });
  };

  disableMap();
  syncTime(timeIn, timeOut);
  syncTime(timeOut, timeIn);
  syncRoomsAndGuests(roomNumber);
  syncRoomsAndGuests(capacity);

  window.form = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    pinMain: pinMain,
    addressField: addressField,
  };
})();
