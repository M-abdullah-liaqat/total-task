import { ArrowBigRight } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

import React from "react";
interface Props {}

const Features = (props: Props) => {
  return (
    <div className="py-10 2xl:w-[1532px] w-full justify-self-center px-8">
      <div className="text-3xl font-bold">Features</div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5">
        <div className="border-1 border-neutral-400 2xl:h-[352px] xl:h-[22.56vw] lg:h-[26vw] md:h-[29vw] h-[70vw] should rounded-2xl flex flex-col items-center justify-center relative">
          <div className="text-5xl bont-bold absolute top-3">1</div>
          <div className="absolute -right-8 z-10 md:block hidden">
            <FaLongArrowAltRight size={60} color="gray" />
          </div>
          <div className="absolute -bottom-8 z-10 xl:hidden block">
            <FaLongArrowAltDown size={60} color="gray" />
          </div>
          <div className="text-center text-xl 2xl:px-2 xl:px-1.5 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            aut quia sequi accusantium autem minima.
          </div>
        </div>
        <div className="border-1 border-neutral-400 2xl:h-[352px] xl:h-[22.56vw] lg:h-[26vw] md:h-[29vw] h-[70vw] rounded-2xl flex flex-col items-center justify-center relative">
          <div className="text-5xl bont-bold absolute top-3">2</div>
          <div className="absolute -right-8 z-10 lg:block hidden">
            <FaLongArrowAltRight size={60} color="gray" />
          </div>
          <div className="absolute -bottom-8 z-10 md:hidden block">
            <FaLongArrowAltDown size={60} color="gray" />
          </div>
          <div className="text-center text-xl 2xl:px-2 xl:px-1.5 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            aut quia sequi accusantium autem minima.
          </div>
        </div>
        <div className="border-1 border-neutral-400 2xl:h-[352px] xl:h-[22.56vw] lg:h-[26vw] md:h-[29vw] h-[70vw] rounded-2xl flex flex-col items-center justify-center relative">
          <div className="text-5xl bont-bold absolute top-3">3</div>
          <div className="absolute -right-8 z-10 xl:block lg:hidden md:block hidden">
            <FaLongArrowAltRight size={60} color="gray" />
          </div>
          <div className="absolute -bottom-8 z-10 md:hidden block">
            <FaLongArrowAltDown size={60} color="gray" />
          </div>
          <div className="text-center text-xl 2xl:px-2 xl:px-1.5 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            aut quia sequi accusantium autem minima.
          </div>
        </div>
        <div className="border-1 border-neutral-400 2xl:h-[352px] xl:h-[22.56vw] lg:h-[26vw] md:h-[29vw] h-[70vw] rounded-2xl flex flex-col items-center justify-center relative">
          <div className="text-5xl bont-bold absolute top-3">4</div>
          <div className="text-center text-xl 2xl:px-2 xl:px-1.5 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            aut quia sequi accusantium autem minima.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
