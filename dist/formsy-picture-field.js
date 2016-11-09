(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'formsy-react', './picture-field'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('formsy-react'), require('./picture-field'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.formsyReact, global.pictureField);
    global.formsyPictureField = mod.exports;
  }
})(this, function (exports, _react, _formsyReact, _pictureField) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _pictureField2 = _interopRequireDefault(_pictureField);

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

  var FormsyPictureField = function FormsyPictureField(_ref) {
    var setValue = _ref.setValue,
        props = _objectWithoutProperties(_ref, ['setValue']);

    return _react2.default.createElement(_pictureField2.default, _extends({ onFileSelect: setValue }, props));
  };

  FormsyPictureField.propTypes = {
    setValue: _react.PropTypes.func
  };

  exports.default = (0, _formsyReact.HOC)(FormsyPictureField);
});