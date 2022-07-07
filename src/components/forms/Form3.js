import React from "react";

export const Form3 = ({ setIndex }) => {
  return (
    <div className="container border border-primary w-50 p-3">
      <h2>3</h2>
      <button
        className="btn btn-primary mx-3"
        onClick={() => setIndex((prev) => prev - 1)}
      >
        Previous
      </button>
      <button className="btn btn-primary">Submit</button>
    </div>
  );
};
