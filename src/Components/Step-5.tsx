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
      <h1>Thank your!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </aside>
  );
};

export default ThankYou;
