import React, { useState, useRef } from "react";
// import { FormikControl } from "./FormikControl";
// import { ResumeUpload } from "./ResumeUpload";
import { FieldArray, Field, FormikProvider } from "formik";
import Form from "../stepper/Form";
import RadioGroup from "../stepper/RadioBtn";
import { useWizard } from "../ui/wizard/wizard-context";

export const Professional = React.memo((/* { fresher } */) => {
  const fresherOptions = [
    { key: "Yes", value: "yes" },
    { key: "No", value: "no" },
  ];
  const { formik } = useWizard();
  // console.log("professional props: ", { fresher });
  console.log("values: ", formik.values);
  // console.log("errors: ", formik.errors);
  const { isFresher } = formik.values;
  // console.log({ isFresher });
  return (
    <div>
      <RadioGroup
        name="isFresher"
        label="Are you a fresher?"
        value={formik.values.isFresher}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.isFresher}
      >
        <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
        <RadioGroup.Item value="no">No</RadioGroup.Item>
      </RadioGroup>
      <div hidden={!(isFresher === "no")}>
        <label htmlFor="company" className="mb-3">
          Current Company
        </label>
        <div id="company" className="row mb-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Input
              type="text"
              name="currentCompanyName"
              placeholder="Company Name"
              value={formik.values.currentCompanyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.currentCompanyName}
              touched={formik.touched.currentCompanyName}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Input
              type="text"
              name="currentDesignation"
              placeholder="Designation"
              value={formik.values.currentDesignation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.currentDesignation}
              touched={formik.touched.currentDesignation}
            />
          </div>
        </div>
      </div>
      <label className="mb-3">Skills</label>
      <div className="row mb-3">
        <FormikProvider value={formik}>
          <FieldArray name="skills">
            {(props) => {
              // prettier-ignore
              const { push, remove, form:{values:{skills,isFresher},errors,touched}} = props;
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
        </FormikProvider>
      </div>
      <div className="row g-3 mb-3" hidden={!(isFresher === "no")}>
        <div className="col-auto pt-2">
          <label>Total Experience</label>
        </div>
        <div className="col-auto">
          {/* <FormikControl
            control="input"
            type="number"
            min="0"
            name="totalExperience"
            placeholder="Total Experience"
          /> */}
          <Form.Input
            type="number"
            min="0"
            name="totalExperience"
            placeholder="Total Experience"
            value={formik.values.totalExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.totalExperience}
            touched={formik.touched.totalExperience}
          />
        </div>
      </div>
      <div className="mb-4">
        {/* <FormikControl
          control="input"
          type="text"
          name="additionalCourses"
          label="Additional Courses or Certification"
          placeholder="Courses / Certification"
        /> */}
        <Form.Input
          type="text"
          name="additionalCourses"
          label="Additional Courses or Certification"
          placeholder="Courses / Certification"
          value={formik.values.additionalCourses}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.additionalCourses}
          touched={formik.touched.additionalCourses}
        />
      </div>
      <div className="mb-3">
        {/* <FormikControl
          control="textarea"
          name="summary"
          label="Profile Summary"
          placeholder="Summary"
          type="text"
        /> */}
        <Form.TextArea
          name="summary"
          label=""
          placeholder="Summary"
          value={formik.values.summary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.summary}
          touched={formik.touched.summary}
        />
      </div>
      {/* <ResumeUpload /> */}
      <div>
        <Form.Input
          type="file"
          name="resume"
          label="Upload Resume"
          // placeholder="Resume"
          accept=".pdf, application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          value={formik.values.resume}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          error={formik.errors.resume}
          touched={formik.touched.resume}
          setTouched={formik.setTouched}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
          isAddCancelButton={true}
        />
      </div>
    </div>
  );
});
