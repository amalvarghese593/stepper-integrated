import React, { cloneElement, Fragment, Children } from "react";

const SelectBox = ({
  name,
  children,
  onChange,
  label,
  onBlur,
  error,
  touched,
  value: inputValue,
}) => {
  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        name: name,
        onChange: onChange,
        onBlur: onBlur,
        error: error,
        inputValue,
      });
    });
  };

  return (
    <div /* className="select-group" */>
      {label && <h5>{label}</h5>}
      <div>
        <select name={name} id="" onChange={onChange} onBlur={onBlur}>
          {renderChildren()}
        </select>
        {error && touched && <label className="text-danger">{error}</label>}
      </div>
    </div>
  );
};

const Item = ({ name, value, children, onChange, onBlur, inputValue }) => {
  //   const isSelected = inputValue === value;

  return (
    <Fragment>
      {/* <input
        type="radio"
        name={name}
        value={value}
        onBlur={onBlur ? onBlur : (e) => {}}
        id={name + "" + value}
        onChange={onChange}
        checked={isSelected}
      />
      <label htmlFor={name + "" + value}>{children}</label> */}
      <option name={name} value={value}>
        {children}
      </option>
    </Fragment>
  );
};

SelectBox.Item = Item;

export default SelectBox;
