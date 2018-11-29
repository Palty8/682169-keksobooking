'use strict';

var typeMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

var RoomFormMap = {
  '1': 'комната',
  '2': 'комнаты',
  '3': 'комнаты',
  '4': 'комнаты',
  '5': 'комнат',
  'default': 'комнаты'
};

var PIN_COUNT = 8;
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
var PIN_HEIGHT = document.querySelector('.map__pin').offsetHeight;
var PIN_WIDTH = document.querySelector('.map__pin').offsetWidth;

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

var addTextContentType = function (type) {
  type.textContent = typeMap[type];
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

var activateMap = function () {
  document.querySelector('.map').classList.remove('.map--faded');
};

var renderPins = function (pins) {
  var mapPins = document.querySelector('.map__pins');
  var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
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

var renderCard = function (pin) {
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardItem = mapCardTemplate.cloneNode(true);

  var offerTitle = cardItem.querySelector('.popup__title');
  offerTitle.textContent = pin['offer']['title'];

  var offerAddress = cardItem.querySelector('.popup__text--address');
  offerAddress.textContent = pin['offer']['address'];

  var offerPrice = cardItem.querySelector('.popup__text--price');
  offerPrice.textContent = pin['offer']['price'] + ' ₽/ночь';

  var offerType = cardItem.querySelector('.popup__type');
  addTextContentType(offerType);

  var accommodation = cardItem.querySelector('.popup__text--capacity');
  var room = pin['offer']['rooms'];
  var guest = pin['offer']['guests'];

  var roomForm = RoomFormMap[room] !== undefined ? RoomFormMap[room] : RoomFormMap['default'];
  accommodation.textContent = room + ' ' + roomForm + ' для ' + guest + ' гостей';

  var checkInCheckOutTime = cardItem.querySelector('.popup__text--time');
  checkInCheckOutTime.textContent = 'Заезд после ' + pin['offer']['checkin'] + ', выезд до ' + pin['offer']['checkout'];

  var description = cardItem.querySelector('.popup__description');
  description.textContent = pin['offer']['description'];

  var convenienceList = cardItem.querySelector('.popup__features');

  while (convenienceList.hasChildNodes()) {
    convenienceList.removeChild(convenienceList.firstChild);
  }

  for (var i = 0; i < pin['offer']['features'].length; i++) {
    var convenienceItem = document.createElement('li');
    convenienceItem.classList.add('popup__feature');

    if (pin['offer']['features'][i] === 'wifi') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    } else if (pin['offer']['features'][i] === 'dishwasher') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    } else if (pin['offer']['features'][i] === 'washer') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    } else if (pin['offer']['features'][i] === 'elevator') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    } else if (pin['offer']['features'][i] === 'conditioner') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    } else if (pin['offer']['features'][i] === 'parking') {
      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
    }

    convenienceItem.textContent = pin['offer']['features'][i];

    convenienceList.appendChild(convenienceItem);
  }

  var photosBlock = cardItem.querySelector('.popup__photos');
  var photoWidth = photosBlock.querySelector('.popup__photo').getAttribute('width');
  var photoHeight = photosBlock.querySelector('.popup__photo').getAttribute('height');
  var photoAlt = photosBlock.querySelector('.popup__photo').getAttribute('alt');

  for (var j = 0; j < pin['offer']['photos'].length; j++) {
    var photoItem = document.createElement('img');
    photoItem.src = pin['offer']['photos'][j];
    photoItem.classList.add('popup__photo');
    photoItem.width = photoWidth;
    photoItem.height = photoHeight;
    photoItem.alt = photoAlt;
    photosBlock.appendChild(photoItem);
  }
  photosBlock.removeChild(photosBlock.children[0]);

  var avatar = cardItem.querySelector('.popup__avatar');
  avatar.src = pin['author']['avatar'];

  var mapFilter = document.querySelector('.map__filters-container');

  map.insertBefore(cardItem, mapFilter);
};

var initMap = function () {
  var pins = generateData(PIN_COUNT);
  activateMap();
  renderPins(pins);
  renderCard(pins[0]);
};

initMap();


