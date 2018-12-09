'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
  var CHEKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTO_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COORDINATE_Y_MIN = 130;
  var COORDINATE_Y_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOM_MAX = 5;
  var GUESTS_MIN = 2;
  var GUESTS_MAX = 5;
  var getRandomInt = function (min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomLengthArray = function (array) {
    shuffle(array);
    var RandomLengthArray = [];
    for (var i = 0; i < Math.ceil(Math.random() * array.length); i++) {
      RandomLengthArray[i] = array[i];
    }
    return RandomLengthArray;
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var randomNumber = Math.floor(Math.random() * (i + 1));
      var temporaryValue = array[i];
      array[i] = array[randomNumber];
      array[randomNumber] = temporaryValue;
    }
    return array;
  };

  var generateImg = function (index) {
    return 'img/avatars/user' + '0' + (index + 1) + '.png';
  };

  var generateData = function (amount) {
    var similarAdds = [];
    for (var i = 0; i < amount; i++) {
      var x = getRandomInt(0, MAP_WIDTH);
      var y = getRandomInt(COORDINATE_Y_MIN, COORDINATE_Y_MAX);

      similarAdds[i] = {
        'author': {
          'avatar': generateImg(i),
        },
        'offer': {
          'title': OFFER_TITLES.pop(),
          'address': x + ', ' + y,
          'price': getRandomInt(PRICE_MIN, PRICE_MAX),
          'type': getRandomArrayValue(TYPES_OF_ROOMS),
          'rooms': getRandomInt(1, ROOM_MAX),
          'guests': getRandomInt(GUESTS_MIN, GUESTS_MAX),
          'checkin': getRandomArrayValue(CHEKIN_CHECKOUT_TIME),
          'checkout': getRandomArrayValue(CHEKIN_CHECKOUT_TIME),
          'features': getRandomLengthArray(FEATURES),
          'description': '',
          'photos': shuffle(PHOTO_LINKS)
        },
        'location': {
          'x': x,
          'y': y
        },
      };
    }
    return similarAdds;
  };

  window.data = {
    COORDINATE_Y_MIN: COORDINATE_Y_MIN,
    COORDINATE_Y_MAX: COORDINATE_Y_MAX,
    MAP_WIDTH: MAP_WIDTH,
    generateData: generateData
  };
})();
