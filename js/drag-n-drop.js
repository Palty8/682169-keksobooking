'use strict';

(function () {
  var mapWidth = document.querySelector('.map').offsetWidth;

  var CoordsY = {
    MIN: 130,
    MAX: 630
  };

  window.form.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = window.form.pinMain.offsetTop - shift.y;
      var left = window.form.pinMain.offsetLeft - shift.x;

      if (left < 0) {
        left = 0;
      } else if (left > mapWidth - window.form.pinMain.offsetWidth) {
        left = mapWidth - window.form.pinMain.offsetWidth;
      }

      top = Math.min(top, CoordsY.MAX - window.form.pinMain.offsetHeight);
      top = Math.max(top, CoordsY.MIN - window.form.pinMain.offsetHeight);

      window.form.pinMain.style.left = left + 'px';
      window.form.pinMain.style.top = top + 'px';

      window.form.addressField.value = Math.floor(window.form.pinMain.offsetLeft + window.form.pinMain.offsetWidth / 2) + ', ' + Math.floor(window.form.pinMain.offsetTop + window.form.pinMain.offsetHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!window.map.isMapActive) {
        var pins = window.data.getPins();
        window.map.isMapActive = true;
        window.map.activateMap();
        window.map.showPins(pins);
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
