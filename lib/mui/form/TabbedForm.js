'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findTabsWithErrors = exports.TabbedForm = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Tabs = require('material-ui/Tabs');

var _muiThemeable = require('material-ui/styles/muiThemeable');

var _muiThemeable2 = _interopRequireDefault(_muiThemeable);

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _getDefaultValues = require('./getDefaultValues');

var _getDefaultValues2 = _interopRequireDefault(_getDefaultValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(theme) {
    return {
        form: { padding: '0 1em 3em 1em' },
        // TODO: The color will be taken from another property in MUI 0.19 and later
        errorTabButton: { color: theme.textField.errorColor }
    };
};

var TabbedForm = exports.TabbedForm = function (_Component) {
    (0, _inherits3.default)(TabbedForm, _Component);

    function TabbedForm(props) {
        (0, _classCallCheck3.default)(this, TabbedForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabbedForm.__proto__ || Object.getPrototypeOf(TabbedForm)).call(this, props));

        _this.handleChange = function (value) {
            _this.setState({ value: value });
        };

        _this.handleSubmitWithRedirect = function () {
            var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.redirect;
            return _this.props.handleSubmit(function (values) {
                return _this.props.save(values, redirect);
            });
        };

        _this.state = {
            value: 0
        };
        return _this;
    }

    (0, _createClass3.default)(TabbedForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                basePath = _props.basePath,
                children = _props.children,
                contentContainerStyle = _props.contentContainerStyle,
                invalid = _props.invalid,
                muiTheme = _props.muiTheme,
                record = _props.record,
                resource = _props.resource,
                submitOnEnter = _props.submitOnEnter,
                tabsWithErrors = _props.tabsWithErrors,
                toolbar = _props.toolbar,
                translate = _props.translate,
                version = _props.version;


            var styles = getStyles(muiTheme);

            return _react2.default.createElement(
                'form',
                { className: 'tabbed-form' },
                _react2.default.createElement(
                    'div',
                    { style: styles.form, key: version },
                    _react2.default.createElement(
                        _Tabs.Tabs,
                        {
                            value: this.state.value,
                            onChange: this.handleChange,
                            contentContainerStyle: contentContainerStyle
                        },
                        _react2.default.Children.map(children, function (tab, index) {
                            return tab ? _react2.default.createElement(
                                _Tabs.Tab,
                                {
                                    key: tab.props.label,
                                    className: 'form-tab',
                                    label: translate(tab.props.label, {
                                        _: tab.props.label
                                    }),
                                    value: index,
                                    icon: tab.props.icon,
                                    buttonStyle: tabsWithErrors.includes(tab.props.label) && _this2.state.value !== index ? styles.errorTabButton : null
                                },
                                _react2.default.cloneElement(tab, {
                                    resource: resource,
                                    record: record,
                                    basePath: basePath
                                })
                            ) : null;
                        })
                    )
                ),
                toolbar && _react2.default.cloneElement(toolbar, {
                    handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                    invalid: invalid,
                    submitOnEnter: submitOnEnter
                })
            );
        }
    }]);
    return TabbedForm;
}(_react.Component);

TabbedForm.propTypes = {
    basePath: _propTypes2.default.string,
    children: _propTypes2.default.node,
    contentContainerStyle: _propTypes2.default.object,
    defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    handleSubmit: _propTypes2.default.func, // passed by redux-form
    invalid: _propTypes2.default.bool,
    muiTheme: _propTypes2.default.object.isRequired,
    record: _propTypes2.default.object,
    redirect: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    resource: _propTypes2.default.string,
    save: _propTypes2.default.func, // the handler defined in the parent, which triggers the REST submission
    submitOnEnter: _propTypes2.default.bool,
    tabsWithErrors: _propTypes2.default.arrayOf(_propTypes2.default.string),
    toolbar: _propTypes2.default.element,
    translate: _propTypes2.default.func,
    validate: _propTypes2.default.func,
    version: _propTypes2.default.number
};

TabbedForm.defaultProps = {
    contentContainerStyle: { borderTop: 'solid 1px #e0e0e0' },
    submitOnEnter: true,
    toolbar: _react2.default.createElement(_Toolbar2.default, null)
};

var collectErrors = function collectErrors(state) {
    var syncErrors = (0, _reduxForm.getFormSyncErrors)('record-form')(state);
    var asyncErrors = (0, _reduxForm.getFormAsyncErrors)('record-form')(state);
    var submitErrors = (0, _reduxForm.getFormSubmitErrors)('record-form')(state);

    return (0, _extends3.default)({}, syncErrors, asyncErrors, submitErrors);
};

var findTabsWithErrors = exports.findTabsWithErrors = function findTabsWithErrors(state, props) {
    var collectErrorsImpl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : collectErrors;

    var errors = collectErrorsImpl(state);

    return _react.Children.toArray(props.children).reduce(function (acc, child) {
        var inputs = _react.Children.toArray(child.props.children);

        if (inputs.some(function (input) {
            return errors[input.props.source];
        })) {
            return [].concat((0, _toConsumableArray3.default)(acc), [child.props.label]);
        }

        return acc;
    }, []);
};

var enhance = (0, _compose2.default)((0, _reactRedux.connect)(function (state, props) {
    var children = _react.Children.toArray(props.children).reduce(function (acc, child) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(_react.Children.toArray(child.props.children)));
    }, []);

    return {
        tabsWithErrors: findTabsWithErrors(state, props),
        initialValues: (0, _getDefaultValues2.default)(state, (0, _extends3.default)({}, props, { children: children }))
    };
}), (0, _reduxForm.reduxForm)({
    form: 'record-form',
    enableReinitialize: true
}), (0, _muiThemeable2.default)());

exports.default = enhance(TabbedForm);