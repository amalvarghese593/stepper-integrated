import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

export function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <label htmlFor="radioContainer" className="form-label">
        {label}
      </label>
      <div id="radioContainer" className="mb-3">
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label className="ms-2 me-lg-3 me-1" htmlFor={option.value}>
                    <span>{option.key}</span>
                  </label>
                </React.Fragment>
              );
            });
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
}
