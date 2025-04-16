import Image from "next/image";
import React from "react";

const ThankYou = () => {
  return (
    <aside className="p-5 pl-9 flex flex-col min-h-[50vh] gap-5 justify-center items-center">
      <Image
        src={"/icon-thank-you.svg"}
        alt="Check icon"
        width={100}
        height={100}
      />
      <h1 className="heading">Thank you!</h1>
      <p className="sub-heading ">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </aside>
  );
};

export default ThankYou;
