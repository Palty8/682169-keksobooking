'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.height = '70';
        previewAvatar.width = '70';
        preview.style.padding = '0';
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var resetAvatar = function () {
    previewAvatar.height = '44';
    previewAvatar.width = '40';
    previewAvatar.src = 'img/muffin-grey.svg';
    preview.style.padding = '0px 15px';
  };

  window.avatar = {
    resetAvatar: resetAvatar
  };
})();
