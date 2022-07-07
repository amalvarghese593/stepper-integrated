import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { Form1 } from "./Form";
// import { locations } from "./locations";
import { Personal } from "./Personal";
import { Education } from "./Education";
import { Professional } from "./Professional";
import axios from "axios";

function FormikContainer() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
    primaryEmailId: "",
    secondaryEmailId: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    currentLocation: "",
    preferredLocation: "",
    currentAddress: "",
    permanentAddress: "",
    masters: "",
    mastersSpecialisation: "",
    mastersYOP: "",
    mastersPercentage: "",
    mastersUniName: "",
    mastersCollegeName: "",
    graduation: "",
    gradSpecialisation: "",
    gradYOP: "",
    gradPercentage: "",
    gradUniName: "",
    gradCollegeName: "",
    // puc: "",
    pucSpecialisation: "",
    pucYOP: "",
    pucPercentage: "",
    pucUniName: "",
    pucSchoolName: "",
    // tenth: "",
    tenthYOP: "",
    tenthPercentage: "",
    tenthUniName: "",
    tenthSchoolName: "",
    isFresher: "",
    currentCompanyName: "",
    currentDesignation: "",
    skills: [],
    totalExperience: "",
    additionalCourses: "",
    summary: "",
    resume: null,
  };
  const page1Validation = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Required"),
    dob: Yup.date().required("Required").nullable(),
    gender: Yup.string().required("Required"),
    primaryContactNumber: Yup.number()
      .max(9999999999, "Maximum 10 digits allowed")
      .min(1000000000, "10 digits required")
      .typeError("Must be a Number")
      .required("Required"),
    secondaryContactNumber: Yup.number()
      .max(9999999999, "Max 10 digits allowed")
      .min(1000000000, "10 digits required")
      .typeError("Must be a Number")
      .test("secondaryContactNumber", "Use another number", function (val) {
        return !(
          this.parent.primaryContactNumber &&
          val === this.parent.primaryContactNumber
        );
      }),
    // .notOneOf([Yup.ref("primaryContactNumber")], "Use another number"),
    primaryEmailId: Yup.string().email("Invalid Email").required("Required"),
    secondaryEmailId: Yup.string()
      .email("Invalid Email")
      .test("secondaryEmailId", "Use another Email", function (val) {
        return !(
          this.parent.primaryEmailId && val === this.parent.primaryEmailId
        );
      }),
    // .notOneOf([Yup.ref("primaryEmailId")], "Use another Email"),
    fatherFirstName: Yup.string().required("Required"),
    fatherMiddleName: Yup.string(),
    fatherLastName: Yup.string().required("Required"),
    motherFirstName: Yup.string().required("Required"),
    motherMiddleName: Yup.string(),
    motherLastName: Yup.string().required("Required"),
    currentLocation: Yup.string().required("Required"),
    preferredLocation: Yup.string().required("Required"),
    currentAddress: Yup.string()
      .min(10, "Min 10 characters required")
      .required("Required"),
    permanentAddress: Yup.string()
      .min(10, "Min 10 characters required")
      .required("Required"),
  });
  function mastersValidator(val) {
    return this.parent.masters ||
      this.parent.mastersSpecialisation ||
      this.parent.mastersCollegeName ||
      this.parent.mastersPercentage ||
      this.parent.mastersUniName ||
      this.parent.mastersYOP
      ? val
      : true;
  }
  const page2Validation = Yup.object().shape({
    masters: Yup.string().test("masters", "Required", mastersValidator),
    mastersSpecialisation: Yup.string().test(
      "mastersSpecialisation",
      "Required",
      mastersValidator
    ),
    mastersYOP: Yup.string().test("mastersYOP", "Required", mastersValidator),
    mastersPercentage: Yup.number().test(
      "mastersPercentage",
      "Required",
      mastersValidator
    ),
    mastersUniName: Yup.string().test(
      "mastersUniName",
      "Required",
      mastersValidator
    ),
    mastersCollegeName: Yup.string().test(
      "mastersCollegeName",
      "Required",
      mastersValidator
    ),
    graduation: Yup.string().required("Required"),
    gradSpecialisation: Yup.string().required("Required"),
    gradYOP: Yup.string().required("Required"),
    gradPercentage: Yup.number().required("Required"),
    gradUniName: Yup.string().required("Required"),
    gradCollegeName: Yup.string().required("Required"),
    // puc: Yup.string().required("Required"),
    pucSpecialisation: Yup.string().required("Required"),
    pucYOP: Yup.string().required("Required"),
    pucPercentage: Yup.number().required("Required"),
    pucUniName: Yup.string().required("Required"),
    pucSchoolName: Yup.string().required("Required"),
    // tenth: Yup.string().required("Required"),
    tenthYOP: Yup.string().required("Required"),
    tenthPercentage: Yup.number().required("Required"),
    tenthUniName: Yup.string().required("Required"),
    tenthSchoolName: Yup.string().required("Required"),
  });
  const page3Validation = Yup.object().shape({
    isFresher: Yup.string().required("Required"),
    currentCompanyName: Yup.string().when("isFresher", {
      is: "no",
      then: Yup.string().required("Required"),
    }),
    currentDesignation: Yup.string().when("isFresher", {
      is: "no",
      then: Yup.string().required("Required"),
    }),
    skills: Yup.array()
      .of(
        Yup.object({
          skill: Yup.string().required("Required"),
          experience: Yup.number().required("Required"),
        })
      )
      .min(1, "Required"),
    totalExperience: Yup.number().when("isFresher", {
      is: "no",
      then: Yup.number().min(0, "Must be greater than 0").required("Required"),
    }),
    additionalCourses: Yup.string().required("Required"),
    summary: Yup.string()
      .min(20, "Min 20 characters required")
      .required("Required"),

    resume: Yup.mixed()
      .nullable()
      .required("Required")
      .test("resume", "File size should be less than 1 MB", (val) => {
        console.log("formik resume: ", val);
        return val && val.size <= 10 ** 6;
      }),

    // resume: Yup.object().shape({
    //   file: Yup.mixed()
    //     .required("Required")
    //     .test(
    //       "resume",
    //       "File size should be less than 1 MB",
    //       (val) => val && val.size <= 10 ** 6
    //     ),
    // }),
  });
  const combinedValidation = [
    page1Validation,
    page2Validation,
    page3Validation,
  ];

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    alert("Form submitted successfully");
    const formData = new FormData();

    for (const key in values) {
      if (key === "skills") {
        formData.append("skills", JSON.stringify(values.skills));
      } else {
        formData.append(key, values[key]);
      }
    }
    async function postData() {
      try {
        setIsSubmitting(true);
        const response = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}/api/v1/auth/registernewuser`,
          // url: `${process.env.REACT_APP_API_URL}/api/v1/userRegistration/register`,
          // url: "https://testing.webpipl.com/api/v1/userRegistration/register",
          data: formData,

          //   headers: { "Content-Type": "application/json" },
        });
        setIsSubmitting(false);
        // onSubmitProps.resetForm();
        // navigate("/login");
        if (response.data.error) {
          setIsError(response.data.error.message);
        } else {
          setIsError(null);
        }
        console.log("amal response: ", response.data);
      } catch (error) {
        setIsSubmitting(false);
        if (typeof error.response.data === "string") {
          setIsError(error.response.data);
        } else {
          // throw new Error(error?.response.data.error);
          setIsError(error?.response.data.error);
        }
        // setIsError(error.message);
        // console.log("amal error: ", error);
      }
    }
    postData();
    navigate("/redirect");
  };
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Formik
      {...{
        initialValues: initialValues,
        validationSchema: combinedValidation[pageNumber],
        onSubmit: onSubmit,
      }}
    >
      {/* <Formik {...{ initialValues, validationSchema, onSubmit }}> */}
      {(formik) => {
        const {
          validateForm,
          // setTouched,
          // errors,
          // touched,
          isValid,
          values,
          setFieldValue,
          setFieldTouched,
        } = formik;

        const arr = [
          <Personal
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            locationValue={{
              currentLocationValue: values.currentLocation,
              preferredLocationValue: values.preferredLocation,
            }}
          />,
          <Education />,
          <Professional fresher={values.isFresher} />,
        ];
        const nextButtonHandler = () => {
          for (let key in combinedValidation[pageNumber].fields) {
            setFieldTouched(key);
          }
          if (isValid) {
            setPageNumber((prev) => prev + 1);
          }
        };
        // #2196f308
        return (
          <div className="row m-0">
            <div className="col-lg-6 col-md-10 col-sm-12 col-12 p-0 ps-3 register-form mx-auto">
              <div>
                {isError && (
                  <div className="errorBanner">
                    <span className="errorMessage">{isError}</span>
                    <button
                      onClick={() => setIsError(null)}
                      className="closeBtn"
                    >
                      X
                    </button>
                  </div>
                )}
                <div className="brand-logo px-4">
                  <img
                    src="images/logo.png"
                    alt="company logo"
                    style={{ height: "70px" }}
                  />
                </div>
                {/* <hr className="devider" /> */}
                <div className="pb-5">
                  <div className="container rounded p-3 card shadow">
                    {/* <h2 className="m-0 pb-4"> Register Here</h2> */}
                    <div className="card-body">
                      <Form className="text-start">
                        {arr[pageNumber]}
                        <div className="text-end">
                          {pageNumber !== 0 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary me-2"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setPageNumber((prev) => prev - 1)}
                            >
                              Prev
                            </button>
                          )}
                          {pageNumber !== arr.length - 1 && (
                            <button
                              type="button"
                              className="btn btn-primary"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                validateForm();
                              }}
                              onClick={nextButtonHandler}
                            >
                              Next
                            </button>
                          )}
                          {pageNumber === arr.length - 1 && (
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className="btn btn-primary"
                            >
                              {isSubmitting ? <>Submitting</> : <>Submit</>}
                            </button>
                          )}
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <section className="col-lg-6 d-lg-block d-none p-0">
              <div className="register-form-image">
                <img
                  src="/images/learning-image.svg"
                  alt="Learning firstleep"
                />
              </div>
            </section> */}
          </div>
        );
      }}
    </Formik>
  );
}

export { FormikContainer };
