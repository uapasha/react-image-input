(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '../utils/images', '../utils/messages', './basic_components/cordova-preview-component', './basic_components/default-preview-component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('../utils/images'), require('../utils/messages'), require('./basic_components/cordova-preview-component'), require('./basic_components/default-preview-component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.images, global.messages, global.cordovaPreviewComponent, global.defaultPreviewComponent);
    global.imagePreview = mod.exports;
  }
})(this, function (exports, _react, _images, _messages, _cordovaPreviewComponent, _defaultPreviewComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _images2 = _interopRequireDefault(_images);

  var _messages2 = _interopRequireDefault(_messages);

  var _cordovaPreviewComponent2 = _interopRequireDefault(_cordovaPreviewComponent);

  var _defaultPreviewComponent2 = _interopRequireDefault(_defaultPreviewComponent);

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

  var defaultFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  var ImagePreview = function (_Component) {
    _inherits(ImagePreview, _Component);

    function ImagePreview(props) {
      _classCallCheck(this, ImagePreview);

      var _this = _possibleConstructorReturn(this, (ImagePreview.__proto__ || Object.getPrototypeOf(ImagePreview)).call(this, props));

      _this.onFileChange = function (e) {
        var _this$props = _this.props,
            onImageSizeGet = _this$props.onImageSizeGet,
            setImageUrl = _this$props.setImageUrl;
        var files = e.target.files;

        if (!files.length) {
          _this.props.clearImageData();
        } else if (_this.multipleUpload && files[0] instanceof File) {
          _this.handleMultipleFiles(files);
        } else if (files.length === 1) {
          if (!(files[0] instanceof File)) {
            if (onImageSizeGet) {
              (function () {
                var image = new Image();
                image.src = files[0];
                image.onload = function () {
                  onImageSizeGet({ width: image.width, height: image.height });
                };
              })();
            }
            setImageUrl({ imageData: files[0], imageType: 'image/jpeg' });
          } else {
            (function () {
              var reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onloadend = function () {
                var _this$checkFile = _this.checkFile(reader.result),
                    imageType = _this$checkFile.imageType;

                if (!imageType) return;
                if (onImageSizeGet) {
                  (function () {
                    var image = new Image();
                    image.src = reader.result;
                    image.onload = function () {
                      onImageSizeGet({ width: image.width, height: image.height });
                    };
                  })();
                }
                setImageUrl({ imageData: reader.result, imageType: imageType });
              };
            })();
          }
        }
        if (_this.imageInput) _this.imageInput.value = null;
      };

      _this.handleCordovaImage = function () {
        var resize = _this.props.resize;

        var maxWidth = void 0;
        var maxHeight = void 0;
        if (resize) {
          maxWidth = _this.props.maxWidth;
          maxHeight = _this.props.maxHeight;
        }
        var onDeviceReady = function onDeviceReady() {
          if (!navigator || !navigator.camera) {
            throw new Error('Camera plugin is not available');
          }
          navigator.camera.getPicture(function (url) {
            return _this.onFileChange({ target: { files: ['data:image/jpeg;base64,' + url] } });
          }, function (e) {
            return console.error(e);
          }, {
            quality: 50,
            targetHeight: maxHeight || 1024,
            targetWidth: maxWidth || 1024,
            sourceType: window.Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: window.Camera.DestinationType.DATA_URL,
            mediaType: window.Camera.MediaType.PICTURE,
            correctOrientation: true
          });
        };
        document.addEventListener('deviceready', onDeviceReady, false);
      };

      _this.checkFile = function (imageUrl) {
        var onError = _this.props.onError;

        var imageType = _images2.default.getImageType(imageUrl);
        if (!~_this.allowedFileTypes.indexOf(imageType)) {
          onError('' + _messages2.default['wrong_file_type'] + _this.allowedFileTypes.join(', '));
          return {};
        }
        return { imageType: imageType };
      };

      _this.handleMultipleFiles = function (files) {
        var _this$props2 = _this.props,
            onImageSizeGet = _this$props2.onImageSizeGet,
            setImageUrl = _this$props2.setImageUrl;

        var promisifiedImagesUrls = [];
        Array.prototype.forEach.call(files, function (file) {
          var promisifiedReader = new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              var _this$checkFile2 = _this.checkFile(reader.result),
                  imageType = _this$checkFile2.imageType;

              if (!imageType) reject('File type is not supported');
              if (!onImageSizeGet) resolve({ imageData: reader.result, imageType: imageType });else {
                (function () {
                  var image = new Image();
                  image.src = reader.result;
                  image.onload = function () {
                    onImageSizeGet({ width: image.width, height: image.height }, function () {
                      resolve({ imageData: reader.result, imageType: imageType });
                    });
                  };
                })();
              }
            };
          });
          promisifiedImagesUrls.push(promisifiedReader);
        });
        setImageUrl({ promisifiedImagesUrls: promisifiedImagesUrls });
      };

      if (props.options) {
        _this.allowedFileTypes = props.options.allowedFileTypes || ['image/jpeg', 'image/png', 'image/gif'];
        _this.acceptFileTypes = _this.allowedFileTypes.join(',');
        _this.multipleUpload = props.options.multipleUpload && !_this.props.options.crop || false;
      } else {
        _this.allowedFileTypes = defaultFileTypes;
      }
      return _this;
    }

    _createClass(ImagePreview, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            isCordova = _props.isCordova,
            imageUrl = _props.imageUrl,
            DefaultImage = _props.DefaultImage,
            options = _props.options,
            clearImageData = _props.clearImageData;

        var fullWidth = options && options.fullWidth;
        return isCordova ? _jsx(_cordovaPreviewComponent2.default, {
          DefaultImage: DefaultImage,
          fullWidth: fullWidth,
          clearImageData: clearImageData,
          imageUrl: imageUrl,
          onImageSelect: this.handleCordovaImage
        }) : _react2.default.createElement(_defaultPreviewComponent2.default, {
          imageUrl: imageUrl,
          DefaultImage: DefaultImage,
          fullWidth: fullWidth,
          clearImageData: clearImageData,
          allowedFileTypes: this.allowedFileTypes,
          multipleUpload: this.multipleUpload,
          onFileChange: this.onFileChange,
          ref: function ref(preview) {
            if (preview) _this2.imageInput = preview.imageInput;
          }
        });
      }
    }]);

    return ImagePreview;
  }(_react.Component);

  exports.default = ImagePreview;
});