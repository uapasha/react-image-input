(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './utils/images', './cropper-dialog', './preview/image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./utils/images'), require('./cropper-dialog'), require('./preview/image-preview'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.images, global.cropperDialog, global.imagePreview);
    global.singleImage = mod.exports;
  }
})(this, function (exports, _react, _images, _cropperDialog, _imagePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _images2 = _interopRequireDefault(_images);

  var _cropperDialog2 = _interopRequireDefault(_cropperDialog);

  var _imagePreview2 = _interopRequireDefault(_imagePreview);

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

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

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

  var ImageField = function (_Component) {
    _inherits(ImageField, _Component);

    function ImageField(props) {
      _classCallCheck(this, ImageField);

      var _this = _possibleConstructorReturn(this, (ImageField.__proto__ || Object.getPrototypeOf(ImageField)).call(this, props));

      _this.onCrop = function (canvas) {
        // toBlob polyfill
        if (!HTMLCanvasElement.prototype.toBlob) {
          Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function value(callback, type, quality) {
              var binStr = atob(this.toDataURL(type, quality).split(',')[1]);
              var len = binStr.length;
              var arr = new Uint8Array(len);
              for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
              }
              callback(new Blob([arr], { type: type || 'image/png' }));
            }
          });
        }
        canvas.toBlob(function (blob) {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            if (!_this.resize) {
              _this.handleUpload({
                imageData: reader.result,
                imageType: _this.state.imageType,
                blob: blob
              });
            } else {
              _this.resizeAndUpload(reader.result, _this.state.imageType);
            }
            _this.setState({ isCropperOpen: false });
          };
        }, '' + _this.state.imageType);
      };

      _this.handleNewUrl = function (previewData) {
        var imageData = previewData.imageData,
            imageType = previewData.imageType;

        if (!_this.resize && !_this.crop) {
          _this.handleUpload({
            imageData: imageData,
            imageType: imageType
          });
        } else if (_this.crop) {
          _this.setState({
            imagePreviewUrl: imageData,
            imageType: imageType,
            isCropperOpen: true
          });
        } else if (_this.resize) {
          _this.resizeAndUpload(imageData, imageType);
        }
      };

      _this.handleUpload = function (_ref) {
        var imageData = _ref.imageData,
            imageType = _ref.imageType,
            blob = _ref.blob;

        if (_this.immediateUpload) {
          _this.props.onFileSelect([blob || _images2.default.convertToBlob(imageData, imageType)]);
          _this.setState({
            imagePreviewUrl: '',
            imageType: ''
          });
        } else {
          _this.props.onFileSelect([blob || _images2.default.convertToBlob(imageData, imageType)]);
          _this.setState({
            imagePreviewUrl: imageData,
            imageType: imageType
          });
        }
      };

      _this.handleCancelCrop = function () {
        var _this$state = _this.state,
            imageData = _this$state.imagePreviewUrl,
            imageType = _this$state.imageType;

        if (!_this.resize) {
          _this.handleUpload({ imageData: imageData, imageType: imageType });
        } else _this.resizeAndUpload(imageData, imageType);
        _this.setState({ isCropperOpen: false });
      };

      _this.clearImageData = function (deleteImage) {
        _this.setState({ imagePreviewUrl: '' });
        if (deleteImage && _this.props.savedImage) {
          _this.props.onImageDelete();
        }
      };

      _this.resizeAndUpload = function (imageData, imageType) {
        _images2.default.resizeImage(imageData, imageType, _this.maxWidth, _this.maxHeight).then(function (_ref2) {
          var resizedImageData = _ref2.resizedImageData;

          _this.handleUpload({
            imageData: resizedImageData,
            imageType: imageType
          });
        }).catch(function (err) {
          return _this.props.onError(err);
        });
      };

      _this.state = {
        imagePreviewUrl: '',
        isCropperOpen: false,
        imageType: ''
      };
      if (props.options) {
        if (props.isCordova) {
          _this.resize = false;
        } else {
          _this.resize = props.options.resize !== false;
        }
        _this.crop = props.options.crop !== false;
        _this.immediateUpload = props.options.immediateUpload;
        _this.maxWidth = props.options.maxWidth || 400;
        _this.maxHeight = props.options.maxHeight || 300;
      } else {
        _this.maxWidth = _this.defaultMaxImageWidth;
        _this.maxHeight = _this.defaultMaxImageHeight;
      }
      return _this;
    }

    _createClass(ImageField, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            savedImage = _props.savedImage,
            options = _props.options,
            props = _objectWithoutProperties(_props, ['savedImage', 'options']);

        var cropAspectRatio = options && options.cropAspectRatio;
        var imagePreviewUrl = this.state.imagePreviewUrl;

        return _jsx('div', {}, void 0, _react2.default.createElement(_imagePreview2.default, _extends({
          imageUrl: imagePreviewUrl || savedImage,
          setImageUrl: this.handleNewUrl,
          clearImageData: this.clearImageData,
          options: options
        }, props, {
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          resize: options && options.resize !== false
        })), _jsx(_cropperDialog2.default, {
          imagePreviewUrl: this.state.imagePreviewUrl,
          imageType: this.state.imageType,
          open: this.state.isCropperOpen,
          cancelDialog: this.handleCancelCrop,
          onCrop: this.onCrop,
          alwaysCrop: options && options.alwaysCrop,
          cropAspectRatio: cropAspectRatio
        }));
      }
    }]);

    return ImageField;
  }(_react.Component);

  exports.default = ImageField;
});