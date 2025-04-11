import FullForm from "@/Components/FullForm";
import FormContextProvider from "@/React Context/formContext";

export default function Home() {
  return (
    <FormContextProvider>
      <FullForm />
    </FormContextProvider>
  );
}
