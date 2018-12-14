'use strict';

(function () {
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
      } else if (left > window.data.MAP_WIDTH - window.pin.PIN_WIDTH) {
        left = window.data.MAP_WIDTH - window.pin.PIN_WIDTH;
      }

      top = Math.min(top, window.data.COORDINATE_Y_MAX);
      top = Math.max(top, window.data.COORDINATE_Y_MIN);


      window.form.pinMain.style.left = left + 'px';
      window.form.pinMain.style.top = top + 'px';

      window.form.addressField.value = Math.floor(window.form.pinMain.offsetLeft + window.form.pinMain.offsetWidth / 2) + ', ' + Math.floor(window.form.pinMain.offsetTop - window.form.pinMain.offsetHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.activateMap();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
