import React from "react";
import { useWizard } from "../ui/wizard/wizard-context";

export const StepperLatest = ({ children }) => {
  const {
    steps,
    step,
    setStep,
    isCompleted,
    validation,
    orientation,
    setIsCompleted,
    formik: { setTouched, values },
  } = useWizard();

  const stepHandler = (index) => {
    // console.log(validation[index - 1]);
    if (!index) return setStep(index + 1);
    for (let i = 1; i < index + 1; i++) {
      for (const key in validation[i - 1].fields) {
        console.log(validation[i - 1].fields[key]);
        if (!values[key]) return;
      }
    }
    setStep(index + 1);
    setIsCompleted((prev) => ({ ...prev, [index - 1]: true }));
    setTouched({});
  };
  let classes = "wrapper-stepper";
  if (orientation === "horizontal") classes += " align-stepper-horizontally";
  return (
    <>
      <div className={classes}>
        {steps.map((el, index) => {
          return (
            <div key={el} className="stepper-container">
              <div
                // onClick={() => stepHandler(index)}
                className="step-btn-value-container"
              >
                <div className="step-icon-container">
                  {isCompleted[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="#06c"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  ) : (
                    <span
                      className="step-value"
                      style={{
                        backgroundColor:
                          step === index + 1 ? "#0c74ff" : "#f9f9fb",
                        color: step === index + 1 ? "#fff" : "#000",
                      }}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <button type="button" className="step-button">
                  {el}
                </button>
              </div>
              {orientation === "vertical" && (
                <div className="horizontal-divider"></div>
              )}
              {step === index + 1 &&
                orientation === "vertical" &&
                children[step - 1]}
            </div>
          );
        })}
        {/* {orientation === "vertical" && <div className="vertical-line"></div>} */}
      </div>
      {orientation === "horizontal" && (
        <div className="horizontal-divider"></div>
      )}
      {orientation === "horizontal" && children[step - 1]}
    </>
  );
};
