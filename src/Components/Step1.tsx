import React, { useContext } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/Components/ui/form";
import FormFeild from "./FormFeild";
import { Button } from "./ui/button";
import { stepContext } from "@/React Context/stepContext";
import { useMultiFormContext } from "@/React Context/formContext";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(20),
  email: z.string().email("Invalid email").min(5).max(30),
  phoneNo: z.string().length(10, "Phone number must be 10 digits"),
});

const inputFormFeilds = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Sridhar",
  },
  {
    name: "email",
    label: "Email ",
    type: "email",
    placeholder: "email@gmail.com",
  },
  {
    name: "phoneNo",
    label: "Phone Number",
    type: "number",
    placeholder: "9876543210",
  },
];

const Info = () => {
  const { updatePersonalInfo } = useMultiFormContext();
  const { setIsComplete, step, setStep } = useContext(stepContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePersonalInfo({ name: "name", value: values.name });
    updatePersonalInfo({ name: "email", value: values.email });
    updatePersonalInfo({ name: "phoneNo", value: values.phoneNo });

    setIsComplete((prev) => ({
      ...prev,
      [step]: true,
    }));

    if (step < 4) setStep(step + 1);
  }

  return (
    <aside className="p-5 pl-9 bg-white shadow-md mx-auto max-w-xs rounded-md z-10 md:z-0 md:rounded-none md:max-w-max md:shadow-none md:mx-0">
      <h1 className="text-2xl text-blue-400 font-bold">Personal Info</h1>
      <p className="text-gray-500 pb-10">
        Please provide your name, email address and phone number
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {inputFormFeilds.map((inputFeild) => (
            <FormFeild
              key={inputFeild.label}
              control={form.control}
              name={inputFeild.name as "email" | "name" | "phoneNo"}
              label={inputFeild.label}
              placeholder={inputFeild.placeholder}
              type={inputFeild.type}
            />
          ))}
          <div className="flex justify-between bg-white  ">
            <div></div>
            <Button type="submit" className="cursor-pointer">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default Info;
