"use client";
import { useContext } from "react";
import { stepContext } from "@/React Context/stepContext";

const buttons = [
  {
    id: 1,
    info: "Your Info",
  },
  {
    id: 2,
    info: "Select Plans",
  },
  {
    id: 3,
    info: "Add-Ons",
  },
  {
    id: 4,
    info: "Summary",
  },
];

const Sidebar = () => {
  const { step, setStep, isComplete } = useContext(stepContext);

  return (
    <article className="flex  md:block md:bg-[url('/bg-sidebar-desktop.svg')] bg-[url('/bg-sidebar-mobile.svg')] h-[120px] md:h-[100%] md:rounded-md bg-cover w-full">
      <div className="pt-8"></div>
      {buttons.map((btn) => (
        <div
          key={btn.id}
          className="flex flex-row justify-start items-center gap-4 md:p-2 pl-12 md:pl-7"
        >
          <button
            className={`rounded-full ring-2  px-3 py-1 cursor-pointer ${
              btn.id === step
                ? "ring-gray-600 bg-gray-600"
                : isComplete[btn.id]
                ? "bg-green-500 ring-green-500"
                : "ring-white bg-transparent"
            }`}
            disabled={!isComplete[btn.id - 1]}
            onClick={() => setStep(btn.id)}
          >
            {" "}
            {btn.id}
          </button>
          <aside className="hidden md:flex justify-start items-start  flex-col">
            <p className="text-gray-400 font-semibold">STEP {btn.id}</p>
            <h6 className="uppercase text-white font-bold">{btn.info}</h6>
          </aside>
        </div>
      ))}
    </article>
  );
};

export default Sidebar;
