import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GradientButton from "./GradientButton";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactFitty } from "react-fitty";
import { useSelector } from "react-redux";
import projects from "../data/caseStudy.json";

const ProjectCard = ({ project, index, router }) => {
  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      sessionStorage.setItem("focusedProject", JSON.stringify(project));
    }
  }, [inView, project]);

  return (
    <div
      ref={ref}
      onClick={() => router.push(`/recent_work/details?id=${project.id}`)}
      className={`${index % 2 != 0 ? "xl:mt-20 max-xl:mt-0" : "mt-0"
        } relative max-xl:w-full xl:aspect-[4/3] rounded-[20px] overflow-hidden cursor-pointer group`}
    >
      <Image
        width={0}
        unoptimized
        priority
        height={0}
        src={project?.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500  "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-sm font-light text-gray-400 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          {project.category}
        </p>
        <h3 className="text-xl md:text-2xl font-semibold mt-1 group-hover:text-[#FF773C] transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export default function RecentWork({
  rounedEdges = "rounded-t-[50px]",
  showMoreBtn = true,
  showTimeLine = true,
  showPortFolio = true,
  isPage = false,
  containerClass = "relative  glassWrapper border-b border-b-[#30303D]/30    border-b-1",
}) {
  const { showChatDialog: showChatBot } = useSelector(
    (state) => state.chatSlice
  );
  const router = useRouter();


  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.1"],
  });
  const extendedScroll = useTransform(
    scrollYProgress,
    (v) => v + 130 / ref?.current?.offsetHeight
  );


  const { id } = router.query;

  return (
    <div>
      <div ref={ref} className={`${rounedEdges}  ${containerClass}    `}>
        {containerClass.includes("glass") ? (
          <div className="glassStrip z-10" />
        ) : (
          <div className="pt-24" />
        )}

        {showPortFolio && (
          <div className="z-10">
            <motion.div
              transition={{ duration: 2 }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center font-bold uppercase  z-10   -top-32 max-lg:-top-22 relative bg-[#302A28]
    bg-clip-text text-transparent
    [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_65%)]
    [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_74%)]
    [mask-repeat:no-repeat] [mask-size:100%_100%]
    [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]
     max-xl:mt-12"
            >
              <ReactFitty key={showChatBot}>Portfolio</ReactFitty>
            </motion.div>
          </div>
        )}
        <div className=" overflow-hidden ">
          {showTimeLine && (
            <div className=" z-10 w-full h-full  bg-blue-300  ">
              <div className="absolute left-1/2  -translate-x-1/2 inset-y-0 w-[1px] bg-[#30303D] rounded-full"></div>
              <div className="absolute left-75 max-xl:left-20  -translate-x-1/2 top-0 inset-y-0 w-[1px] bg-[#30303D] rounded-full"></div>
              <div className="absolute right-75 max-xl:right-20 top-0 -translate-x-1/2 inset-y-0 w-[1px] bg-[#30303D] rounded-full"></div>

              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute left-75 max-xl:left-20 -translate-x-1/2 top-0 inset-y-0 w-[1px] 
      bg-gradient-to-b from-[#FF773C80] via-[#FF773C80] to-[#FF773C50] 
      origin-top rounded-full"
              />
              <motion.div
                style={{ scaleY: extendedScroll }}
                className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] 
      bg-gradient-to-b from-[#FF773C80] via-[#FF773C80] to-[#FF773C50] 
      origin-top rounded-full z-10"
              />

              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute right-75 max-xl:right-20 top-0 -translate-x-1/2 inset-y-0 w-[1px] 
      bg-gradient-to-b from-[#FF773C80] via-[#FF773C80] to-[#FF773C50] 
      origin-top rounded-full"
              />
            </div>
          )}
        </div>

        <div
          ref={ref}
          className="z-11 text-white min-h-screen px-16 max-xl:px-6  relative pb-20 w-full "
        >
          <div className={`${isPage ? 'max-lg:-mt-40' : 'lg:mt-20'}  z-10 flex flex-col  xl:mx-auto    `}>
            <h2 className="xl:-mt-60 text-3xl lg:text-5xl font-medium -mt-20 mb-16 max-xl:mt-12 ">
              Recent Work
            </h2>

            <div className="  -mt-6">
              <div
                className="xl:grid   xl:grid-cols-2 gap-8 
              max-xl:flex
              max-xl:flex-col
              xl:gap-x-40  
              max-xl:gap-x-6 relative z-10 "
              >
                {projects?.filter((item) => item.id != id)?.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    router={router}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMoreBtn && (
        <div onClick={() => router.push("/recent_work")}
          className="py-12 w-full flex justify-center bg-[#00000D] z-10 relative  ">
          <GradientButton text="Explore More Projects" />
        </div>
      )}
    </div>
  );
}
