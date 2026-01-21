import React, { useRef } from "react";
import MemoizedCard from "./StackCard";
import ScrollStack from "./ScrollStack";

const Card = ({ name, role, testimonial }) => {
  return (
    <div className="relative p-8 rounded-xl w-full min-h-80 border border-[#484848] shadow bg-[#00000D]">
      <div className="relative z-10 flex flex-col h-full">
        {/* Top section with name and title */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-1">{name}</h2>
            <p className="text-sm font-light text-gray-400">
              {role}
            </p>
          </div>
          <div className="text-6xl text-gray-600 font-extrabold -mt-2 opacity-50">
            &#x201D;
          </div>
        </div>

        <div className="flex-grow flex items-center">
          <p className="text-lg font-normal italic text-gray-200 leading-relaxed">
            {testimonial}
          </p>
        </div>
      </div>
    </div>
  );
};

function Testimonial() {
  const cards = [
    {
      title: "Custom Card",
      content: <Card name={'Abdel'} role={'Quadro'}
        testimonial={'A flawless experience. The Phi Digital perfectly understood my requirements and the specific image I wanted to project through my company website. Despite my demanding and detail-oriented approach to design, the team took the time to implement every feature to perfection. I am extremely happy with the level of service provided and most certainly recommend them'} />,
    },
    {
      title: "Custom Card",
      content: <div className="mt-10">


        <Card name={'Bijoy Nair'}
          role={'Autopacts'}
          testimonial={'I recently had the pleasure of working with The Phi for our project that exceeded all my expectations. From the initial planning phase to the final implementation, the team demonstrated exceptional expertise and professionalism'} />
      </div>
    },
    // {
    //   title: "Custom Card",
    //   content: <Card name={'Bijoy Nair'}
    //     role={'Autopacts'}
    //     testimonial={'I recently had the pleasure of working with The Phi for our project that exceeded all my expectations. From the initial planning phase to the final implementation, the team demonstrated exceptional expertise and professionalism'} />,
    // },
    // {
    //   title: "Custom Card",
    //   content: <Card />,
    // },
  ];

  return <div className="bg-[#00000D]">
    <ScrollStack cards={cards} sectionHeightMultiplier={4} />

  </div>
}

export default Testimonial;
