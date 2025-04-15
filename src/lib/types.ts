
export type PlanType = {
  name: string;
  price: number;
};

export type AddOnsType = {
  name: string;
  price: number;
};

export type FormContextType = {
  name: string;
  email: string;
  phoneNo: string;
  billingCycle: "monthly" | "yearly";
  plan: PlanType;
  addOns: AddOnsType[];
  updatePersonalInfo: (field: { name: string; value: string }) => void;
  updateBillingCycle: (type: "monthly" | "yearly") => void;
  updatePlan: (plan: PlanType) => void;
  updateAddOns: (addOn: AddOnsType[]) => void;
};


export type Plans = {
  label: string;
  value: string;
  icon: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

export type CheckBox = {
    id: number,
    name: string,
    description: string, 
    monthlyPrice: number, 
    yearlyPrice: number
}
