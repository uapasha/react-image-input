(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui/Avatar', 'material-ui', 'material-ui/svg-icons/image/image', 'material-ui/svg-icons/action/delete', 'material-ui/svg-icons/file/file-upload', './utils/images', './utils/messages'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui/Avatar'), require('material-ui'), require('material-ui/svg-icons/image/image'), require('material-ui/svg-icons/action/delete'), require('material-ui/svg-icons/file/file-upload'), require('./utils/images'), require('./utils/messages'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Avatar, global.materialUi, global.image, global._delete, global.fileUpload, global.images, global.messages);
    global.imagePreview = mod.exports;
  }
})(this, function (exports, _react, _Avatar, _materialUi, _image, _delete, _fileUpload, _images, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Avatar2 = _interopRequireDefault(_Avatar);

  var _image2 = _interopRequireDefault(_image);

  var _delete2 = _interopRequireDefault(_delete);

  var _fileUpload2 = _interopRequireDefault(_fileUpload);

  var _images2 = _interopRequireDefault(_images);

  var _messages2 = _interopRequireDefault(_messages);

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
    imageIcon: {
      height: 120,
      width: 120
    },
    fullWidthPicture: {
      width: '100%'
    },
    onHover: {
      root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        top: 0,
        left: 0,
        zIndex: 2
      },
      uploadIcon: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 'calc(50% - 30px)',
        right: 'calc(50% - 30px)'
      },
      deleteIcon: {
        position: 'absolute',
        top: 0,
        right: 0
      }
    },
    input: {
      display: 'none'
    }
  };

  var defaultFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  var _ref = _jsx(_delete2.default, {});

  var ImagePreview = function (_Component) {
    _inherits(ImagePreview, _Component);

    function ImagePreview(props) {
      _classCallCheck(this, ImagePreview);

      var _this = _possibleConstructorReturn(this, (ImagePreview.__proto__ || Object.getPrototypeOf(ImagePreview)).call(this, props));

      _this.onFileChange = function (e) {
        var files = e.target.files;

        if (!files.length) {
          _this.props.clearImageData();
        } else if (_this.multipleUpload && files.length > 1) {
          _this.handleMultipleFiles(files);
        } else if (files.length === 1) {
          if (!(files[0] instanceof File)) {
            _this.props.setImageUrl({ imageData: files[0], imageType: 'image/jpeg' });
          } else {
            (function () {
              console.log('is File');
              var reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onloadend = function () {
                var _this$checkFile = _this.checkFile(reader.result),
                    imageType = _this$checkFile.imageType;

                if (!imageType) return;
                _this.props.setImageUrl({ imageData: reader.result, imageType: imageType });
              };
            })();
          }
        }
        _this.refs.imageInput.value = null;
      };

      _this.handleCordovaImage = function () {
        var onDeviceReady = function onDeviceReady() {
          navigator.camera.getPicture(function (url) {
            return _this.onFileChange({ target: { files: ['data:image/jpeg;base64,' + url] } });
          }, function (e) {
            return console.error(e);
          }, {
            quality: 50,
            targetHeight: 1024,
            targetWidth: 1024,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: Camera.DestinationType.DATA_URL,
            mediaType: Camera.MediaType.PICTURE,
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
        var promisifiedImagesUrls = [];
        Array.prototype.forEach.call(files, function (file) {
          var promisifiedReader = new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              var _this$checkFile2 = _this.checkFile(reader.result),
                  imageType = _this$checkFile2.imageType;

              if (!imageType) reject('File type is not supported');
              resolve({ imageData: reader.result, imageType: imageType });
            };
          });
          promisifiedImagesUrls.push(promisifiedReader);
        });
        _this.props.setImageUrl({ promisifiedImagesUrls: promisifiedImagesUrls });
      };

      _this.renderPreview = function () {
        var _this$props = _this.props,
            imageUrl = _this$props.imageUrl,
            DefaultImage = _this$props.DefaultImage,
            options = _this$props.options;

        var fullWidth = options && options.fullWidth;
        if (fullWidth && imageUrl) {
          return _jsx('img', {
            src: imageUrl,
            style: imagePreviewStyles.fullWidthPicture,
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
          style: imagePreviewStyles.imageIcon
        });
      };

      _this.state = {
        isHovered: false
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

        return _jsx(_materialUi.IconButton, {
          containerElement: !navigator.camera ? 'label' : 'div',
          style: imagePreviewStyles.root,
          onMouseEnter: function onMouseEnter() {
            return _this2.setState({ isHovered: true });
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.setState({ isHovered: false });
          },
          onTouchTap: navigator.camera ? this.handleCordovaImage : function () {}
        }, void 0, this.renderPreview(), !navigator.camera ? _react2.default.createElement('input', {
          key: 'imageInput',
          ref: 'imageInput',
          style: imagePreviewStyles.input,
          accept: this.acceptFileTypes,
          size: '1000',
          type: 'file',
          multiple: this.multipleUpload,
          onChange: this.onFileChange
        }) : '', this.state.isHovered ? _jsx('div', {
          style: imagePreviewStyles.onHover.root
        }, void 0, _jsx(_fileUpload2.default, {
          style: imagePreviewStyles.onHover.uploadIcon
        }), this.props.imageUrl ? _jsx(_materialUi.IconButton, {
          style: imagePreviewStyles.onHover.deleteIcon,
          onTouchTap: function onTouchTap() {
            return _this2.props.clearImageData(true);
          },
          tooltip: _messages2.default['delete_image']
        }, void 0, _ref) : '') : '');
      }
    }]);

    return ImagePreview;
  }(_react.Component);

  exports.default = ImagePreview;
});