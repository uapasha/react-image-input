(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './utils/images', './image-preview'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./utils/images'), require('./image-preview'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.images, global.imagePreview);
    global.multipleImages = mod.exports;
  }
})(this, function (exports, _react, _images, _imagePreview) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _images2 = _interopRequireDefault(_images);

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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
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

  var MultipleImages = function (_Component) {
    _inherits(MultipleImages, _Component);

    function MultipleImages(props) {
      _classCallCheck(this, MultipleImages);

      var _this = _possibleConstructorReturn(this, (MultipleImages.__proto__ || Object.getPrototypeOf(MultipleImages)).call(this, props));

      _this.handleNewUrls = function (previewData) {
        var promisifiedImagesUrls = previewData.promisifiedImagesUrls;

        if (promisifiedImagesUrls) {
          if (!_this.sizes) {
            _this.handleImages(promisifiedImagesUrls);
          } else {
            _this.handleResizes(promisifiedImagesUrls);
          }
        } else {
          throw new Error('Image preview should supply { promisifiedImagesUrls } if dealing with multiple upload');
        }
      };

      _this.handleResizes = function (promisifiedImagesUrls) {
        var sizes = _this.sizes;
        var imagesAmount = promisifiedImagesUrls.length;
        Promise.all(promisifiedImagesUrls).then(function (imagesData) {
          var res = [];
          Object.keys(sizes).forEach(function (size) {
            return res.push.apply(res, _toConsumableArray(imagesData.map(function (_ref) {
              var imageData = _ref.imageData,
                  imageType = _ref.imageType;
              return _images2.default.resizeImage(imageData, imageType, sizes[size].maxWidth, sizes[size].maxHeight);
            })));
          });
          return res;
        }).then(function (resizePromises) {
          return Promise.all(resizePromises);
        }).then(function (resizedImages) {
          return resizedImages.map(function (_ref2) {
            var resizedImageData = _ref2.resizedImageData,
                imageType = _ref2.imageType;
            return _images2.default.convertToBlob(resizedImageData, imageType);
          });
        }).then(function (imagesFiles) {
          var res = [];
          var sizesAmount = Object.keys(sizes).length;
          var filesAmount = imagesFiles.length;
          imagesFiles.forEach(function (blob, i) {
            var size = Object.keys(sizes)[Math.floor(i / filesAmount * sizesAmount)];
            var imageNum = i % imagesAmount;
            if (res[imageNum]) {
              res[imageNum].push({ size: size, blob: blob });
            } else res[imageNum] = [{ size: size, blob: blob }];
          });
          _this.handleImagesUpload(res);
        }).catch(function (e) {
          return console.error(e);
        });
      };

      _this.handleImages = function (promisifiedImagesUrls) {
        if (_this.resize) {
          Promise.all(promisifiedImagesUrls).then(function (imagesData) {
            return imagesData.map(function (_ref3) {
              var imageData = _ref3.imageData,
                  imageType = _ref3.imageType;
              return _images2.default.resizeImage(imageData, imageType, _this.maxWidth, _this.maxHeight);
            });
          }).then(function (resizePromises) {
            return Promise.all(resizePromises);
          }).then(function (resizedImages) {
            return resizedImages.map(function (_ref4) {
              var resizedImageData = _ref4.resizedImageData,
                  imageType = _ref4.imageType;
              return _images2.default.convertToBlob(resizedImageData, imageType);
            });
          }).then(function (imagesFiles) {
            return _this.handleImagesUpload(imagesFiles);
          }).catch(function (e) {
            return _this.onError(e);
          });
        } else {
          Promise.all(promisifiedImagesUrls).then(function (imagesData) {
            return imagesData.map(function (_ref5) {
              var imageData = _ref5.imageData,
                  imageType = _ref5.imageType;
              return _images2.default.convertToBlob(imageData, imageType);
            });
          }).then(function (imagesFiles) {
            return _this.handleImagesUpload(imagesFiles);
          }).catch(function (e) {
            return _this.onError(e);
          });
        }
      };

      _this.handleImagesUpload = function (imagesFiles) {
        _this.props.onFileSelect(imagesFiles);
      };

      _this.clearImageData = function () {
        _this.props.onFileSelect('');
      };

      if (props.options) {
        _this.resize = props.options.resize !== false;
        _this.maxWidth = props.options.maxWidth || 400;
        _this.maxHeight = props.options.maxHeight || 300;
        _this.sizes = props.options.sizes;
      } else {
        _this.maxWidth = _this.defaultMaxImageWidth;
        _this.maxHeight = _this.defaultMaxImageHeight;
      }
      return _this;
    }

    _createClass(MultipleImages, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            options = _props.options,
            props = _objectWithoutProperties(_props, ['options']);

        return _react2.default.createElement(_imagePreview2.default, _extends({
          setImageUrl: this.handleNewUrls,
          clearImageData: this.clearImageData,
          options: options
        }, props));
      }
    }]);

    return MultipleImages;
  }(_react.Component);

  MultipleImages.propTypes = {
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
     * @param {object} [options] - options for the component
     * @param {array} [options.allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']] -
     * allowed file types in form of 'image/jpeg'
     * @param {bool} [options.fullWidth = false] - format of the image to be displayed
     * @param {bool} [options.resize = true] - resize image before upload
     * @param {number} [options.maxHeight = 300] - max value for height of resized image in px
     * @param {number} [options.maxWidth = 400] - max value for width of resized image in px
     * @param {bool} [multipleUpload = false] - able to select and upload multiple images at once
     * is supported only if no crop applied
     * @ param {object} [sizes] - sizes for saving images in multiple sizes for example:
       * {
       *   small: {
       *     maxWidth: 400,
       *     maxHeight: 300,
       *   },
       *   medium: {
       *     maxWidth: 700,
       *   },
       *   large: {
       *    maxWidth: 1024,
       *    },
       * }
     */
    options: _react.PropTypes.object
  };
  exports.default = MultipleImages;
});