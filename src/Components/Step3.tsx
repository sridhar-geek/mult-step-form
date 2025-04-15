import { useMultiFormContext } from "@/React Context/formContext";
import { stepContext } from "@/React Context/stepContext";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { UseFormReturn } from "react-hook-form";
import { checkboxData } from "@/lib/data";
import FormFeild from "./FormFeild";
import { AddOnsType } from "@/lib/types";
import { FullFormSchemaType } from "@/lib/formSchema";

const AddOns = ({ form }: { form: UseFormReturn<FullFormSchemaType> }) => {
  const { step, setStep, setIsComplete } = useContext(stepContext);
  const { billingCycle, updateAddOns } = useMultiFormContext();

  const onSubmit = (values: FullFormSchemaType) => {
    if (!values.addons) return;

    const checkboxMap = new Map(
      checkboxData.map((item) => [item.name.toLowerCase(), item])
    );

    // ✅ Loop through selected addon names and find their price directly
    const newArray: AddOnsType[] = values.addons.map((name) => {
      const item = checkboxMap.get(name.toLowerCase());
      return {
        name,
        price:
          billingCycle === "monthly" ? item!.monthlyPrice : item!.yearlyPrice,
      };
    });

    updateAddOns(newArray);

    setIsComplete((prev) => ({
      ...prev,
      [step]: true,
    }));

    if (step < 4) setStep(step + 1);
  };

  const handleback = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <aside className="p-5 pl-9">
      <h1 className="text-2xl text-blue-400 font-bold">Pick add-ons</h1>
      <p className="text-gray-500 pb-10">
        Add-ons help enhance your gaming experience
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFeild
            control={form.control}
            name={"addons"}
            type="checkbox"
            checkboxOptions={checkboxData}
            billingCycle={billingCycle}
          />
          {/* Desktop Button */}
          <div className="hidden md:flex justify-between items-center">
            <Button className="cursor-pointer" onClick={handleback}>
              Go Back
            </Button>
            <Button type="submit" className="cursor-pointer">
              Next Step
            </Button>
          </div>

          {/* Mobile Fixed Button */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
            <Button className="" onClick={handleback}>
              Go Back
            </Button>{" "}
            <Button type="submit" className="">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default AddOns;
