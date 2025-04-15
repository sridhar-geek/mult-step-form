import { UseFormReturn } from "react-hook-form";
import { Form } from "@/Components/ui/form";
import FormFeild from "./FormFeild";
import { Button } from "./ui/button";
import { useStepContext } from "@/React Context/stepContext";
import { useMultiFormContext } from "@/React Context/formContext";
import { FullFormSchemaType } from "@/lib/formSchema";

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

const Info = ({ form }: { form: UseFormReturn<FullFormSchemaType> }) => {
  const { updatePersonalInfo } = useMultiFormContext();
  const { setIsComplete, step, setStep } = useStepContext();

  // 2. Define a submit handler.
  function onSubmit(values: FullFormSchemaType) {
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
    <aside className="p-5 pl-9">
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
          {/* Desktop Button */}
          <div className="hidden md:flex justify-end items-end">
            <div></div>
            <Button type="submit" className="cursor-pointer">
              Next Step
            </Button>
          </div>

          {/* Mobile Fixed Button */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-between items-center">
            <div></div>
            <Button type="submit" className="">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </aside>
  );
};

export default Info;
