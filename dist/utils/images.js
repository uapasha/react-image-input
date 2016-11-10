(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.images = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    resizeImage: function resizeImage(dataUrl, imageType, maxWidth, maxHeight) {
      // TODO uapasha refactor into promise
      // TODO uapasha handle errors
      return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.src = dataUrl;
        img.onload = function () {
          var canvas = document.createElement('canvas');

          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          var resizedImageData = canvas.toDataURL(imageType);
          if (resizedImageData) resolve({ resizedImageData: resizedImageData, imageType: imageType });else reject('Error resizing image');
        };
      });
    },
    getImageType: function getImageType(dataUrl) {
      return dataUrl.slice(0, dataUrl.indexOf(';')).slice(dataUrl.indexOf(':') + 1);
    }
  };
});