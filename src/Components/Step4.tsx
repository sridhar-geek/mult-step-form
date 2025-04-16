import { useMultiFormContext } from "@/React Context/formContext";
import { useStepContext } from "@/React Context/stepContext";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { checkboxData, plans } from "@/lib/data";

const Summary = () => {
  const {
    name,
    email,
    phoneNo,
    plan,
    addOns,
    billingCycle,
    updateAddOns,
    updatePlan,
  } = useMultiFormContext();
  const { setStep, step } = useStepContext();

  useEffect(() => {
    // Create a lookup map for add-ons
    const checkboxMap = new Map(
      checkboxData.map((item) => [item.name.toLowerCase(), item])
    );

    // Update AddOns with new prices based on current billing cycle
    const updatedAddOns = addOns.map((addOn) => {
      const item = checkboxMap.get(addOn.name.toLowerCase());
      return {
        name: addOn.name,
        price:
          billingCycle === "monthly"
            ? item?.monthlyPrice || 0
            : item?.yearlyPrice || 0,
      };
    });

    updateAddOns(updatedAddOns);

    // Update selected plan price
    const selectedPlan = plans.find((p) => p.value === plan.name);
    if (!selectedPlan) return;

    const updatedPlan = {
      name: selectedPlan.value,
      price:
        billingCycle === "monthly"
          ? selectedPlan.monthlyPrice
          : selectedPlan.yearlyPrice,
    };

    updatePlan(updatedPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingCycle]);

  const calculatePrice = () => {
    const totalPrice = addOns.reduce(
      (price, addOn) => (price += addOn.price),
      0
    );
    return totalPrice + plan.price;
  };
  const handleback = () => {
    if (step > 1) setStep(step - 1);
  };
  console.log(name, email, phoneNo, plan, addOns, billingCycle);
  return (
    <aside className="p-5 pl-9 flex flex-col min-h-[70vh] justify-between">
      <div>
        <h1 className="heading">Finishing Up</h1>
        <p className="sub-heading">
          Double-check everything looks OK before conforming
        </p>
        <section className="bg-background p-6 m-3 rounded-md">
          <div className="flex justify-between items-center mb-5">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize text-primary font-bold text-xl">
                {plan.name} ({billingCycle})
              </h1>
              <p
                onClick={() => setStep(2)}
                className="underline underline-offset-2 decoration-blue-400 text-active cursor-pointer"
              >
                change
              </p>
            </div>
            <h2 className="text-primary font-bold text-xl">
              ${plan.price}/{billingCycle === "monthly" ? "mo" : "yr"}{" "}
            </h2>
          </div>
          <hr className="border-t border-gray-300 my-4" />{" "}
          <div className="flex flex-col gap-y-3 mt-3">
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-gray-500 text-sm"
              >
                <h1>{addOn.name}</h1>
                <h2>
                  +${addOn.price}/{billingCycle === "monthly" ? "mo" : "yr"}
                </h2>
              </div>
            ))}
          </div>
        </section>
        <div className=" px-4 m-3 flex justify-between items-center">
          <h1 className="text-gray-400 text-xl">Total ({billingCycle})</h1>
          <h2 className="text-gray-400 text-xl">
            + ${calculatePrice()}/{billingCycle === "monthly" ? "mo" : "yr"}{" "}
          </h2>
        </div>
      </div>

      {/* Desktop Button */}
      <div className="desktop-buttons">
        <Button
          className="back-button text-gray-400 bg-white"
          variant={"secondary"}
          onClick={handleback}
        >
          Go Back
        </Button>
        <Button
          type="submit"
          className="cursor-pointer"
          onClick={() => setStep(step + 1)}
        >
          Next Step
        </Button>
      </div>

      {/* Mobile Fixed Button */}
      <div className="mobile-buttons">
        <Button
          className="back-button text-gray-400 bg-white"
          variant={"secondary"}
          onClick={handleback}
        >
          Go Back
        </Button>{" "}
        <Button type="submit" className="cursor-pointer">
          Next Step
        </Button>
      </div>
    </aside>
  );
};

export default Summary;
