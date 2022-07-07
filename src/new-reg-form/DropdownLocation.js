import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { LOCATIONS_DUMMYDATA } from "../components/reusable formik/locations";
import { useWizard } from "../ui/wizard/wizard-context";

export const DropdwonLocation = React.memo(
  ({ name, locationValue, placeholder }) => {
    const { formik } = useWizard();
    console.log(formik.values);
    const { setFieldValue, setFieldTouched, error, touched } = formik;

    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [locationArray, setLocationArray] = useState([]);
    const [focusedListItemIndex, setFocusedListItemIndex] = useState(0);
    const dropdownRef = useRef();
    const focusHandler = (e) => {
      setIsOpen(true);
    };
    const valueHandler = (e) => {
      const typedValue = e.target.value;
      setFieldValue(name, typedValue);
      // setLocationArray(() => {
      //   return locations.filter((location) => {
      //     const regexp = new RegExp(typedValue, "i");
      //     return regexp.test(location);
      //   });
      // });
    };
    const filteredLocations = useMemo(() => {
      // if (!locationValue) {
      //   return locations;
      // }
      return locations.filter((location) => {
        const regexp = new RegExp(locationValue, "i");
        return regexp.test(location);
      });
    }, [locationValue, locations]);
    const itemHandler = (e) => {
      setIsOpen(false);
      setFieldValue(name, e.target.dataset.location);
    };
    const addLocationHandler = () => {
      setIsOpen(false);
    };
    const handleClick = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const blurHandler = () => {
      setFieldTouched(name);
    };
    const keyDownHandler = (e) => {
      if (e.key === "Tab") setIsOpen(false);
      if (e.key === "Enter") {
        setIsOpen(false);
        if (e.target.dataset.location)
          setFieldValue(name, e.target.dataset.location);
        if (
          e.target.nodeName === "INPUT" &&
          filteredLocations.length &&
          locationValue
        )
          setFieldValue(name, filteredLocations[0]);
        dropdownRef.current.querySelector(".form-control").blur();
      }
      if (e.key === "ArrowDown") {
        if (focusedListItemIndex < 4) e.preventDefault();
        dropdownRef.current
          .querySelectorAll(".list-group-item")
          [focusedListItemIndex]?.focus();
        setFocusedListItemIndex((prev) =>
          prev === filteredLocations.length - 1 ? 0 : prev + 1
        );
      }
      if (e.key === "ArrowUp") {
        dropdownRef.current
          .querySelectorAll(".list-group-item")
          [focusedListItemIndex - 2]?.focus();
        setFocusedListItemIndex((prev) => (prev < 3 ? 0 : prev - 1));
      }
    };
    useEffect(() => {
      document.body.addEventListener("click", handleClick);
      const fetch = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            // "https://testing.webpipl.com/api/v1/userRegistration/getLocations"
            // `${process.env.REACT_APP_API_URL}/api/v1/userRegistration/getLocations`
            `${process.env.REACT_APP_API_URL}/api/v1/users/getLocations`
            // "http://localhost:1337/getLocations"
          );
          console.log(response);
          setLocations(response.data.data[0].locations);
          setIsLoading(false);
        } catch (error) {
          setLocations(LOCATIONS_DUMMYDATA);
          setIsLoading(false);
          console.log(error);
        }
      };
      fetch();
      console.log(process.env.REACT_APP_API_URL);
      return () => document.body.removeEventListener("click", handleClick);
    }, []);
    useEffect(() => setFocusedListItemIndex(0), [filteredLocations.length]);
    // useEffect(() => {
    //   setLocationArray(locations);
    // }, [locations]);
    return (
      <div
        ref={dropdownRef}
        onKeyDown={keyDownHandler}
        className="mb-3 inputSelect"
      >
        {/* <Field name={name}>
          {(props) => {
            return ( */}
        <>
          <input
            type="text"
            placeholder={placeholder}
            className="form-control"
            onChange={valueHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            name={name}
            value={formik.values[name]}
          />
        </>
        {/* );
          }}
        </Field> */}
        {isOpen && !isLoading && (
          <ul className="list-group locationsList">
            {isLoading && <li>Loading...</li>}
            {!isLoading &&
              filteredLocations.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li
                      data-location={item}
                      className="list-group-item"
                      onClick={itemHandler}
                      tabIndex="-1"
                    >
                      {item}
                    </li>
                  </React.Fragment>
                );
              })}
            {filteredLocations.length === 0 && (
              <li className="list-group-item">
                <button
                  onClick={addLocationHandler}
                  className="btn btn-primary"
                >
                  Add New Location
                </button>
              </li>
            )}
            {/* {locationArray.map((item, index) => (
              <React.Fragment key={index}>
                <li
                  data-location={item}
                  className="list-group-item"
                  onClick={itemHandler}
                >
                  {item}
                </li>
              </React.Fragment>
            ))}
            {locationArray.length === 0 && (
              <li className="list-group-item">
                <button
                  onClick={addLocationHandler}
                  className="btn btn-primary"
                >
                  Add New Location
                </button>
              </li>
            )} */}
          </ul>
        )}
        {/* <ErrorMessage name={name} component={TextError} /> */}
        {error && touched && (
          <div className="validation-message-container">
            <p className="text-danger validation-message">{error}</p>
          </div>
        )}
      </div>
    );
  }
);
