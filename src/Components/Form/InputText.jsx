import React from 'react';
import PropTypes from 'prop-types';

const InputText = (props) => {
    const {
        value, style, classes, name, changeEvent, placeholder, required, disabled, maxlength, readonly, title, spellCheck, type,
    } = props;

    let inputStyleClass = 'form-control';

    if (classes) {
        inputStyleClass = `${inputStyleClass} ${classes}`;
    }

    return (
        <input
            type={type}
            className={inputStyleClass}
            name={name}
            onChange={e => changeEvent(e.target.value, e)}
            placeholder={placeholder}
            value={value}
            required={!!required}
            disabled={disabled}
            maxLength={maxlength}
            readOnly={readonly}
            title={title}
            spellCheck={spellCheck}
            autoComplete="off"
            style={style}
        />
    );
};

InputText.propTypes = {
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

InputText.defaultProps = {
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

export default InputText;
