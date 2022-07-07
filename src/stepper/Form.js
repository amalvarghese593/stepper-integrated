import React from "react";

const Form = {
  Input(props) {
    const {
      label,
      name,
      error,
      touched,
      type,
      setTouched,
      setFieldTouched,
      setFieldValue,
      isInline,
      value,
      isAddCancelButton,
      ...rest
    } = props;
    let onChangeFile;
    let onBlurFile;
    let removeFile;
    if (type === "file") {
      onChangeFile = (e) => setFieldValue(name, e.target.files[0]);
      onBlurFile = () => setFieldTouched(name);
      removeFile = () => setFieldValue(name, null);
    }
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          type={type}
          id={name}
          value={type === "file" ? undefined : value}
          name={name}
          onChange={onChangeFile}
          onBlur={onBlurFile}
          {...rest}
          className="form-control"
        />
        {error && touched && (
          <div className="validation-message-container">
            <p className="text-danger validation-message">{error}</p>
          </div>
        )}
        {isAddCancelButton && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={removeFile}
          >
            Cancel
          </button>
        )}
      </div>
    );
  },
  TextArea(props) {
    const { label, name, error, touched, ...rest } = props;
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label field-label">
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          {...rest}
          className="form-control"
        ></textarea>
        {error && touched && (
          <div className="validation-message-container">
            <p className="text-danger validation-message">{error}</p>
          </div>
        )}
      </div>
    );
  },
};

export default Form;
