import React from "react";
import { MASTERS, YEAR_OF_PASSING, BACHELORS } from "../components/data";
import Form from "../stepper/Form";
import SelectBox from "../stepper/SelectBox";
import { useWizard } from "../ui/wizard/wizard-context";
// import { FormikControl } from "./FormikControl";

export const Education = React.memo(() => {
  const mastersPlaceholder = "-- Select Masters --";
  const arrMasters = MASTERS.slice();
  arrMasters.splice(0, 0, mastersPlaceholder);

  const bachelorsPlaceholder = "-- Select Bachelors --";
  const arrBachelors = BACHELORS.slice();
  arrBachelors.splice(0, 0, bachelorsPlaceholder);

  const yopPlaceholder = "-- Select Passing year --";
  const arrYop = YEAR_OF_PASSING.slice();
  arrYop.splice(0, 0, yopPlaceholder, "Pursuing");

  const { formik } = useWizard();
  console.log("values: ", formik.values);
  console.log("errors: ", formik.errors);
  return (
    <div>
      <label htmlFor="masterFields" className="mb-3">
        Masters (If any)
      </label>
      <div id="masterFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="masters"
            value={formik.values.masters}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.masters}
            touched={formik.touched.masters}
          >
            <SelectBox.Item value="">--Select Masters--</SelectBox.Item>
            {MASTERS.map((master, index) => (
              <SelectBox.Item value={master} key={master + index}>
                {master}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="mastersSpecialisation"
            placeholder="Specialisation"
            value={formik.values.mastersSpecialisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mastersSpecialisation}
            touched={formik.touched.mastersSpecialisation}
          />
        </div>
      </div>
      <div id="nameFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="mastersYOP"
            value={formik.values.mastersYOP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mastersYOP}
            touched={formik.touched.mastersYOP}
          >
            <SelectBox.Item value="">-- Select Passing year --</SelectBox.Item>
            <SelectBox.Item value="pursuing">Pursuing</SelectBox.Item>
            {YEAR_OF_PASSING.map((year) => (
              <SelectBox.Item value={year} key={year}>
                {year}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="number"
            min="0"
            name="mastersPercentage"
            placeholder="Percentage"
            value={formik.values.mastersPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mastersPercentage}
            touched={formik.touched.mastersPercentage}
          />
        </div>
      </div>
      <div id="nameFields" className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="mastersUniName"
            placeholder="University Name"
            value={formik.values.mastersUniName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mastersUniName}
            touched={formik.touched.mastersUniName}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="mastersCollegeName"
            placeholder="College Name"
            value={formik.values.mastersCollegeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mastersCollegeName}
            touched={formik.touched.mastersCollegeName}
          />
        </div>
      </div>
      <label htmlFor="gradFields" className="mb-3">
        Graduation
      </label>
      <div id="gradFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="graduation"
            value={formik.values.graduation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.graduation}
            touched={formik.touched.graduation}
          >
            <SelectBox.Item value="">--Select Bachelors--</SelectBox.Item>
            {BACHELORS.map((bachelor, index) => (
              <SelectBox.Item value={bachelor} key={bachelor + index}>
                {bachelor}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="gradSpecialisation"
            placeholder="Specialisation"
            value={formik.values.gradSpecialisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gradSpecialisation}
            touched={formik.touched.gradSpecialisation}
          />
        </div>
      </div>
      <div id="nameFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="gradYOP"
            value={formik.values.gradYOP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gradYOP}
            touched={formik.touched.gradYOP}
          >
            <SelectBox.Item value="">-- Select Passing year --</SelectBox.Item>
            <SelectBox.Item value="pursuing">Pursuing</SelectBox.Item>
            {YEAR_OF_PASSING.map((year) => (
              <SelectBox.Item value={year} key={year}>
                {year}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="number"
            min="0"
            name="gradPercentage"
            placeholder="Percentage"
            value={formik.values.gradPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gradPercentage}
            touched={formik.touched.gradPercentage}
          />
        </div>
      </div>
      <div id="nameFields" className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="gradUniName"
            placeholder="University Name"
            value={formik.values.gradUniName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gradUniName}
            touched={formik.touched.gradUniName}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="gradCollegeName"
            placeholder="College Name"
            value={formik.values.gradCollegeName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.gradCollegeName}
            touched={formik.touched.gradCollegeName}
          />
        </div>
      </div>
      <label htmlFor="pucFields" className="mb-3">
        XII
      </label>
      <div id="pucFields" className="row mb-3">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="pucSpecialisation"
            placeholder="Specialisation"
            value={formik.values.pucSpecialisation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pucSpecialisation}
            touched={formik.touched.pucSpecialisation}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="pucYOP"
            value={formik.values.pucYOP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pucYOP}
            touched={formik.touched.pucYOP}
          >
            <SelectBox.Item value="">-- Select Passing year --</SelectBox.Item>
            <SelectBox.Item value="pursuing">Pursuing</SelectBox.Item>
            {YEAR_OF_PASSING.map((year) => (
              <SelectBox.Item value={year} key={year}>
                {year}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="number"
            min="0"
            name="pucPercentage"
            placeholder="Percentage"
            value={formik.values.pucPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pucPercentage}
            touched={formik.touched.pucPercentage}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="pucUniName"
            placeholder="Board Name"
            value={formik.values.pucUniName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pucUniName}
            touched={formik.touched.pucUniName}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="pucSchoolName"
            placeholder="School Name"
            value={formik.values.pucSchoolName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pucSchoolName}
            touched={formik.touched.pucSchoolName}
          />
        </div>
      </div>
      <label htmlFor="tenthFields" className="mb-3">
        X
      </label>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <SelectBox
            name="tenthYOP"
            value={formik.values.tenthYOP}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.tenthYOP}
            touched={formik.touched.tenthYOP}
          >
            <SelectBox.Item value="">-- Select Passing year --</SelectBox.Item>
            <SelectBox.Item value="pursuing">Pursuing</SelectBox.Item>
            {YEAR_OF_PASSING.map((year) => (
              <SelectBox.Item value={year} key={year}>
                {year}
              </SelectBox.Item>
            ))}
          </SelectBox>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="number"
            min="0"
            name="tenthPercentage"
            placeholder="Percentage"
            value={formik.values.tenthPercentage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.tenthPercentage}
            touched={formik.touched.tenthPercentage}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="tenthUniName"
            placeholder="Board Name"
            value={formik.values.tenthUniName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.tenthUniName}
            touched={formik.touched.tenthUniName}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <Form.Input
            type="text"
            name="tenthSchoolName"
            placeholder="School Name"
            value={formik.values.tenthSchoolName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.tenthSchoolName}
            touched={formik.touched.tenthSchoolName}
          />
        </div>
      </div>
    </div>
  );
});
