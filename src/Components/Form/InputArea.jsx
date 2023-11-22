import React from 'react';
import PropTypes from 'prop-types';

const InputArea = (props) => {
    const {
        id, value, classes, name, changeEvent, placeholder, required, disabled, maxlength, readonly, title,
        rows, cols,
    } = props;

    let inputStyleClass = 'form-control';

    if (classes) {
        inputStyleClass = `${inputStyleClass} ${classes}`;
    }

    return (
        <textarea
            id={id}
            name={name}
            className={inputStyleClass}
            rows={rows}
            cols={cols}
            required={!!required}
            disabled={disabled}
            maxLength={maxlength}
            readOnly={readonly}
            onChange={e => changeEvent(e.target.value, e)}
            placeholder={placeholder}
            title={title}
        >
            {value}
        </textarea>
    );
};

InputArea.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    classes: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    maxlength: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    changeEvent: PropTypes.func,
    required: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    disabled: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    readonly: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    title: PropTypes.string,
    spellCheck: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    style: PropTypes.shape({})
};

InputArea.defaultProps = {
    label: '',
    type: 'text',
    classes: undefined,
    name: undefined,
    placeholder: '',
    maxlength: '',
    changeEvent: () => {},
    required: false,
    disabled: false,
    readonly: false,
    title: '',
    spellCheck: false,
    style: {},
};

export default InputArea;
