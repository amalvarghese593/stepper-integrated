import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

export function Select(props) {
  const { label, name, options, placeholder, ...rest } = props;
  return (
    <>
      {/* <label className="form-label">{label}</label> */}
      <div className="mb-3">
        <Field
          className="form-select"
          as="select"
          id={name}
          name={name}
          {...rest}
        >
          {options.map((option) => {
            return (
              <option
                key={option}
                value={option === { placeholder } ? "" : option}
              >
                {option}
              </option>
            );
          })}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </>
  );
}
