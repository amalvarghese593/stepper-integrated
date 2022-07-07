import React, { useState } from "react";
import { Form, Formik } from "formik";
import { FormikControl } from "./reusable formik/FormikControl";
import * as Yup from "yup";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default () => {
  const [isLogging, setIsLogging] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    setIsLogging(true);
    const fetch = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
          // url: "http://localhost:1337/login",
          data: values,
        });
        setIsLogging(false);
        console.log({ response });
        if (!response.data.error) {
          props.resetForm();
          localStorage.setItem("auth_token", response.data.token);
          // setIsError(false);
          navigate("/admin");
        } else setIsError(response.data.error.message);
      } catch (error) {
        setIsLogging(false);

        if (typeof error.response.data === "string") {
          setIsError(error.response.data);
        } else {
          // throw new Error(error?.response.data.error);
          setIsError(error?.response.data.error);
        }
      }
    };
    fetch();
  };
  return (
    <div className="row m-0 ps-3">
      <div className="col-lg-5 col-md-10 col-sm-12 col-12 p-0 register-form mx-auto login-left">
        <div className="brand-logo px-4 login-header">
          <img
            src="images/logo.png"
            alt="company logo"
            style={{ height: "70px" }}
          />
        </div>
        <div className="px-4 pt-5 pb-2 border-bottom">
          <nav className="nav navLinks">
            <NavLink to="/" className="nav-link ">
              Home
            </NavLink>
            <NavLink to="/" className="nav-link ">
              Register
            </NavLink>
          </nav>
        </div>
        <hr className="devider" />
        <div className=" w-100 px-3 login-form">
          <div className="w-100 px-3">
            {/* <h2 className="m-0 pb-4"> Login Here</h2> */}
            <Formik {...{ initialValues, validationSchema, onSubmit }}>
              <Form className="text-start">
                {isError && (
                  <div className="errorBanner">
                    <span className="errorMessage">{isError}</span>

                    <button
                      onClick={() => setIsError(null)}
                      className="closeBtn">
                      X
                    </button>
                  </div>
                )}
                <div className="container rounded p-3 card shadow">
                  <div className="card-body">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label">
                        Email address
                      </label>
                      <FormikControl
                        control="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="exampleInputEmail1"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label">
                        Password
                      </label>
                      <FormikControl
                        control="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <button
                      disabled={isLogging}
                      type="submit"
                      className="btn btn-primary mt-2">
                      {isLogging ? <>Logging In</> : <>Login</>}
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      {/* <section className="col-lg-6 d-lg-block d-none p-0">
        <div className="register-form-image">
          <img src="/images/learning-image.svg" alt="Learning firstleep" />
        </div>
      </section> */}
    </div>
  );
};
