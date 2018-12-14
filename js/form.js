'use strict';

(function () {
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var pinMain = document.querySelector('.map__pin--main');
  var resetBtn = document.querySelector('.ad-form__reset');
  var addressField = document.querySelector('#address');
  var typeField = document.querySelector('#type');
  var price = document.querySelector('#price');
  addressField.value = Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.floor(pinMain.offsetTop - pinMain.offsetHeight / 2);

  var typeFieldMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
  };

  var pinMainStartCoords = {
    x: 570,
    y: 375
  };

  var disableMap = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
  };

  typeField.onchange = function () {
    price.placeholder = typeFieldMap[typeField.options[typeField.selectedIndex].value];
  };

  addressField.readOnly = true;

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

  var resetPage = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.map.hideCards();
    window.map.hidePins();
    pinMain.style.left = pinMainStartCoords.x + 'px';
    pinMain.style.top = pinMainStartCoords.y + 'px';
    disableMap();
    window.map.isMapActive = false;
  };

  var showSuccessMsg = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMsg = successTemplate.cloneNode(true);
    main.appendChild(successMsg);

    successMsg.addEventListener('click', function () {
      successMsg.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESCAPE_KEYCODE) {
        successMsg.classList.add('hidden');
      }
    });
  };

  var showErrorMsg = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMsg = errorTemplate.cloneNode(true);
    var errBtn = errorMsg.querySelector('.error__button');
    main.appendChild(errorMsg);


    errorMsg.addEventListener('click', function () {
      errorMsg.classList.add('hidden');
    });

    errBtn.addEventListener('click', function () {
      errorMsg.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESCAPE_KEYCODE) {
        errorMsg.classList.add('hidden');
      }
    });
  };

  var showErrorGettingData = function () {
    showErrorMsg();
    document.querySelector('.error__message').textContent = 'Ошибка при получении данных';
  };

  resetBtn.addEventListener('click', function () {
    resetPage();
  });

  adForm.addEventListener('submit', function (evt) {
    window.backend.sendData(new FormData(adForm), showSuccessMsg, showErrorMsg);
    evt.preventDefault();
    resetPage();
  });

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
    showErrorMsg: showErrorMsg,
    showErrorGettingData: showErrorGettingData
  };
})();
