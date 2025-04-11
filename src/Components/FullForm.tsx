"use client";
import { useContext } from "react";
import { stepContext } from "@/React Context/stepContext";
import Info from "./Step1";
import Plans from "./Step2";
import AddOns from "./Step3";
import Summary from "./Step4";

const FullForm = () => {
  const { step } = useContext(stepContext);

  return (
    <main>
      {step === 1 && <Info />}
      {step === 2 && <Plans />}
      {step === 3 && <AddOns />}
      {step === 4 && <Summary />}
    </main>
  );
};

export default FullForm;
