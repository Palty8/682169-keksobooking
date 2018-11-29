'use strict';

var typeMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

var PIN_COUNT = 8;

// функции для генерации рандомов

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

var popValue = function (array) {
  return array.pop();
};

var generateImgs = function (amount) {
  var imgs = [];
  for (var j = 0; j < amount; j++) {
    imgs[j] = 'img/avatars/user' + '0' + (j + 1) + '.png';
  }
  return imgs;
};

// много повторений строчек с textContent, вынес в отдельные функции

var addTextContentType = function (type) {
  type.textContent = typeMap[type];
};

var addTextContentFeature = function (element, feature) {
  element.textContent = feature;
};

// пошла движуха. Генирирую массив с 8 объектами

var generateData = function (amount) {
  var mapWidth = document.querySelector('.map').offsetWidth;
  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
    'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var typesOfRooms = ['palace', 'flat', 'house', 'bungalo'];
  var checkInCheckOutTimeValues = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photoLinks = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var avatars = generateImgs(8);
  var similarAdds = [];
  for (var i = 0; i < amount; i++) {
    var x = getRandomInt(0, mapWidth);
    var y = getRandomInt(130, 630);

    similarAdds[i] = {
      'author': {
        'avatar': popValue(avatars)
      },

      'offer': {
        'title': popValue(offerTitles),
        'address': x + ', ' + y,
        'price': getRandomInt(1000, 1000000),
        'type': getRandomArrayValue(typesOfRooms),
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(2, 5),
        'checkin': getRandomArrayValue(checkInCheckOutTimeValues),
        'checkout': getRandomArrayValue(checkInCheckOutTimeValues),
        'features': getRandomLengthArray(features),
        'description': '',
        'photos': shuffle(photoLinks)
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
  // нахожу атрибуты метки, чтобы она указывала на нужное место острым концом, а не левым верхним углом

  var pinHeight = document.querySelector('.map__pin').offsetHeight;
  var pinWidth = document.querySelector('.map__pin').offsetWidth;

  // копирую шаблон, создаю фрагмент

  var mapPins = document.querySelector('.map__pins');
  var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  // создаю метки

  for (var i = 0; i < pins.length; i++) {
    var pinItem = mapPinsTemplate.cloneNode(true);
    pinItem.style.left = pins[i]['location']['x'] - pinWidth / 2 + 'px';
    pinItem.style.top = pins[i]['location']['y'] + pinHeight + 'px';
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

  // отрисовываю заголовок, адрес, цену, тип, размещение

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

  // не придумал как уйти от if-else

  if (room === 1) {
    accommodation.textContent = room + ' комната для ' + guest + ' гостей';
  } else if (room === 5) {
    accommodation.textContent = room + ' комнат для ' + guest + ' гостей';
  } else {
    accommodation.textContent = room + ' комнаты для ' + guest + ' гостей';
  }

  // чек-ин, чек-аут, описание
  var checkInCheckOutTime = cardItem.querySelector('.popup__text--time');
  checkInCheckOutTime.textContent = 'Заезд после ' + pin['offer']['checkin'] + ', выезд до ' + pin['offer']['checkout'];

  var description = cardItem.querySelector('.popup__description');
  description.textContent = pin['offer']['description'];

  // копировал список, удалил пустые li
  var convenienceList = cardItem.querySelector('.popup__features');

  while (convenienceList.hasChildNodes()) {
    convenienceList.removeChild(convenienceList.firstChild);
  }

  // создаю свои li
  for (var i = 0; i < pin['offer']['features'].length; i++) {
    var convenienceItem = document.createElement('li');
    convenienceItem.classList.add('popup__feature');

    // Запись снизу была в 2 раза больше, удалось таки часть вынести в отдельную функцию.
    // Не придумал как можно вынести еще добавление БЭМовских классов

    if (pin['offer']['features'][i] === 'wifi') {
      convenienceItem.classList.add('popup__feature--wifi');
    } else if (pin['offer']['features'][i] === 'dishwasher') {
      convenienceItem.classList.add('popup__feature--dishwasher');
    } else if (pin['offer']['features'][i] === 'washer') {
      convenienceItem.classList.add('popup__feature--washer');
    } else if (pin['offer']['features'][i] === 'elevator') {
      convenienceItem.classList.add('popup__feature--elevator');
    } else if (pin['offer']['features'][i] === 'conditioner') {
      convenienceItem.classList.add('popup__feature--conditioner');
    } else if (pin['offer']['features'][i] === 'parking') {
      convenienceItem.classList.add('popup__feature--parking');
    }

    addTextContentFeature(convenienceItem, pin['offer']['features'][i]);

    convenienceList.appendChild(convenienceItem);
  }

  var photosBlock = cardItem.querySelector('.popup__photos');
  var photoWidth = photosBlock.querySelector('.popup__photo').getAttribute('width');
  var photoHeight = photosBlock.querySelector('.popup__photo').getAttribute('height');
  var photoAlt = photosBlock.querySelector('.popup__photo').getAttribute('alt');

  // генерация фоток
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

  // замена аватара
  var avatar = cardItem.querySelector('.popup__avatar');
  avatar.src = pin['author']['avatar'];

  // вставка карточки
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


