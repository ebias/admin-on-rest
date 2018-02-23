'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _refresh = require('material-ui/svg-icons/navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _uiActions = require('../../actions/uiActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RefreshButton = function (_Component) {
    (0, _inherits3.default)(RefreshButton, _Component);

    function RefreshButton() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RefreshButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RefreshButton.__proto__ || Object.getPrototypeOf(RefreshButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.preventDefault();
            _this.props.refreshView();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RefreshButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                translate = _props.translate;


            return _react2.default.createElement(_FlatButton2.default, {
                primary: true,
                label: label && translate(label),
                onClick: this.handleClick,
                icon: _react2.default.createElement(_refresh2.default, null)
            });
        }
    }]);
    return RefreshButton;
}(_react.Component);

RefreshButton.propTypes = {
    label: _propTypes2.default.string,
    translate: _propTypes2.default.func.isRequired,
    refreshView: _propTypes2.default.func.isRequired
};
RefreshButton.defaultProps = {
    label: 'aor.action.refresh'
};


var enhance = (0, _compose2.default)((0, _reactRedux.connect)(null, { refreshView: _uiActions.refreshView }), _translate2.default);

exports.default = enhance(RefreshButton);
module.exports = exports['default'];