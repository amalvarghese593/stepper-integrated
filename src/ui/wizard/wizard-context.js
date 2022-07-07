import { createContext, useContext } from "react";

export const WizardContext = createContext({
  steps: [],
  totalPages: null,
  orientation: "",
  step: 1,
  setStep: () => {},
  validation: [],
  formik: {},
  prevButtonHandler: () => {},
  isCompleted: false,
  setIsCompleted: () => {},
});

export const useWizard = () => useContext(WizardContext);
