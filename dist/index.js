(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './image-field', './formsy-image-field', './image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./image-field'), require('./formsy-image-field'), require('./image-preview'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.imageField, global.formsyImageField, global.imagePreview);
    global.index = mod.exports;
  }
})(this, function (exports, _imageField, _formsyImageField, _imagePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ImagePreview = exports.FormsyImageField = undefined;

  var _imageField2 = _interopRequireDefault(_imageField);

  var _formsyImageField2 = _interopRequireDefault(_formsyImageField);

  var _imagePreview2 = _interopRequireDefault(_imagePreview);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.FormsyImageField = _formsyImageField2.default;
  exports.ImagePreview = _imagePreview2.default;
  exports.default = _imageField2.default;
});