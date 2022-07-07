import React, { useState } from "react";
import { Form1 } from "./Form1";
import { Form2 } from "./Form2";
import { Form3 } from "./Form3";

export const SwitchingForms = () => {
  const [index, setIndex] = useState(0);
  const arr = [
    <Form1 setIndex={setIndex} />,
    <Form2 setIndex={setIndex} />,
    <Form3 setIndex={setIndex} />,
  ];
  return (
    <div>
      <h2>Forms</h2>
      {arr[index]}
    </div>
  );
};
