"use client";

import { createContext, useState, useContext } from "react";

type PlanType = {
  name: string;
  price: number;
};

type AddOnsType = {
  name: string;
  des: string;
  price: number;
};

type FormContextType = {
  name: string;
  email: string;
  phoneNo: string;
  type: "monthly" | "yearly";
  plan: PlanType | null;
  addOns: AddOnsType[];
  updatePersonalInfo: (field: { name: string; value: string }) => void;
  updatePlanType: (type: "monthly" | "yearly") => void;
  updatePlan: (plan: PlanType) => void;
  updateAddOns: (addOn: AddOnsType) => void;
};

// export the formContext 
export const formContext = createContext<FormContextType | null>(null);

const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [type, setType] = useState<"monthly" | "yearly">("monthly");
  const [plan, setPlan] = useState<PlanType | null>(null);
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

  const updatePlanType = (selectedType: "monthly" | "yearly") => {
    setType(selectedType);
  };

  const updatePlan = (selectedPlan: PlanType) => {
    setPlan(selectedPlan);
  };

  const updateAddOns = (selectedAddOn: AddOnsType) => {
    const exists = addOns.find((item) => item.name === selectedAddOn.name);
    if (exists) {
      setAddOns(addOns.filter((item) => item.name !== selectedAddOn.name));
    } else {
      setAddOns([...addOns, selectedAddOn]);
    }
  };

  return (
    <formContext.Provider
      value={{
        name,
        email,
        phoneNo,
        type,
        plan,
        addOns,
        updatePersonalInfo,
        updatePlanType,
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
