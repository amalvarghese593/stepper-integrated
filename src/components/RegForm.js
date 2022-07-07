import React, { useState } from "react";
import axios from "axios";

export const RegForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    async function fetch() {
      try {
        const response = await axios({
          method: "POST",
          // url: `${process.env.REACT_APP_API_URL}/api/form`,
          url: "http://localhost:1337/api/form",
          data: { name, email, password },
          //   headers: { "Content-Type": "application/json" },
        });
        console.log("amal response: ", response.data);
      } catch (error) {
        console.log("amal error: ", error);
      }
    }
    fetch();
    setPassword("");
    setName("");
    setEmail("");
  };
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="container">
      <h2>Reg form</h2>
      <form
        onSubmit={submitHandler}
        className="border rounded text-start w-50 p-3 mx-auto"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputText" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputText"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
