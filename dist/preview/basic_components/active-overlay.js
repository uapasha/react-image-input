(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'material-ui', 'material-ui/svg-icons/action/delete', 'material-ui/svg-icons/file/file-upload', '../../utils/messages'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('material-ui'), require('material-ui/svg-icons/action/delete'), require('material-ui/svg-icons/file/file-upload'), require('../../utils/messages'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.materialUi, global._delete, global.fileUpload, global.messages);
    global.activeOverlay = mod.exports;
  }
})(this, function (exports, _react, _materialUi, _delete, _fileUpload, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _delete2 = _interopRequireDefault(_delete);

  var _fileUpload2 = _interopRequireDefault(_fileUpload);

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

  var onHoverStyles = {
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
  };

  var _ref2 = _jsx(_delete2.default, {});

  var ActiveOverlay = function ActiveOverlay(_ref) {
    var isActive = _ref.isActive,
        clearImageData = _ref.clearImageData,
        imageExists = _ref.imageExists,
        onUploadTouch = _ref.onUploadTouch;
    return isActive ? _jsx('div', {
      style: onHoverStyles.root
    }, void 0, _jsx(_fileUpload2.default, {
      style: onHoverStyles.uploadIcon,
      onTouchTap: onUploadTouch || function () {}
    }), imageExists ? _jsx(_materialUi.IconButton, {
      style: onHoverStyles.deleteIcon,
      onTouchTap: function onTouchTap() {
        return clearImageData(true);
      },
      tooltip: _messages2.default['delete_image']
    }, void 0, _ref2) : '') : null;
  };

  exports.default = ActiveOverlay;
});