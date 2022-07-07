import React, { cloneElement, Fragment, Children } from "react";

const RadioGroup = ({
  name,
  children,
  onChange,
  label,
  onBlur,
  error,
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
    <div className="radio-group">
      {label && <h5>{label}</h5>}
      <div className="d-flex">
        {renderChildren()}
        {error && <label className="text-danger">{error}</label>}
      </div>
    </div>
  );
};

const Item = ({ name, value, children, onChange, onBlur, inputValue }) => {
  const isSelected = inputValue === value;

  return (
    <Fragment>
      <input
        type="radio"
        name={name}
        value={value}
        onBlur={onBlur ? onBlur : (e) => {}}
        id={name + "" + value}
        onChange={onChange}
        checked={isSelected}
      />
      <label htmlFor={name + "" + value}>{children}</label>
    </Fragment>
  );
};

RadioGroup.Item = Item;

export default RadioGroup;
