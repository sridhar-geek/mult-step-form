import { useMultiFormContext } from "@/React Context/formContext";
import React from "react";

const Plans = () => {
  const { email, phoneNo, name } = useMultiFormContext();

  console.log("email", email);
  console.log("name", name);
  console.log("phoneNo", phoneNo);
  return <div>Plans</div>;
};

export default Plans;
