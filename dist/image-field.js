(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui/CircularProgress', './single-image', './multiple-images'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui/CircularProgress'), require('./single-image'), require('./multiple-images'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.CircularProgress, global.singleImage, global.multipleImages);
    global.imageField = mod.exports;
  }
})(this, function (exports, _react, _CircularProgress, _singleImage, _multipleImages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

  var _singleImage2 = _interopRequireDefault(_singleImage);

  var _multipleImages2 = _interopRequireDefault(_multipleImages);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _jsx = function () {
    var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
    return function createRawReactElement(type, props, key, children) {
      var defaultProps = type && type.defaultProps;
      var childrenLength = arguments.length - 3;

      if (!props && childrenLength !== 0) {
        props = {};
      }

      if (props && defaultProps) {
        for (var propName in defaultProps) {
          if (props[propName] === void 0) {
            props[propName] = defaultProps[propName];
          }
        }
      } else if (!props) {
        props = defaultProps || {};
      }

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 3];
        }

        props.children = childArray;
      }

      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
      };
    };
  }();

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

  var imageFieldStyles = {
    root: {
      textAlign: 'center',
      position: 'relative'
    },
    uploading: {
      root: {
        position: 'fixed',
        height: '100%',
        width: 'calc(100% - 12px)',
        backgroundColor: 'rgba(255,255,255,0.6)',
        top: '0',
        left: '0',
        margin: '0 6px',
        zIndex: '2000'
      },
      progress: {
        top: 'calc(50% - 50px)'
      }
    }
  };

  var ImageField = function ImageField(props) {
    var isUploading = props.isUploading,
        other = _objectWithoutProperties(props, ['isUploading']);

    if (other.options && other.options.crop && other.options.multipleUpload) {
      throw new Error('Crop with multiple image upload is not implemented. ' + 'Please remove crop or multiple upload from react-image-field component options');
    }
    var multipleUpload = !!(other.options && other.options.multipleUpload);
    var cordovaUpload = navigator && navigator.camera && window.Camera;

    var workingComponent = void 0;
    if (!multipleUpload || cordovaUpload) {
      workingComponent = _react2.default.createElement(_singleImage2.default, _extends({ isCordova: cordovaUpload }, other));
    }
    if (multipleUpload) workingComponent = _react2.default.createElement(_multipleImages2.default, other);

    return _jsx('div', {}, void 0, _jsx('div', {
      style: imageFieldStyles.root
    }, void 0, isUploading ? _jsx('div', {
      style: imageFieldStyles.uploading.root
    }, void 0, _jsx(_CircularProgress2.default, {
      style: imageFieldStyles.uploading.progress
    })) : '', workingComponent));
  };

  exports.default = ImageField;
});