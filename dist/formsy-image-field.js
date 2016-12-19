(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'formsy-react', './image-field'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('formsy-react'), require('./image-field'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.formsyReact, global.imageField);
    global.formsyImageField = mod.exports;
  }
})(this, function (exports, _react, _formsyReact, _imageField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _imageField2 = _interopRequireDefault(_imageField);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var FormsyImageField = function FormsyImageField(_ref) {
    var setValue = _ref.setValue,
        props = _objectWithoutProperties(_ref, ['setValue']);

    return _react2.default.createElement(_imageField2.default, _extends({ onFileSelect: setValue }, props));
  };

  exports.default = (0, _formsyReact.HOC)(FormsyImageField);
});