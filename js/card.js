'use strict';

(function () {
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

  var addTextContentType = function (type) {
    type.textContent = typeMap[type];
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

      convenienceItem.classList.add('popup__feature--' + pin['offer']['features'][i]);
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

    var cardChildren = cardItem.children;

    Array.prototype.forEach.call(cardChildren, function (child) {
      if (child === '') {
        child.classList.add('hidden');
      }
    });

    var mapFilter = document.querySelector('.map__filters-container');

    map.insertBefore(cardItem, mapFilter);

    var popupClose = document.querySelectorAll('.popup__close');

    Array.prototype.forEach.call(popupClose, function (closeBtn) {
      window.map.popupCloseOnClick(closeBtn);
    });
  };

  window.renderCard = renderCard;
})();
