'use strict';

(function () {
  var TypeFieldMap = {
    'BUNGALO': '0',
    'FLAT': '1000',
    'HOUSE': '5000',
    'PALACE': '10000',
    'DEFAULT': '0'
  };

  var pinMainStartCoords = {
    X: 570,
    Y: 375
  };

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersSelects = document.querySelector('.map__filters').querySelectorAll('select');
  var featuresFilter = document.querySelector('.map__features').querySelectorAll('input');
  var pinMain = document.querySelector('.map__pin--main');
  var resetBtn = document.querySelector('.ad-form__reset');
  var addressField = document.querySelector('#address');
  var typeField = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  addressField.value = Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.floor(pinMain.offsetTop - pinMain.offsetHeight / 2);
  addressField.readOnly = true;
  price.min = TypeFieldMap['DEFAULT'];

  var disableMap = function () {
    Array.prototype.forEach.call(adFormFieldsets, function (field) {
      field.disabled = true;
    });
    Array.prototype.forEach.call(mapFiltersSelects, function (select) {
      select.value = 'any';
      select.disabled = true;
    });
  };

  typeField.onchange = function () {
    price.placeholder = TypeFieldMap[typeField.options[typeField.selectedIndex].value];
    price.min = TypeFieldMap[typeField.options[typeField.selectedIndex].value];
  };

  var syncTime = function (firstSelect, secondSelect) {
    firstSelect.addEventListener('input', function () {
      secondSelect.value = firstSelect.value;
    });
  };

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
    window.map.removeCards();
    window.map.removePins();
    pinMain.style.left = pinMainStartCoords.X + 'px';
    pinMain.style.top = pinMainStartCoords.Y + 'px';
    disableMap();
    window.map.isMapActive = false;
    Array.prototype.forEach.call(featuresFilter, function (feature) {
      feature.checked = false;
    });
  };

  var showSuccessMsg = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMsg = successTemplate.cloneNode(true);
    main.appendChild(successMsg);
    successMsg.addEventListener('click', function () {
      successMsg.remove();
      document.removeEventListener('keydown', onSuccessMsgEscPress);
    });
    document.addEventListener('keydown', onSuccessMsgEscPress);
  };

  var onSuccessMsgEscPress = function (evt) {
    var successMsg = document.querySelector('.success');
    if (evt.keyCode === window.map.ESCAPE_KEYCODE) {
      successMsg.remove();
    }
    document.removeEventListener('keydown', onSuccessMsgEscPress);
  };

  var showErrorMsg = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMsg = errorTemplate.cloneNode(true);
    var errBtn = errorMsg.querySelector('.error__button');
    main.appendChild(errorMsg);

    errorMsg.addEventListener('click', function () {
      errorMsg.remove();
      document.removeEventListener('keydown', onErorrMsgEscPress);
    });

    errBtn.addEventListener('click', function () {
      errorMsg.remove();
      document.removeEventListener('keydown', onErorrMsgEscPress);
    });
    document.addEventListener('keydown', onErorrMsgEscPress);
  };

  var onErorrMsgEscPress = function (evt) {
    var errorMsg = document.querySelector('.error');
    if (evt.keyCode === window.map.ESCAPE_KEYCODE) {
      errorMsg.remove();
    }
    document.removeEventListener('keydown', onErorrMsgEscPress);
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
    mapFiltersSelects: mapFiltersSelects,
    pinMain: pinMain,
    addressField: addressField,
    showErrorMsg: showErrorMsg,
    showErrorGettingData: showErrorGettingData
  };
})();
