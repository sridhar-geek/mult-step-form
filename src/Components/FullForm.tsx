"use client";
import { useStepContext } from "@/React Context/stepContext";
import Info from "./Step1";
import Plans from "./Step2";
import AddOns from "./Step3";
import Summary from "./Step4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FullFormSchemaType } from "@/lib/formSchema";
import ThankYou from "./Step-5";

const FullForm = () => {
  const form = useForm<FullFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      plan: "Arcade",
      addons: [],
      total: 0,
    },
  });
  const { step } = useStepContext();

  return (
    <main className="bg-white min-h-[480px] max-w-sm sm:max-w-md md:max-w-full mx-auto md:mx-0  z-10 relative -top-8 md:top-0 rounded-md md:rounded-none ">
      {step === 1 && <Info form={form} />}
      {step === 2 && <Plans form={form} />}
      {step === 3 && <AddOns form={form} />}
      {step === 4 && <Summary />}
      {step === 5 && <ThankYou />}
    </main>
  );
};

export default FullForm;
