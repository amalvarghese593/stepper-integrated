import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

export const Textarea = ({ label, name, ...rest }) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className="form-control"
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
};
