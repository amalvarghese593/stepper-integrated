import React, { useState, useRef } from "react";
import { FormikControl } from "./FormikControl";
import { ResumeUpload } from "./ResumeUpload";
import { FieldArray, Field } from "formik";

export const Professional = React.memo(({ fresher }) => {
  const fresherOptions = [
    { key: "Yes", value: "yes" },
    { key: "No", value: "no" },
  ];
  // console.log("professional props: ", { fresher });
  return (
    <div>
      <FormikControl
        control="radio"
        name="isFresher"
        label="Are you a Fresher?"
        options={fresherOptions}
      />
      <div hidden={!(fresher === "no")}>
        <label htmlFor="company" className="mb-3">
          Current Company
        </label>
        <div id="company" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <FormikControl
              control="input"
              type="text"
              name="currentCompanyName"
              placeholder="Company Name"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <FormikControl
              control="input"
              type="text"
              name="currentDesignation"
              placeholder="Designation"
            />
          </div>
        </div>
      </div>
      <label className="mb-3">Skills</label>
      <div className="row mb-3">
        <FieldArray name="skills">
          {(props) => {
            // prettier-ignore
            const { push, remove, form:{values:{skills,isFresher},errors,touched}} = props;
            // console.log(props);
            return (
              <>
                {skills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="row pRelated">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-2">
                        <Field
                          type="text"
                          className="form-control col"
                          name={`skills[${index}].skill`}
                          placeholder="Skill"
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <Field
                          type="number"
                          min="0"
                          className="form-control col"
                          name={`skills[${index}].experience`}
                          placeholder="Experience in Years"
                        />
                      </div>
                      <button
                        style={{ opacity: index ? "1" : "0" }}
                        disabled={!index && true}
                        className="btn btn-light col-auto removeBtn"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        x
                      </button>
                    </div>
                    {isFresher &&
                      errors.skills?.[index] &&
                      touched.skills?.[index]?.skill &&
                      touched.skills?.[index]?.experience && (
                        <div className="text-danger">
                          Please fill in both fields
                        </div>
                      )}
                  </div>
                ))}
                <div className="row mb-3">
                  <div className="col">
                    <button
                      className="btn btn-secondary border border-dark w-30"
                      type="button"
                      onClick={() =>
                        push({
                          skill: "",
                          experience: "",
                        })
                      }
                    >
                      Add Skill
                    </button>
                  </div>
                  {touched.skills && errors.skills === "Required" && (
                    <div className="text-danger">Required</div>
                  )}
                </div>
              </>
            );
          }}
        </FieldArray>
      </div>
      <div className="row g-3 mb-3" hidden={!(fresher === "no")}>
        <div className="col-auto pt-2">
          <label>Total Experience</label>
        </div>
        <div className="col-auto">
          <FormikControl
            control="input"
            type="number"
            min="0"
            name="totalExperience"
            placeholder="Total Experience"
          />
        </div>
      </div>
      <div className="mb-4">
        <FormikControl
          control="input"
          type="text"
          name="additionalCourses"
          label="Additional Courses or Certification"
          placeholder="Courses / Certification"
        />
      </div>
      <div className="mb-3">
        <FormikControl
          control="textarea"
          name="summary"
          label="Profile Summary"
          placeholder="Summary"
          type="text"
        />
      </div>
      <ResumeUpload />
    </div>
  );
});
