import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { LOCATIONS_DUMMYDATA } from "./reusable formik/locations";
import { Field, ErrorMessage } from "formik";
import TextError from "./reusable formik/TextError";

export const LocationDropdwon = React.memo(
  ({ setFieldValue, setFieldTouched, name, locationValue, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [locationArray, setLocationArray] = useState([]);
    const [focusedListItemIndex, setFocusedListItemIndex] = useState(0);

    //visualization
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(10);
    const scrollRef = useRef(0);
    // console.log(firstItemIndex);
    // console.log(lastItemIndex);
    const [paddingValue, setPaddingValue] = useState(0);
    const [dropdownHeight, setDropdownHeight] = useState(205);

    const dropdownRef = useRef();
    const focusHandler = (e) => {
      setIsOpen(true);
    };

    //aborting axios request
    /*  useEffect(() => {
      const controller = new AbortController();

      const fetch = async () => {
        try {
          const res = await axios.get(
            "https://deelay.me/5000/https://picsum.photos/200/300",
            {
              signal: controller.signal,
            }
          );
          console.log("res fulfilled");
        } catch (error) {
          console.log("aml: ", error);
        }
      };
      fetch();

      return () => {
        controller.abort();
        console.log("aborted request");
      };
    }, []); */

    const timeout = useRef();
    const valueHandler = (e) => {
      clearTimeout(timeout.current);

      const typedValue = e.target.value;
      setFieldValue(name, typedValue);
      //to remove dropdown on backspacing entire content
      if (locationValue.length === 1) setLocations([]);

      const fetch = async () => {
        try {
          // setIsLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/v1/users/getLocations?search=${typedValue}`
          );
          setIsLoading(false);
          const locationObj = response.data.data;
          setLocations(locationObj.slice(0, 15));
        } catch (error) {
          setIsLoading(false);
          console.log({ error });
        }
      };
      if (typedValue.length >= 2) {
        setIsLoading(true);
        timeout.current = setTimeout(() => {
          fetch();
        }, 3000);
      }
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
      return locations.filter((locationObj) => {
        const regexp = new RegExp(locationValue, "i");
        return regexp.test(locationObj.location);
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
      /*     const fetch = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            // "https://testing.webpipl.com/api/v1/userRegistration/getLocations"
            // `${process.env.REACT_APP_API_URL}/api/v1/userRegistration/getLocations`
            `${process.env.REACT_APP_API_URL}/api/v1/users/getLocations`
            // `http://localhost:3000/api/v1/users/getLocations`
            // "http://localhost:1337/getLocations"
          );
          console.log("res: ", response);
          setLocations(response.data.data);
          // console.log({ response });
          // setLocations(response.data);
          setIsLoading(false);
        } catch (error) {
          setLocations(LOCATIONS_DUMMYDATA);
          setIsLoading(false);
          console.log(error);
        }
      };
      fetch();
      console.log(process.env.REACT_APP_API_URL); */
      return () => document.body.removeEventListener("click", handleClick);
    }, []);
    useEffect(() => setFocusedListItemIndex(0), [filteredLocations.length]);
    // useEffect(() => {
    //   setLocationArray(locations);
    // }, [locations]);
    const scrollEventHandler = (e) => {
      const currentScrollPosition = e.target.scrollTop;
      console.log({ currentScrollPosition });
      // console.log("ref val: ", scrollRef.current);
      if (currentScrollPosition >= dropdownHeight) {
        const previousScrollPosition = scrollRef.current;
        setFirstItemIndex((prev) =>
          previousScrollPosition < dropdownHeight ? prev + 10 : prev
        );
        setLastItemIndex((prev) =>
          previousScrollPosition < dropdownHeight ? prev + 10 : prev
        );
        setPaddingValue((prev) =>
          previousScrollPosition < dropdownHeight ? prev + 205 : prev
        );
        setDropdownHeight((prev) => prev + 205);
      }
      if (currentScrollPosition === 0) {
        setFirstItemIndex((prev) => (prev ? prev - 10 : prev));
        setLastItemIndex((prev) => (prev === 10 ? prev : prev - 10));
      }
      scrollRef.current = currentScrollPosition;
    };

    return (
      <div
        ref={dropdownRef}
        onKeyDown={keyDownHandler}
        className="mb-3 inputSelect"
      >
        <Field name={name}>
          {(props) => {
            return (
              <>
                <input
                  type="text"
                  placeholder={placeholder}
                  className="form-control"
                  onChange={valueHandler}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                  value={props.form.values?.[name]}
                />
              </>
            );
          }}
        </Field>
        {isOpen && !isLoading && (
          <div className="locationsList-container">
            <ul
              className="list-group locationsList"
              // onScroll={scrollEventHandler}
              style={{ paddingTop: paddingValue }}
            >
              {isLoading && <li>Loading...</li>}
              {!isLoading &&
                filteredLocations
                  // .slice(firstItemIndex, lastItemIndex)
                  .map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <li
                          data-location={item.location}
                          className="list-group-item"
                          onClick={itemHandler}
                          tabIndex="-1"
                        >
                          {item.location}
                        </li>
                      </React.Fragment>
                    );
                  })}
              {filteredLocations.length === 0 &&
                locationValue.length >= 2 &&
                !isLoading && (
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
          </div>
        )}
        <ErrorMessage name={name} component={TextError} />
      </div>
    );
  }
);
