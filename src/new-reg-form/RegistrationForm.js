import React from "react";
import * as Yup from "yup";
import Wizard from "../ui/wizard/Wizard";
import { StepperLatest } from "../stepper/StepperLatest";
import { Personal } from "./Personal";
import { Education } from "./Education";
import { Professional } from "./Professional";
import "../stepper/signup.css";
import { useWizard } from "../ui/wizard/wizard-context";

export const RegistrationForm = () => {
  const steps = ["Personal", "Education", "Professional"];
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "male",
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
    pucSpecialisation: "",
    pucYOP: "",
    pucPercentage: "",
    pucUniName: "",
    pucSchoolName: "",
    tenthYOP: "",
    tenthPercentage: "",
    tenthUniName: "",
    tenthSchoolName: "",
    isFresher: "no",
    currentCompanyName: "",
    currentDesignation: "",
    skills: [],
    totalExperience: "",
    additionalCourses: "",
    summary: "",
    resume: "",
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
    primaryEmailId: Yup.string().email("Invalid Email").required("Required"),
    secondaryEmailId: Yup.string()
      .email("Invalid Email")
      .test("secondaryEmailId", "Use another Email", function (val) {
        return !(
          this.parent.primaryEmailId && val === this.parent.primaryEmailId
        );
      }),
    fatherFirstName: Yup.string().required("Required"),
    fatherMiddleName: Yup.string(),
    fatherLastName: Yup.string().required("Required"),
    motherFirstName: Yup.string().required("Required"),
    motherMiddleName: Yup.string(),
    motherLastName: Yup.string().required("Required"),
    // currentLocation: Yup.string().required("Required"),
    // preferredLocation: Yup.string().required("Required"),
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
    pucSpecialisation: Yup.string().required("Required"),
    pucYOP: Yup.string().required("Required"),
    pucPercentage: Yup.number().required("Required"),
    pucUniName: Yup.string().required("Required"),
    pucSchoolName: Yup.string().required("Required"),
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
        return val && val.size <= 10 ** 6;
      }),
  });
  const validation = [page1Validation, page2Validation, page3Validation];
  return (
    // <div>
    <div className="container rounded w-50 p-3 card shadow">
      <Wizard
        steps={steps}
        initialValues={initialValues}
        validation={validation}
        orientation="horizontal"
        // orientation="vertical"
      >
        <StepperLatest>
          <Wizard.Step
            optional={[
              "middleName",
              "secondaryContactNumber",
              "secondaryEmailId",
              "fatherMiddleName",
              "motherMiddleName",
            ]}
          >
            <Personal />
          </Wizard.Step>
          <Wizard.Step /* optional={[]} */>
            <Education />
          </Wizard.Step>
          <Wizard.Step>
            <Professional />
          </Wizard.Step>
        </StepperLatest>
      </Wizard>
    </div>
    // </div>
  );
};
