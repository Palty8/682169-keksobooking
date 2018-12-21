'use strict';

(function () {

  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var REQUEST_TIMEOUT = 10000;

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Невозможно установить соединение с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open('GET', URL_DATA);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Невозможно установить соединение с сервером');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };
})();
