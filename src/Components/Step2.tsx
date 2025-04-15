"use client";

import { useMultiFormContext } from "@/React Context/formContext";
import {  useStepContext } from "@/React Context/stepContext";
import { Button } from "./ui/button";
import FormFeild from "./FormFeild";
import { Form } from "./ui/form";
import { UseFormReturn } from "react-hook-form";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { plans } from "@/lib/data";
import { FullFormSchemaType } from "@/lib/formSchema";

const Plans = ({ form }: { form: UseFormReturn<FullFormSchemaType> }) => {
  const { step, setStep, setIsComplete } = useStepContext()
  const { updateBillingCycle, updatePlan, billingCycle } =
    useMultiFormContext();

  function onSubmit(values: FullFormSchemaType) {
    const selectedPlan = plans.find((plan) => plan.value === values.plan);

    if (!selectedPlan) return "Invalid plan Selected";

    const price =
      billingCycle === "monthly"
        ? selectedPlan.monthlyPrice
        : selectedPlan.yearlyPrice;

    const obj = { name: selectedPlan.value, price };
    updatePlan(obj);

    setIsComplete((prev) => ({
      ...prev,
      [step]: true,
    }));

    if (step < 4) setStep(step + 1);
  }

  const handleback = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <aside className="p-5 pl-9">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormFeild
            control={form.control}
            name="plan"
            type="radio"
            options={plans}
            billingCycle={billingCycle}
          />

          <div className="flex justify-center mt-7 items-center space-x-6">
            <Label>Monthly</Label>
            <Switch
              className="cursor-pointer"
              checked={billingCycle === "yearly"} // Reflects current state
              onCheckedChange={(checked) => {
                updateBillingCycle(checked ? "yearly" : "monthly");
              }}
            />
            <Label>Yearly</Label>
          </div>

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

export default Plans;
