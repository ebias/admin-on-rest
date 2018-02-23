'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileInput = undefined;

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

var _recompose = require('recompose');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _FileInputPreview = require('./FileInputPreview');

var _FileInputPreview2 = _interopRequireDefault(_FileInputPreview);

var _ImageField = require('../field/ImageField');

var _ImageField2 = _interopRequireDefault(_ImageField);

var _translate = require('../../i18n/translate');

var _translate2 = _interopRequireDefault(_translate);

var _reactDragSortable = require('react-drag-sortable');

var _reactDragSortable2 = _interopRequireDefault(_reactDragSortable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999'
    },
    preview: {
        float: 'left'
    }
};

var FileInput = exports.FileInput = function (_Component) {
    (0, _inherits3.default)(FileInput, _Component);

    function FileInput(props) {
        (0, _classCallCheck3.default)(this, FileInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FileInput.__proto__ || Object.getPrototypeOf(FileInput)).call(this, props));

        _initialiseProps.call(_this);

        var files = props.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        _this.state = {
            files: files.map(_this.transformFile)
        };
        return _this;
    }

    (0, _createClass3.default)(FileInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var files = nextProps.input.value || [];
            if (!Array.isArray(files)) {
                files = [files];
            }

            this.setState({ files: files.map(this.transformFile) });
        }
    }, {
        key: 'onRemove',
        value: function onRemove(file) {
            var filteredFiles = this.state.files.filter(function (stateFile) {
                return !(0, _recompose.shallowEqual)(stateFile, file);
            });

            this.setState({ files: filteredFiles });
            this.props.input.onChange(filteredFiles);
        }

        // turn a browser dropped file structure into expected structure

    }, {
        key: 'label',
        value: function label() {
            var _props = this.props,
                translate = _props.translate,
                placeholder = _props.placeholder,
                labelMultiple = _props.labelMultiple,
                labelSingle = _props.labelSingle;


            if (placeholder) {
                return placeholder;
            }

            if (this.props.multiple) {
                return _react2.default.createElement(
                    'p',
                    null,
                    translate(labelMultiple)
                );
            }

            return _react2.default.createElement(
                'p',
                null,
                translate(labelSingle)
            );
        }
    }, {
        key: 'onSort',
        value: function onSort(sortedList, dropEvent) {
            this.setState({ files: sortedList });
            this.props.input.onChange(sortedList);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                accept = _props2.accept,
                children = _props2.children,
                disableClick = _props2.disableClick,
                elStyle = _props2.elStyle,
                itemStyle = _props2.itemStyle,
                maxSize = _props2.maxSize,
                minSize = _props2.minSize,
                multiple = _props2.multiple,
                style = _props2.style,
                removeStyle = _props2.removeStyle;


            var finalStyle = (0, _extends3.default)({}, defaultStyle, style);

            return _react2.default.createElement(
                'div',
                { style: elStyle },
                _react2.default.createElement(
                    _reactDropzone2.default,
                    {
                        onDrop: this.onDrop,
                        accept: accept,
                        disableClick: disableClick,
                        maxSize: maxSize,
                        minSize: minSize,
                        multiple: multiple,
                        style: finalStyle.dropZone
                    },
                    this.label()
                ),
                _react2.default.createElement(_reactDragSortable2.default, { items: this.state.files, onSort: this.onSort.bind(this), type: 'grid' }),
                children && _react2.default.createElement('div', { className: 'previews' })
            );
        }
    }]);
    return FileInput;
}(_react.Component);

FileInput.propTypes = {
    accept: _propTypes2.default.string,
    children: _propTypes2.default.element,
    disableClick: _propTypes2.default.bool,
    elStyle: _propTypes2.default.object,
    input: _propTypes2.default.object,
    itemStyle: _propTypes2.default.object,
    labelMultiple: _propTypes2.default.string,
    labelSingle: _propTypes2.default.string,
    maxSize: _propTypes2.default.number,
    minSize: _propTypes2.default.number,
    multiple: _propTypes2.default.bool,
    removeStyle: _propTypes2.default.object,
    style: _propTypes2.default.object,
    translate: _propTypes2.default.func.isRequired,
    placeholder: _propTypes2.default.node
};
FileInput.defaultProps = {
    addLabel: true,
    addField: true,
    itemStyle: {},
    labelMultiple: 'aor.input.file.upload_several',
    labelSingle: 'aor.input.file.upload_single',
    multiple: false,
    onUpload: function onUpload() {},
    removeStyle: { display: 'inline-block' }
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onDrop = function (files) {
        var updatedFiles = _this2.props.multiple ? [].concat((0, _toConsumableArray3.default)(_this2.state.files), (0, _toConsumableArray3.default)(files.map(_this2.transformFile))) : [].concat((0, _toConsumableArray3.default)(files.map(_this2.transformFile)));

        _this2.setState({ files: updatedFiles });
        _this2.props.input.onChange(updatedFiles);
    };

    this.transformFile = function (file) {
        if (!(file instanceof File)) {
            file.content = _react2.default.createElement(
                'div',
                { style: { margin: "10px", position: "relative" } },
                _react2.default.createElement(
                    'div',
                    { onClick: _this2.onRemove.bind(_this2, file),
                        style: {
                            width: "24px",
                            height: "24px",
                            top: "10px",
                            right: "10px",
                            position: "absolute",
                            cursor: "pointer"
                        } },
                    _react2.default.createElement(
                        'svg',
                        { viewBox: '0 0 24 24',
                            style: {
                                display: "inline-block", color: "rgba(0, 0, 0, 0.87)",
                                fill: "rgb(255, 64, 129)", height: "24px", width: "24px", userSelect: "none", transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms" } },
                        _react2.default.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z' })
                    )
                ),
                _react2.default.createElement('img', { width: '240px', height: '160px', src: file.src || file.rawFile.preview })
            );

            return file;
        }

        var transformedFile = {
            rawFile: file
        };

        return transformedFile;
    };
};

exports.default = (0, _translate2.default)(FileInput);