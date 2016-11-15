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
    resizeImage: function resizeImage(dataUrl, imageType) {
      var maxWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var maxHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.src = dataUrl;
        img.onload = function () {
          var canvas = document.createElement('canvas');

          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          var width = img.width;
          var height = img.height;

          if (maxWidth && width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (maxHeight && height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
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
    },
    convertToBlob: function convertToBlob(dataUrl, type) {
      var binStr = atob(dataUrl.split(',')[1]);
      var len = binStr.length;
      var arr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      return new Blob([arr], { type: type || 'image/png' });
    }
  };
});