import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import Dropzone from 'react-dropzone';

import FileInputPreview from './FileInputPreview';
import ImageField from '../field/ImageField';

import translate from '../../i18n/translate';
import DragSortableList from 'react-drag-sortable'

const defaultStyle = {
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    preview: {
        float: 'left',
    },
};

export class FileInput extends Component {
    static propTypes = {
        accept: PropTypes.string,
        children: PropTypes.element,
        disableClick: PropTypes.bool,
        elStyle: PropTypes.object,
        input: PropTypes.object,
        itemStyle: PropTypes.object,
        labelMultiple: PropTypes.string,
        labelSingle: PropTypes.string,
        maxSize: PropTypes.number,
        minSize: PropTypes.number,
        multiple: PropTypes.bool,
        removeStyle: PropTypes.object,
        style: PropTypes.object,
        translate: PropTypes.func.isRequired,
        placeholder: PropTypes.node,
    };

    static defaultProps = {
        addLabel: true,
        addField: true,
        itemStyle: {},
        labelMultiple: 'aor.input.file.upload_several',
        labelSingle: 'aor.input.file.upload_single',
        multiple: false,
        onUpload: () => {},
        removeStyle: { display: 'inline-block' },
    };

    constructor(props) {
        super(props);
        let files = props.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        this.state = {
            files: files.map(this.transformFile),
        };
    }

    componentWillReceiveProps(nextProps) {
        let files = nextProps.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        this.setState({ files: files.map(this.transformFile) });
    }

    onDrop = files => {
        const updatedFiles = this.props.multiple
            ? [...this.state.files, ...files.map(this.transformFile)]
            : [...files.map(this.transformFile)];

        this.setState({ files: updatedFiles });
        this.props.input.onChange(updatedFiles);
    };

	onRemove (file) {
        const filteredFiles = this.state.files.filter(
            stateFile => !shallowEqual(stateFile, file)
        );

        this.setState({ files: filteredFiles });
        this.props.input.onChange(filteredFiles);
	};

    // turn a browser dropped file structure into expected structure
    transformFile = file => {
		if (!(file instanceof File)) {
			file.content = (
				<div style={{ margin: "10px", position: "relative" }}>
					<div onClick={this.onRemove.bind(this, file)}
						style={{
							width: "24px",
							height: "24px",
							top: "10px",
							right: "10px",
							position: "absolute",
							cursor: "pointer"
					}}>
						<svg viewBox="0 0 24 24"
							style={{
								display: "inline-block", color: "rgba(0, 0, 0, 0.87)",
								fill: "rgb(255, 64, 129)", height: "24px", width: "24px", userSelect: "none", transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"}}>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path>
						</svg>
					</div>	
					<img width="240px" height="160px" src={file.src || file.rawFile.preview} />
				</div>
			);
			

            return file;
		}

		const transformedFile = {
            rawFile: file
        };

        return transformedFile;
    };

    label() {
        const {
            translate,
            placeholder,
            labelMultiple,
            labelSingle,
        } = this.props;

        if (placeholder) {
            return placeholder;
        }

        if (this.props.multiple) {
            return <p>{translate(labelMultiple)}</p>;
        }

        return <p>{translate(labelSingle)}</p>;
	}
	
	onSort(sortedList, dropEvent) {
		this.setState({ files: sortedList });
		this.props.input.onChange(sortedList);
	}

    render() {
        const {
            accept,
            children,
            disableClick,
            elStyle,
            itemStyle,
            maxSize,
            minSize,
            multiple,
            style,
            removeStyle,
        } = this.props;

        const finalStyle = {
            ...defaultStyle,
            ...style,
        };

        return (
            <div style={elStyle}>
                <Dropzone
                    onDrop={this.onDrop}
                    accept={accept}
                    disableClick={disableClick}
                    maxSize={maxSize}
                    minSize={minSize}
                    multiple={multiple}
                    style={finalStyle.dropZone}
                >
                    {this.label()}
				</Dropzone>
				<DragSortableList items={this.state.files} onSort={this.onSort.bind(this)} type="grid" />	
                {children && (
					<div className="previews">
                    </div>
                )}
            </div>
        );
    }
}

export default translate(FileInput);
