'use strict';

(function () {
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
    getPins: getPins
  };
})();
