import React, { Suspense, lazy } from "react";
import "./App.css";
import { RegForm } from "./components/RegForm";
import { Route, Routes, Navigate } from "react-router-dom";
import { SwitchingForms } from "./components/forms/SwitchingForms";
import { FormikForm } from "./components/formik/FormikForm";
import { NewFormik } from "./components/formik/NewFormik";
import { FormikContainer } from "./components/reusable formik/FormikContainer";
import ReusableSuspense from "./ReusableSuspense";
import RegistrationSuccessful from "./RegistrationSuccessful";
import UserInformation from "./components/UserInformation";
import { RegistrationForm } from "./new-reg-form/RegistrationForm";

const Login = lazy(() => import("./components/Login"));
const Admin = lazy(() => import("./components/Admin"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={ReusableSuspense}>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/reg" element={<RegForm />} />
          <Route path="/regnew" element={<RegistrationForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forms" element={<SwitchingForms />} />
          <Route path="/formik" element={<FormikForm />} />
          <Route path="/newformik" element={<NewFormik />} />
          <Route path="/register" element={<FormikContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:id" element={<UserInformation />} />
          <Route
            path="/registration-completed"
            element={<RegistrationSuccessful />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
