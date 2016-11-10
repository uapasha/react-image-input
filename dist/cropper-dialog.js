(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui/Dialog', 'material-ui/FlatButton', 'react-cropper', './utils/messages', '/node_modules/cropperjs/dist/cropper.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui/Dialog'), require('material-ui/FlatButton'), require('react-cropper'), require('./utils/messages'), require('/node_modules/cropperjs/dist/cropper.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Dialog, global.FlatButton, global.reactCropper, global.messages, global.cropper);
    global.cropperDialog = mod.exports;
  }
})(this, function (exports, _react, _Dialog, _FlatButton, _reactCropper, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Dialog2 = _interopRequireDefault(_Dialog);

  var _FlatButton2 = _interopRequireDefault(_FlatButton);

  var _reactCropper2 = _interopRequireDefault(_reactCropper);

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

  // TODO uapasha handle style
  var cropStyle = {
    height: 300,
    width: '100%'
  };

  var styles = {
    cropper: cropStyle
  };

  var CropperDialog = function (_React$Component) {
    _inherits(CropperDialog, _React$Component);

    function CropperDialog() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, CropperDialog);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CropperDialog.__proto__ || Object.getPrototypeOf(CropperDialog)).call.apply(_ref, [this].concat(args))), _this), _this.getActions = function () {
        return [_react2.default.createElement(_FlatButton2.default, {
          label: _messages2.default['crop'],
          primary: true,
          keyboardFocused: true,
          onTouchTap: _this.handleCrop
        })];
      }, _this.handleCrop = function () {
        var _this$props = _this.props,
            onCrop = _this$props.onCrop,
            closeDialog = _this$props.closeDialog;

        onCrop(_this.refs.cropper.getCroppedCanvas());
        closeDialog();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CropperDialog, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            open = _props.open,
            imagePreviewUrl = _props.imagePreviewUrl,
            cropAspectRatio = _props.cropAspectRatio;

        return _react2.default.createElement(
          _Dialog2.default,
          {
            title: _messages2.default['crop_image'],
            actions: this.getActions(),
            modal: true,
            open: open
          },
          open ? _react2.default.createElement(_reactCropper2.default, {
            ref: 'cropper',
            src: imagePreviewUrl,
            style: styles.cropper,
            viewMode: 2,
            aspectRatio: cropAspectRatio || 1,
            guides: false,
            modal: false,
            background: false
          }) : ''
        );
      }
    }]);

    return CropperDialog;
  }(_react2.default.Component);

  CropperDialog.propTypes = {
    imagePreviewUrl: _react.PropTypes.string,
    closeDialog: _react.PropTypes.func,
    onCrop: _react.PropTypes.func,
    open: _react.PropTypes.bool,
    cropAspectRatio: _react.PropTypes.number
  };
  exports.default = CropperDialog;
});