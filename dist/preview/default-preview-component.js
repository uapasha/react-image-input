(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui', '../basic_components/preview', '../basic_components/active-overlay'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui'), require('../basic_components/preview'), require('../basic_components/active-overlay'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.materialUi, global.preview, global.activeOverlay);
    global.defaultPreviewComponent = mod.exports;
  }
})(this, function (exports, _react, _materialUi, _preview, _activeOverlay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _preview2 = _interopRequireDefault(_preview);

  var _activeOverlay2 = _interopRequireDefault(_activeOverlay);

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var imagePreviewStyles = {
    root: {
      width: 'initial',
      height: '100%'
    },
    input: {
      display: 'none'
    }
  };

  var DefaultPreview = function (_Component) {
    _inherits(DefaultPreview, _Component);

    function DefaultPreview(props) {
      _classCallCheck(this, DefaultPreview);

      var _this = _possibleConstructorReturn(this, (DefaultPreview.__proto__ || Object.getPrototypeOf(DefaultPreview)).call(this, props));

      _this.state = {
        isHovered: false
      };
      return _this;
    }

    _createClass(DefaultPreview, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            imageUrl = _props.imageUrl,
            DefaultImage = _props.DefaultImage,
            fullWidth = _props.fullWidth,
            clearImageData = _props.clearImageData,
            allowedFileTypes = _props.allowedFileTypes,
            multipleUpload = _props.multipleUpload,
            onFileChange = _props.onFileChange;

        return _jsx(_materialUi.IconButton, {
          containerElement: 'label',
          style: imagePreviewStyles.root,
          onMouseEnter: function onMouseEnter() {
            return _this2.setState({ isHovered: true });
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.setState({ isHovered: false });
          }
        }, void 0, _jsx(_preview2.default, {
          DefaultImage: DefaultImage,
          fullWidth: fullWidth,
          imageUrl: imageUrl
        }), _react2.default.createElement('input', {
          key: 'imageInput',
          ref: 'imageInput',
          style: imagePreviewStyles.input,
          accept: allowedFileTypes,
          size: '1000',
          type: 'file',
          multiple: multipleUpload,
          onChange: onFileChange
        }), _jsx(_activeOverlay2.default, {
          isActive: this.state.isHovered,
          imageExists: !!imageUrl,
          clearImageData: clearImageData
        }));
      }
    }]);

    return DefaultPreview;
  }(_react.Component);

  exports.default = DefaultPreview;
});