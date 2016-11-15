(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './utils/images', './cropper-dialog', './image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./utils/images'), require('./cropper-dialog'), require('./image-preview'));
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
            _this.handleUpload({
              imageData: reader.result,
              imageType: _this.state.imageType,
              blob: blob
            });
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
        } else if (_this.resize) {
          _images2.default.resizeImage(imageData, imageType, _this.maxWidth, _this.maxHeight).then(function (_ref) {
            var resizedImageData = _ref.resizedImageData;

            if (_this.crop) {
              _this.setState({
                imagePreviewUrl: resizedImageData,
                imageType: imageType,
                isCropperOpen: true
              });
            } else {
              _this.handleUpload({
                imageData: resizedImageData,
                imageType: imageType
              });
            }
          }).catch(function (err) {
            return _this.props.onError(err);
          });
        } else if (_this.crop) {
          _this.setState({
            imagePreviewUrl: imageData,
            imageType: imageType,
            isCropperOpen: true
          });
        }
      };

      _this.handleUpload = function (_ref2) {
        var imageData = _ref2.imageData,
            imageType = _ref2.imageType,
            blob = _ref2.blob;

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

      _this.clearImageData = function (deleteImage) {
        _this.setState({ imagePreviewUrl: '' });
        _this.props.onFileSelect('');
        if (deleteImage && _this.props.savedImage) {
          _this.props.onImageDelete();
        }
      };

      _this.state = {
        imagePreviewUrl: '',
        isCropperOpen: false,
        imageType: ''
      };
      if (props.options) {
        _this.resize = props.options.resize !== false;
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
        var _this2 = this;

        var _props = this.props,
            savedImage = _props.savedImage,
            options = _props.options,
            props = _objectWithoutProperties(_props, ['savedImage', 'options']);

        var cropAspectRatio = options && options.cropAspectRatio;
        var imagePreviewUrl = this.state.imagePreviewUrl;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_imagePreview2.default, _extends({
            imageUrl: imagePreviewUrl || savedImage,
            setImageUrl: this.handleNewUrl,
            clearImageData: this.clearImageData,
            options: options
          }, props)),
          _react2.default.createElement(_cropperDialog2.default, {
            imagePreviewUrl: this.state.imagePreviewUrl,
            imageType: this.state.imageType,
            open: this.state.isCropperOpen,
            closeDialog: function closeDialog() {
              return _this2.setState({ isCropperOpen: false });
            },
            onCrop: this.onCrop,
            cropAspectRatio: cropAspectRatio
          })
        );
      }
    }]);

    return ImageField;
  }(_react.Component);

  ImageField.propTypes = {
    /**
     *  @param {string} [savedImage] - url to image that is already saved
     */
    savedImage: _react.PropTypes.string,
    /**
     * @param {function} [defaultImage] - React component that renders
     * placeholder if savedImage is not provided
     */
    defaultImage: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
    /**
     * @param {function} onFileSelect - will be called when image selection
     * process is completed. Returns an array of Blobs
     */
    onFileSelect: _react.PropTypes.func.isRequired,
    /**
     *  @param {function} [onError] - callback called when user select wrong fileType
     */
    onError: _react.PropTypes.func,
    /**
     * @param {bool} [isUploading] - state of uploading of the image
     * be called when left button is pressed
     */
    isUploading: _react.PropTypes.bool,
    /**
     *  @param {function} onImageDelete - callback called when deleteImage button pressed
     */
    onImageDelete: _react.PropTypes.func,
    /**
     * @param {object} [options] - options for the component
     * @param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
     * allowed file types in form of 'image/jpeg'
     * @param {bool} [options.fullWidth = false] - format of the image to be displayed
     * @param {bool} [options.resize = true] - resize image before upload
     * @param {number} [options.maxHeight = 300] - max value for height of resized image in px
     * @param {number} [options.maxWidth = 400] - max value for width of resized image in px
     * @crop {bool} [options.crop = true] - crop image before upload
     * @param {number} [options.cropAspectRatio = 1] - cropAspectRatio
     * @param {bool} [options.immediateUpload = false] - upload image immediately
     * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
     * is supported only if no crop applied
     */
    options: _react.PropTypes.object
  };
  exports.default = ImageField;
});