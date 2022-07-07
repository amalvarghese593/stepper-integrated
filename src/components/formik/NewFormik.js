import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { TextError } from "./TextError";

export const NewFormik = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    comments: "",
    address: "",
    description: "",
  };
  const onSubmit = () => {
    alert("form submitted");
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid Email").required("Required!"),
    password: Yup.string().required("Required!"),
    comments: Yup.string().required("Required!"),
    address: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
  });

  const arr = [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
    {
      name: "comments",
      type: "",
      label: "Comments",
    },
  ];
  return (
    <div>
      <h1 className="text-muted">Formik form</h1>
      <Formik {...{ initialValues, onSubmit, validationSchema }}>
        <Form className="container p-3 border w-50 text-start">
          {arr.map((el, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={el.name} className="form-label">
                {el.label}
              </label>
              <Field
                as={el.name === "comments" ? "textarea" : ""}
                type={el.type}
                id={el.name}
                name={el.name}
                className="form-control"
              />
              {/* <ErrorMessage name={el.name} component="div" /> */}
              <ErrorMessage name={el.name} component={TextError} />
            </div>
          ))}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            {/* render props in field component */}
            <Field name="address">
              {(props) => {
                // console.log("Render props", props);
                const { field, form, meta } = props;
                return (
                  <div>
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      {...field}
                    />
                    {meta.touched && meta.error && (
                      <div className="text-danger">{meta.error}</div>
                    )}
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Field
              id="description"
              name="description"
              as="textarea"
              className="form-control"
            />
            <ErrorMessage name="description">
              {(props) => {
                // console.log(props);
                return <div className="text-danger">{props}</div>;
              }}
            </ErrorMessage>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
