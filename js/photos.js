'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoForm = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  fileChooser.addEventListener('change', function () {
    var files = fileChooser.files;

    var uploadPhoto = function (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = document.createElement('img');
          photoForm.appendChild(photo);
          var photoFormClone = photoForm.cloneNode(true);
          var photoClone = photoFormClone.querySelector('img');
          photoClone.src = reader.result;
          photoClone.width = '70';
          photoClone.height = '70';
          photoContainer.appendChild(photoFormClone);
        });
        reader.readAsDataURL(file);
      }
    };

    Array.prototype.forEach.call(files, function (file) {
      uploadPhoto(file);
    });

    photoForm.remove();
  });

  var resetPhotoForm = function () {
    var photos = photoContainer.querySelectorAll('.ad-form__photo');

    Array.prototype.forEach.call(photos, function (photo) {
      photo.remove();
      photoContainer.appendChild(photoForm);
    });
  };

  window.photos = {
    resetPhotoForm: resetPhotoForm
  };
})();
