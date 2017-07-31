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
    global.messages = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'crop': 'Crop',
    'crop_image': 'Crop image to better fit app flow',
    'wrong_file_type': 'Wrong file type. Please, select one of the following formats: ',
    'delete_image': 'Delete image',
    'dont_crop': "Don't crop"
  };
});