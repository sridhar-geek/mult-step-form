"use client";
import { useStepContext } from "@/React Context/stepContext";

const steps = [
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
  const { step, setStep, isComplete } = useStepContext();

  return (
    <article className="flex  md:block md:bg-[url('/bg-sidebar-desktop.svg')] bg-[url('/bg-sidebar-mobile.svg')] h-[120px] md:h-[100%] md:rounded-md bg-cover w-full">
      <div className="pt-8"></div>
      <div className="w-full flex justify-center items-center md:flex-col md:justify-start md:items-start ">
        {steps.map((btn) => (
          <div
            key={btn.id}
            className="flex flex-row justify-start items-center gap-4 md:p-2 pl-12 md:pl-7"
          >
            <button
              className={`rounded-full ring-2  px-3 py-1 cursor-pointer ${
                btn.id === step
                  ? "ring-circleFill bg-circleFill "
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
              <p className="text-gray-400 font-semibold text-sm">
                STEP {btn.id}
              </p>
              <h6 className="uppercase text-white font-bold">{btn.info}</h6>
            </aside>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Sidebar;
