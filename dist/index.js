(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './picture-field', './formsy-picture-field', './image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./picture-field'), require('./formsy-picture-field'), require('./image-preview'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.pictureField, global.formsyPictureField, global.imagePreview);
    global.index = mod.exports;
  }
})(this, function (exports, _pictureField, _formsyPictureField, _imagePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ImagePreview = exports.FormsyPictureField = undefined;

  var _pictureField2 = _interopRequireDefault(_pictureField);

  var _formsyPictureField2 = _interopRequireDefault(_formsyPictureField);

  var _imagePreview2 = _interopRequireDefault(_imagePreview);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.FormsyPictureField = _formsyPictureField2.default;
  exports.ImagePreview = _imagePreview2.default;
  exports.default = _pictureField2.default;
});