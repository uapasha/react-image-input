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

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var styles = {
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

    // TODO uapasha return error if crop and multiple images selected instead of failing quietly
    var multipleUpload = other.options.multipleUpload && !other.options.crop || false;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: styles.root },
        isUploading ? _react2.default.createElement(
          'div',
          { style: styles.uploading.root },
          _react2.default.createElement(_CircularProgress2.default, { style: styles.uploading.progress })
        ) : '',
        multipleUpload ? _react2.default.createElement(_multipleImages2.default, other) : _react2.default.createElement(_singleImage2.default, other)
      )
    );
  };

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

  exports.default = ImageField;
});