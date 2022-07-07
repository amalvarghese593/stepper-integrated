import React from "react";

export const Form2 = ({ setIndex }) => {
  return (
    <div className="container border border-primary w-50 p-3 my-3">
      <h2>2</h2>
      <button
        className="btn btn-primary mx-3"
        onClick={() => setIndex((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setIndex((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};
