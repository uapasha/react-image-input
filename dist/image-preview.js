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

  var styles = {
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

  var ImagePreview = function (_Component) {
    _inherits(ImagePreview, _Component);

    function ImagePreview(props) {
      _classCallCheck(this, ImagePreview);

      var _this = _possibleConstructorReturn(this, (ImagePreview.__proto__ || Object.getPrototypeOf(ImagePreview)).call(this, props));

      _this.onFileChange = function (e) {
        var files = e.target.files;

        if (!files.length) {
          _this.props.clearImageData();
        } else if (files.length === 1) {
          (function () {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function () {
              var _this$checkFile = _this.checkFile(reader.result),
                  imageType = _this$checkFile.imageType;

              if (!imageType) return;
              _this.props.setImageUrl({ imageData: reader.result, imageType: imageType });
            };
          })();
        } else {
          _this.handleMultipleFiles(files);
        }
        _this.refs.imageInput.value = null;
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
          return _react2.default.createElement('img', { src: imageUrl, style: styles.fullWidthPicture, alt: 'event' });
        }
        if (imageUrl) {
          return _react2.default.createElement(_Avatar2.default, { src: imageUrl, size: 120 });
        }
        return DefaultImage ? _react2.default.createElement(DefaultImage, null) : _react2.default.createElement(_image2.default, { style: styles.imageIcon });
      };

      _this.state = {
        isHovered: false
      };
      if (props.options) {
        _this.allowedFileTypes = props.options.allowedFileTypes || ['image/jpeg', 'image/png', 'image/gif'];
        _this.acceptFileTypes = _this.allowedFileTypes.join(',');
        _this.multipleUpload = props.options.multipleUpload && !_this.props.options.crop || false;
      } else {
        _this.allowedFileTypes = _this.defaultFileTypes;
      }
      return _this;
    }

    _createClass(ImagePreview, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          _materialUi.IconButton,
          {
            containerElement: 'label',
            style: styles.root,
            onMouseEnter: function onMouseEnter() {
              return _this2.setState({ isHovered: true });
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.setState({ isHovered: false });
            }
          },
          this.renderPreview(),
          _react2.default.createElement('input', {
            ref: 'imageInput',
            style: styles.input,
            accept: this.acceptFileTypes,
            size: '1000',
            type: 'file',
            multiple: this.multipleUpload,
            onChange: this.onFileChange
          }),
          this.state.isHovered ? _react2.default.createElement(
            'div',
            { style: styles.onHover.root },
            _react2.default.createElement(_fileUpload2.default, { style: styles.onHover.uploadIcon }),
            this.props.imageUrl ? _react2.default.createElement(
              _materialUi.IconButton,
              {
                style: styles.onHover.deleteIcon,
                onTouchTap: function onTouchTap() {
                  return _this2.props.clearImageData(true);
                },
                tooltip: _messages2.default['delete_image']
              },
              _react2.default.createElement(_delete2.default, null)
            ) : ''
          ) : ''
        );
      }
    }]);

    return ImagePreview;
  }(_react.Component);

  ImagePreview.propTypes = {
    imageUrl: _react.PropTypes.string,
    DefaultImage: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object]),
    clearImageData: _react.PropTypes.func,
    setImageUrl: _react.PropTypes.func,
    onError: _react.PropTypes.func,
    options: _react.PropTypes.object
  };
  exports.default = ImagePreview;
});