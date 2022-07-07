import { ErrorMessage, Field } from "formik";
import React, { useState, useRef, Fragment } from "react";
import TextError from "./TextError";

export const ResumeUpload = () => {
  const [isDisplayMessage, setIsDisplayMessage] = useState(false);
  const inputRef = useRef();
  // console.log(inputRef && inputRef.current && inputRef.current.value);

  const cancelFileUpload = (form) => {
    console.log(inputRef);
    form.setFieldValue("resume", null);
    // let fileName = inputRef && inputRef.current && inputRef.current.value;
    // console.log(fileName);
    // fileName = null;
    // console.log(fileName);
    setIsDisplayMessage(false);
    // console.log("file cancelled");
  };

  return (
    <div className="mb-3">
      <label htmlFor="resume" className="mb-2">
        Resume
      </label>
      <div id="resume">
        <Field name="resume">
          {(fieldProps) => {
            const { form } = fieldProps;
            return (
              <Fragment>
                <input
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    form.setTouched({ ...form.touched, resume: true });
                    form.setFieldValue("resume", e.target.files[0]);
                    e.target.files[0] && e.target.files[0]?.size <= 10 ** 6
                      ? setIsDisplayMessage(true)
                      : setIsDisplayMessage(false);
                  }}
                  className="border p-3"
                  type="file"
                  accept=".pdf, application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <button
                  type="button"
                  className="btn btn-secondary border border-dark"
                  onClick={() => inputRef.current.click()}
                >
                  Upload Resume
                </button>
                <button
                  type="button"
                  className="btn btn-secondary border border-dark ms-2"
                  onClick={() => cancelFileUpload(form)}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </Fragment>
            );
          }}
        </Field>

        <ErrorMessage name="resume" component={TextError} />

        {/* {isDisplayMessage === 1 && (
          <div className="text-danger">File size should be less than 1 MB</div>
        )} */}
        {isDisplayMessage && (
          <div className="text-success">Resume uploaded successfully</div>
        )}
      </div>
    </div>
  );
};
