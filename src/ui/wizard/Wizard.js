import React, { useEffect, useCallback, useState } from "react";
import { useWizard, WizardContext } from "./wizard-context";
import { useFormik } from "formik";

function Wizard({
  children,
  steps,
  validation,
  initialValues,
  orientation: defaultOrientation = "horizontal",
}) {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState({});
  const totalPages = steps.length;
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setOrientation("vertical");
      } else {
        setOrientation(defaultOrientation);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextButtonHandler = useCallback(
    (values, bag) => {
      if (step === totalPages) {
        setIsCompleted((prev) => ({ ...prev, [step - 1]: true }));
        alert("Final Submit");
      }
      if (step < totalPages) {
        setStep((prev) => prev + 1);
        setIsCompleted((prev) => ({ ...prev, [step - 1]: true }));
        bag.setTouched({});
        bag.setSubmitting(false);
      }
    },
    [step]
  );

  const formik = useFormik({
    initialValues,
    validationSchema: validation[step - 1],
    validateOnMount: true,
    onSubmit: nextButtonHandler,
  });
  // console.log("errors ", formik.errors);
  // console.log("values ", formik.values);
  const prevButtonHandler = useCallback(() => {
    setStep((prev) => prev - 1);
    formik.setErrors({});
  }, []);

  useEffect(() => {
    formik.validateForm();
  }, [step]);

  const contextValue = {
    step,
    setStep,
    steps,
    totalPages,
    formik,
    validation,
    prevButtonHandler,
    isCompleted,
    setIsCompleted,
    orientation: orientation,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      <form onSubmit={formik.handleSubmit} className="stepper-form">
        {children}
      </form>
    </WizardContext.Provider>
  );
}

export default Wizard;

const Step = ({ children }) => {
  const { formik, step, totalPages, prevButtonHandler } = useWizard();

  return (
    <>
      <div className="step-container-wrapper">
        <div className="form-btn-wrapper">
          <section className="step-section">{children}</section>
          <div className="button-container">
            {step !== 1 && (
              <button
                type="button"
                onClick={prevButtonHandler}
                className="btn btn-light me-3"
              >
                Previous
              </button>
            )}
            {step !== totalPages ? (
              <button
                type="button"
                onClick={formik.isValid ? formik.handleSubmit : () => {}}
                className="btn btn-primary"
                disabled={!formik.isValid}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={formik.isValid ? formik.handleSubmit : () => {}}
                disabled={!formik.isValid}
                className="btn btn-primary"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
Wizard.Step = Step;
