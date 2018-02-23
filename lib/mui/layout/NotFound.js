'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _hotTub = require('material-ui/svg-icons/places/hot-tub');

var _hotTub2 = _interopRequireDefault(_hotTub);

var _history = require('material-ui/svg-icons/action/history');

var _history2 = _interopRequireDefault(_history);

var _withWidth = require('material-ui/utils/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _AppBarMobile = require('./AppBarMobile');

var _AppBarMobile2 = _interopRequireDefault(_AppBarMobile);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerMobile: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-3em'
    },
    icon: {
        width: '9em',
        height: '9em'
    },
    message: {
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
        opacity: 0.5,
        margin: '0 1em'
    },
    toolbar: {
        textAlign: 'center',
        marginTop: '2em'
    }
};

function goBack() {
    history.go(-1);
}

var NotFound = function NotFound(_ref) {
    var width = _ref.width,
        translate = _ref.translate;
    return _react2.default.createElement(
        'div',
        { style: width === 1 ? styles.containerMobile : styles.container },
        width === 1 && _react2.default.createElement(_AppBarMobile2.default, null),
        _react2.default.createElement(
            'div',
            { style: styles.message },
            _react2.default.createElement(_hotTub2.default, { style: styles.icon }),
            _react2.default.createElement(
                'h1',
                null,
                translate('aor.page.not_found')
            ),
            _react2.default.createElement(
                'div',
                null,
                translate('aor.message.not_found')
            )
        ),
        _react2.default.createElement(
            'div',
            { style: styles.toolbar },
            _react2.default.createElement(_RaisedButton2.default, {
                label: translate('aor.action.back'),
                icon: _react2.default.createElement(_history2.default, null),
                onClick: goBack
            })
        )
    );
};

NotFound.propTypes = {
    width: _propTypes2.default.number,
    translate: _propTypes2.default.func.isRequired
};

var enhance = (0, _compose2.default)((0, _withWidth2.default)(), _translate2.default);

exports.default = enhance(NotFound);
module.exports = exports['default'];