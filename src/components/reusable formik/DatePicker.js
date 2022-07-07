import React from "react";
import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "react-datepicker/dist/react-datepicker.css";

export function DatePicker(props) {
  const { placeholder, label, name, ...rest } = props;
  return (
    <div className="mb-3">
      <label className="mb-2" htmlFor={name}>
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              className="border rounded p-2 form-control"
              dateFormat="dd/MM/yyyy"
              // showYearPicker
              // scrollableYearDropdown
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={placeholder}
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
