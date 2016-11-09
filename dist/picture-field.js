(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui/CircularProgress', '/lib/images', './cropper-dialog', './image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui/CircularProgress'), require('/lib/images'), require('./cropper-dialog'), require('./image-preview'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.CircularProgress, global.images, global.cropperDialog, global.imagePreview);
    global.pictureField = mod.exports;
  }
})(this, function (exports, _react, _CircularProgress, _images, _cropperDialog, _imagePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

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

  var styles = {
    root: {
      textAlign: 'center',
      position: 'relative'
    }
  };

  var PictureField = function (_Component) {
    _inherits(PictureField, _Component);

    function PictureField(props) {
      _classCallCheck(this, PictureField);

      var _this = _possibleConstructorReturn(this, (PictureField.__proto__ || Object.getPrototypeOf(PictureField)).call(this, props));

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

      _this.convertToBlob = function (dataUrl, type) {
        var binStr = atob(dataUrl.split(',')[1]);
        var len = binStr.length;
        var arr = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }
        return new Blob([arr], { type: type || 'image/png' });
      };

      _this.handleNewUrl = function (previewData) {
        var promisifiedImagesUrls = previewData.promisifiedImagesUrls,
            imageData = previewData.imageData,
            imageType = previewData.imageType;

        if (promisifiedImagesUrls) {
          _this.handleMultipleImages(promisifiedImagesUrls);
          return;
        }
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

      _this.handleMultipleImages = function (promisifiedImagesUrls) {
        Promise.all(promisifiedImagesUrls).then(function (imagesData) {
          return imagesData.map(function (_ref2) {
            var imageData = _ref2.imageData,
                imageType = _ref2.imageType;
            return _images2.default.resizeImage(imageData, imageType, _this.maxWidth, _this.maxHeight);
          });
        }).then(function (resizePromises) {
          return Promise.all(resizePromises);
        }).then(function (resizedImages) {
          return resizedImages.map(function (_ref3) {
            var resizedImageData = _ref3.resizedImageData,
                imageType = _ref3.imageType;
            return _this.convertToBlob(resizedImageData, imageType);
          });
        }).then(function (imagesFiles) {
          return _this.handleUpload({ imagesFiles: imagesFiles });
        }).catch(function (e) {
          return _this.onError(e);
        });
      };

      _this.handleUpload = function (_ref4) {
        var imageData = _ref4.imageData,
            imageType = _ref4.imageType,
            blob = _ref4.blob,
            imagesFiles = _ref4.imagesFiles;

        if (imagesFiles) {
          _this.props.onFileSelect(imagesFiles);
          _this.setState({
            imagePreviewUrl: '',
            imageType: ''
          });
        } else if (_this.immediateUpload) {
          _this.props.onFileSelect([blob || _this.convertToBlob(imageData, imageType)]);
          _this.setState({
            imagePreviewUrl: '',
            imageType: ''
          });
        } else {
          _this.props.onFileSelect([blob || _this.convertToBlob(imageData, imageType)]);
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

    _createClass(PictureField, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            savedImage = _props.savedImage,
            isUploading = _props.isUploading,
            options = _props.options,
            props = _objectWithoutProperties(_props, ['savedImage', 'isUploading', 'options']);

        var cropAspectRatio = options && options.cropAspectRatio;
        var imagePreviewUrl = this.state.imagePreviewUrl;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.root },
            isUploading ? _react2.default.createElement(
              'div',
              { className: 'image-upload-uploading' },
              _react2.default.createElement(_CircularProgress2.default, null)
            ) : '',
            _react2.default.createElement(_imagePreview2.default, _extends({
              imageUrl: imagePreviewUrl || savedImage,
              setImageUrl: this.handleNewUrl,
              clearImageData: this.clearImageData,
              options: options
            }, props))
          ),
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

    return PictureField;
  }(_react.Component);

  PictureField.propTypes = {
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
  exports.default = PictureField;
});