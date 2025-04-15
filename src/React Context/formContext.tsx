"use client";

import { AddOnsType, FormContextType, PlanType } from "@/lib/types";
import { createContext, useState, useContext } from "react";

// export the formContext
export const formContext = createContext<FormContextType | null>(null);

const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [plan, setPlan] = useState<PlanType>({ name: "arcade", price: 9 });
  const [addOns, setAddOns] = useState<AddOnsType[]>([]);

  const updatePersonalInfo = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "phoneNo") setPhoneNo(value);
  };

  const updateBillingCycle = (selectedType: "monthly" | "yearly") => {
    setBillingCycle(selectedType);
  };

  const updatePlan = (selectedPlan: PlanType) => {
    setPlan(selectedPlan);
  };

  const updateAddOns = (selectedAddOn: AddOnsType[]) => {
    setAddOns(selectedAddOn);
  };

  return (
    <formContext.Provider
      value={{
        name,
        email,
        phoneNo,
        billingCycle,
        plan,
        addOns,
        updatePersonalInfo,
        updateBillingCycle,
        updatePlan,
        updateAddOns,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export default FormContextProvider;

export const useMultiFormContext = () => {
  const context = useContext(formContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormContextProvider");
  }
  return context;
};
