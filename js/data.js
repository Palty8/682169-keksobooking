'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var COORDINATE_Y_MIN = 130;
  var COORDINATE_Y_MAX = 630;

  var pins = null;

  var getPins = function () {
    return pins;
  };

  var loadPins = function () {
    window.backend.getData(function (data) {
      pins = data;
    }, function () {
      window.form.showErrorGettingData();
    });
  };

  loadPins();

  window.data = {
    COORDINATE_Y_MIN: COORDINATE_Y_MIN,
    COORDINATE_Y_MAX: COORDINATE_Y_MAX,
    MAP_WIDTH: MAP_WIDTH,
    getPins: getPins
  };


})();
