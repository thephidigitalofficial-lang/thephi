import { motion } from "framer-motion";

export default function TextCarousel({
  items = [
    "Marketing",
    "UI/UX Design",
    "Website Design",
    "Dashboards",
    "Mobile App Design",
    "AI Tool Design",
  ],
  speed = 15,
}) {
  const allItems = [...items, ...items]; // for seamless looping

  return (
    <div className={`overflow-hidden w-full py-2 sm:py-4  `}>
      <motion.div
        className="flex whitespace-nowrap text-[clamp(1.5rem,4vw,4rem)] text-[#484848] font-regular"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: speed,
        }}
      >
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center mx-2 sm:mx-4 flex-shrink-0">
            <span className="px-1">{item}</span>
            <div className="bg-[#484848] w-2 h-2 sm:w-3 sm:h-3 rounded-full ml-2 sm:ml-4 flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
