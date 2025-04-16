import { UseFormReturn } from "react-hook-form";
import { Form } from "@/Components/ui/form";
// local imports
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
    placeholder: "Your Name",
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
      <h1 className="heading">Personal Info</h1>
      <p className="sub-heading">
        Please provide your name, email address and phone number
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
          <div className="desktop-buttons">
            <div></div>
            <Button type="submit" className="cursor-pointer h-10">
              Next Step
            </Button>
          </div>

          {/* Mobile Fixed Button */}
          <div className="mobile-buttons">
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
