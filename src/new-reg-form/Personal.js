import React from "react";
import { LocationDropdwon } from "../components/LocationDropdwon";
import { FormikControl } from "../components/reusable formik/FormikControl";
import { useWizard } from "../ui/wizard/wizard-context";
import Form from "../stepper/Form";
import RadioGroup from "../stepper/RadioBtn";
import { DropdwonLocation } from "./DropdownLocation";

export const Personal = React.memo(() => {
  const genderOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Others", value: "others" },
  ];
  const { formik } = useWizard();
  const {
    setFieldValue,
    setFieldTouched,
    values: { currentLocation, preferredLocation },
  } = formik;
  // console.log("gender: ", formik.values.gender);
  // console.log("error: ", formik.errors);
  return (
    <div>
      <label htmlFor="nameFields" className="mb-3">
        Name (As per Govt. ID proof)
      </label>
      <div id="nameFields" className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.middleName}
            touched={formik.touched.middleName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <Form.Input
            type="date"
            name="dob"
            placeholder="DD/MM/YYYY"
            label="Date of Birth"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dob}
            touched={formik.touched.dob}
          />
        </div>
        <label className="mb-3">Gender</label>
        <div className="col-lg-12 flex-row col-md-12 col-sm-12 col-12">
          {/* <FormikControl
            control="radio"
            name="gender"
            label="Gender"
            options={genderOptions}
          /> */}
          {/* <input type={"raadio"} />
          <input type={"raadio"} />
          <input type={"raadio"} /> */}
          {/* <Form.Input
            type="radio"
            name="gender"
            label="Male"
            value={formik.values[gender[0]]}
            // value="male"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[gender[0]]}
            touched={formik.touched[gender[0]]}
            isInline={true}
          />
          <Form.Input
            type="radio"
            name="gender"
            label="Female"
            value={formik.values[gender[1]]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[gender[1]]}
            touched={formik.touched[gender[1]]}
            isInline={true}
          />
          <Form.Input
            type="radio"
            name="gender"
            label="Others"
            value={formik.values[gender[2]]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[gender[2]]}
            touched={formik.touched[gender[2]]}
            isInline={true}
          /> */}
          <RadioGroup
            name="gender"
            // label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gender}
          >
            <RadioGroup.Item value="male">Male</RadioGroup.Item>
            <RadioGroup.Item value="female">Female</RadioGroup.Item>
            <RadioGroup.Item value="others">Others</RadioGroup.Item>
          </RadioGroup>
        </div>
      </div>
      <label htmlFor="contact" className="form-label">
        Contact
      </label>
      <div id="contact" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="primaryContactNumber"
            label=""
            placeholder="Primary Contact Number"
            value={formik.values.primaryContactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.primaryContactNumber}
            touched={formik.touched.primaryContactNumber}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="secondaryContactNumber"
            label=""
            placeholder="Secondary Contact Number"
            value={formik.values.secondaryContactNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.secondaryContactNumber}
            touched={formik.touched.secondaryContactNumber}
          />
        </div>
      </div>
      <div id="contact" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="email"
            name="primaryEmailId"
            label=""
            placeholder="Primary Email ID"
            value={formik.values.primaryEmailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.primaryEmailId}
            touched={formik.touched.primaryEmailId}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="email"
            name="secondaryEmailId"
            label=""
            placeholder="Secondary Email ID"
            value={formik.values.secondaryEmailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.secondaryEmailId}
            touched={formik.touched.secondaryEmailId}
          />
        </div>
      </div>
      <label htmlFor="fathersName" className="form-label">
        Father's Name
      </label>
      <div id="fathersName" className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="fatherFirstName"
            label=""
            placeholder="First Name"
            value={formik.values.fatherFirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fatherFirstName}
            touched={formik.touched.fatherFirstName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="fatherMiddleName"
            label=""
            placeholder="Middle Name"
            value={formik.values.fatherMiddleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fatherMiddleName}
            touched={formik.touched.fatherMiddleName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="fatherLastName"
            label=""
            placeholder="Last Name"
            value={formik.values.fatherLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fatherLastName}
            touched={formik.touched.fatherLastName}
          />
        </div>
      </div>
      <label htmlFor="mothersName" className="form-label">
        Mother's Name
      </label>
      <div id="mothersName" className="row">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="motherFirstName"
            label=""
            placeholder="First Name"
            value={formik.values.motherFirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.motherFirstName}
            touched={formik.touched.motherFirstName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="motherMiddleName"
            label=""
            placeholder="Middle Name"
            value={formik.values.motherMiddleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.motherMiddleName}
            touched={formik.touched.motherMiddleName}
          />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="motherLastName"
            label=""
            placeholder="Last Name"
            value={formik.values.motherLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.motherLastName}
            touched={formik.touched.motherLastName}
          />
        </div>
      </div>
      <label htmlFor="location" className="form-label">
        Location
      </label>
      <div id="location" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          {/* <FormikControl
            control="input"
            name="currentLocation"
            label=""
            placeholder="Current Location"
            type="text"
          /> */}
          {/* <DropdwonLocation
            name="currentLocation"
            placeholder="Current Location"
            locationValue={formik.values.currentLocation}
          /> */}
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          {/* <FormikControl
            control="input"
            name="preferredLocation"
            label=""
            placeholder="Preferred Location"
            type="text"
          /> */}
          {/* <DropdwonLocation
            name="preferredLocation"
            placeholder="Preferred Location"
            locationValue={formik.values.preferredLocation}
          /> */}
        </div>
      </div>
      <label htmlFor="address" className="form-label">
        Address
      </label>
      <div id="address" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.TextArea
            name="currentAddress"
            label=""
            placeholder="Current Address"
            value={formik.values.currentAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.currentAddress}
            touched={formik.touched.currentAddress}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.TextArea
            name="permanentAddress"
            label=""
            placeholder="Permanent Address"
            value={formik.values.permanentAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.permanentAddress}
            touched={formik.touched.permanentAddress}
          />
        </div>
      </div>
    </div>
  );
});
