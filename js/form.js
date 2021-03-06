'use strict';

(function () {
  var TypeFieldMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
    'default': '0'
  };

  var PinMainStartCoords = {
    X: 570,
    Y: 375
  };

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersSelects = document.querySelector('.map__filters').querySelectorAll('select');
  var mapFiltersFeaturesFieldset = document.querySelector('#housing-features');
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
  var addressFieldTailValue = Math.floor(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.floor(pinMain.offsetTop + pinMain.offsetHeight);

  addressField.value = addressFieldTailValue;
  addressField.readOnly = true;
  price.min = TypeFieldMap['default'];

  var disableMap = function () {
    Array.prototype.forEach.call(adFormFieldsets, function (field) {
      field.disabled = true;
    });
    Array.prototype.forEach.call(mapFiltersSelects, function (select) {
      select.value = 'any';
      select.disabled = true;
    });
    mapFiltersFeaturesFieldset.disabled = true;
  };

  var setPriceAttr = function () {
    price.placeholder = TypeFieldMap[typeField.options[typeField.selectedIndex].value];
    price.min = TypeFieldMap[typeField.options[typeField.selectedIndex].value];
  };

  typeField.onchange = function () {
    setPriceAttr();
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
    pinMain.style.left = PinMainStartCoords.X + 'px';
    pinMain.style.top = PinMainStartCoords.Y + 'px';
    addressField.value = addressFieldTailValue;
    disableMap();
    window.map.isMapActive = false;
    Array.prototype.forEach.call(featuresFilter, function (feature) {
      feature.checked = false;
    });
    setPriceAttr();
    window.avatar.resetAvatar();
    window.photos.resetPhotoForm();
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
    mapFiltersFeaturesFieldset: mapFiltersFeaturesFieldset,
    pinMain: pinMain,
    addressField: addressField,
    showErrorMsg: showErrorMsg,
    showErrorGettingData: showErrorGettingData
  };
})();
