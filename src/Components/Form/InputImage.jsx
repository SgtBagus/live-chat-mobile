import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_IMAGE } from "../DefaultValue/config";

const InputImage = ({
    value, alt, buttonText, acceptFile, changeEvent, noteString,
}) => {
    return (
        <div className="setting-box d-flex">
            <div className="profile-image me-3">
                <div className="sidebar-profile m-0">
                    <div className="profile-image m-0" style={{ width: '130px', height: '130px' }}>
                        <img
                            src={value}
                            className="img-fluid"
                            alt={alt}
                            style={{ objectFit: "cover", height: "100%" }}
                        />
                    </div>
                </div>
            </div>

            <div className="ml-2 w-100">
                <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept={acceptFile}
                    onChange={(e) => {
                        try {
                            changeEvent(e.target.files[0], e);
                        } catch {
                            changeEvent(null, e);
                        }
                    }}
                />
                <label
                    htmlFor="file"
                    className="w-100"
                    style={{ marginBottom: "unset" }}
                >
                    <span> {noteString} </span>
                    <div className="btn btn-primary btn-block mt-3">
                        <i className="fas fa-file mx-2" />
                        {buttonText}
                    </div>
                </label>
            </div>
        </div>
    );
};

InputImage.propTypes = {
    value: PropTypes.string,
    alt: PropTypes.string,
    buttonText: PropTypes.string,
    acceptFile: PropTypes.string,
    noteString: PropTypes.string,
    changeEvent: PropTypes.func.isRequired,
};

InputImage.defaultProps = {
    value: DEFAULT_IMAGE,
    alt: 'Image Input',
    buttonText: 'Upload Image',
    noteString: '',
    acceptFile: 'image/png, image/jpeg, image/jpg',
};

export default InputImage;
