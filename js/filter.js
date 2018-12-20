'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  var featuresFieldset = filterForm.querySelector('#housing-features');

  var getFilteredValue = function (ad, value, key) {
    if (value === 'any') {
      return true;
    }
    return ad.offer[key] === Number(value);
  };

  var featureValidator = function (ad, value, key) {
    if (value) {
      return ad.offer.features.indexOf(key) >= 0;
    }
    return true;
  };

  var filters = [
    {
      key: 'guests',
      element: filterForm.querySelector('#housing-guests'),
      validate: getFilteredValue
    },
    {
      key: 'rooms',
      element: filterForm.querySelector('#housing-rooms'),
      validate: getFilteredValue
    },
    {
      key: 'type',
      element: filterForm.querySelector('#housing-type'),
      validate: function (ad, value, key) {
        if (value === 'any') {
          return true;
        }
        return ad.offer[key] === value;
      }
    },
    {
      key: 'price',
      element: filterForm.querySelector('#housing-price'),
      validate: function (ad, value, key) {
        if (value === 'low') {
          return ad.offer[key] < 10000;
        }
        if (value === 'middle') {
          return ad.offer[key] >= 10000 && ad.offer[key] < 50000;
        }
        if (value === 'high') {
          return ad.offer[key] >= 50000;
        }
        return true;
      }
    },
    {
      key: 'wifi',
      element: featuresFieldset.querySelector('#filter-wifi'),
      validate: featureValidator
    },
    {
      key: 'dishwasher',
      element: featuresFieldset.querySelector('#filter-dishwasher'),
      validate: featureValidator
    },
    {
      key: 'parking',
      element: featuresFieldset.querySelector('#filter-parking'),
      validate: featureValidator
    },
    {
      key: 'washer',
      element: featuresFieldset.querySelector('#filter-washer'),
      validate: featureValidator
    },
    {
      key: 'elevator',
      element: featuresFieldset.querySelector('#filter-elevator'),
      validate: featureValidator
    },
    {
      key: 'conditioner',
      element: featuresFieldset.querySelector('#filter-conditioner'),
      validate: featureValidator
    },
  ];

  var onFilterChange = function () {
    var data = window.data.getPins();
    filters.forEach(function (filter) {
      var value = filter.element.type === 'checkbox' ? filter.element.checked : filter.element.value;
      var key = filter.key;
      data = data.filter(function (ad) {
        return filter.validate(ad, value, key);
      });
    });
    window.map.removePins();
    window.debounce(window.map.showPins)(data);
    window.map.removeCards();
  };

  filters.forEach(function (filter) {
    filter.element.addEventListener('change', onFilterChange);
  });
})();

