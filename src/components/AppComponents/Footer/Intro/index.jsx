import React from "react";

const Intro = () => {
  return (
    <div className=" flex-1 text-white space-y-4">
      <div className="space-y-1">
        <div className="text-2xl font-bold">Dawat on Islaah</div>
        <div className="flex w-full ">
          <div className="border-[1px] border-amber-500 w-[40%]" />
          <div className="border-[1px] border-whitw w-[60%]" />
        </div>
      </div>
      <div className="font-light mt-12 text-lg">
        Dawat o Islaah Welcome to our Dawat o Islaah website, dedicated to
        spreading the message of Islam and promoting personal and community
        development through authentic teachings. Our resources aim to inspire
        spiritual growth, foster unity, and encourage positive change in line
        with Islamic principles.
      </div>
    </div>
  );
};

export default Intro;
