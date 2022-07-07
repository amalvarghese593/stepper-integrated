import React from "react";

export const Form1 = ({ setIndex }) => {
  return (
    <div className="container border border-primary w-50 p-3">
      <h2>1</h2>
      <button
        className="btn btn-primary"
        onClick={() => setIndex((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};
