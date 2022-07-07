import React from "react";
import { MASTERS, YEAR_OF_PASSING, BACHELORS } from "../data";
import { FormikControl } from "./FormikControl";

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

  return (
    <div>
      <label htmlFor="masterFields" className="mb-3">
        Masters (If any)
      </label>
      <div id="masterFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="masters"
            placeholder={mastersPlaceholder}
            options={arrMasters}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="mastersSpecialisation"
            placeholder="Specialisation"
          />
        </div>
      </div>
      <div id="nameFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="mastersYOP"
            placeholder={yopPlaceholder}
            options={arrYop}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="number"
            min="0"
            name="mastersPercentage"
            placeholder="Percentage"
          />
        </div>
      </div>
      <div id="nameFields" className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="mastersUniName"
            placeholder="University Name"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="mastersCollegeName"
            placeholder="College Name"
          />
        </div>
      </div>
      <label htmlFor="gradFields" className="mb-3">
        Graduation
      </label>
      <div id="gradFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="graduation"
            placeholder={bachelorsPlaceholder}
            options={arrBachelors}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="gradSpecialisation"
            placeholder="Specialisation"
          />
        </div>
      </div>
      <div id="nameFields" className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="gradYOP"
            placeholder={yopPlaceholder}
            options={arrYop}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="number"
            min="0"
            name="gradPercentage"
            placeholder="Percentage"
          />
        </div>
      </div>
      <div id="nameFields" className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="gradUniName"
            placeholder="University Name"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="gradCollegeName"
            placeholder="College Name"
          />
        </div>
      </div>
      <label htmlFor="pucFields" className="mb-3">
        XII
      </label>
      <div id="pucFields" className="row mb-3">
        {/* <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="puc"
            placeholder="Higher Secondary"
          />
        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="pucSpecialisation"
            placeholder="Specialisation"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="pucYOP"
            placeholder={yopPlaceholder}
            options={arrYop}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="number"
            min="0"
            name="pucPercentage"
            placeholder="Percentage"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="pucUniName"
            placeholder="Board Name"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="pucSchoolName"
            placeholder="School Name"
          />
        </div>
      </div>
      <label htmlFor="tenthFields" className="mb-3">
        X
      </label>
      <div id="tenthFields" className="row">
        {/* <div className="col-12">
          <FormikControl
            control="input"
            type="text"
            name="tenth"
            placeholder="10th grade"
          />
        </div> */}
        {/* <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="pucSpecialisation"
            placeholder="Specialisation"
          />
        </div> */}
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="select"
            name="tenthYOP"
            placeholder={yopPlaceholder}
            options={arrYop}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="number"
            min="0"
            name="tenthPercentage"
            placeholder="Percentage"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="tenthUniName"
            placeholder="Board Name"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <FormikControl
            control="input"
            type="text"
            name="tenthSchoolName"
            placeholder="School Name"
          />
        </div>
      </div>
    </div>
  );
});
