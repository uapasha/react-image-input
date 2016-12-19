(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui/Avatar', 'material-ui/svg-icons/image/image'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui/Avatar'), require('material-ui/svg-icons/image/image'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Avatar, global.image);
    global.preview = mod.exports;
  }
})(this, function (exports, _react, _Avatar, _image) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Avatar2 = _interopRequireDefault(_Avatar);

  var _image2 = _interopRequireDefault(_image);

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

  var previewStyles = {
    imageIcon: {
      height: 120,
      width: 120
    },
    fullWidthPicture: {
      width: '100%'
    }
  };

  var Preview = function Preview(_ref) {
    var imageUrl = _ref.imageUrl,
        DefaultImage = _ref.DefaultImage,
        fullWidth = _ref.fullWidth;

    if (fullWidth && imageUrl) {
      return _jsx('img', {
        src: imageUrl,
        style: previewStyles.fullWidthPicture,
        alt: 'event'
      });
    }
    if (imageUrl) {
      return _jsx(_Avatar2.default, {
        src: imageUrl,
        size: 120
      });
    }
    return DefaultImage ? _jsx(DefaultImage, {}) : _jsx(_image2.default, {
      style: previewStyles.imageIcon
    });
  };

  exports.default = Preview;
});