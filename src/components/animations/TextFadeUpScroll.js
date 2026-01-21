"use client";

import { motion } from "framer-motion";

export default function TextFadeUpScroll({
  containerClass = "",
  text: children,
  duration = 0.8,
  className = "",
  delay = 0.3,
  once = true,
}) {
  if (!children || typeof children !== "string") return null;

  const lines = children.split("\n");

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ");
        return (
          <div key={lineIndex} className={`flex flex-wrap ${containerClass}`}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration, delay }}
                className="mr-2"
              >
                {word}
              </motion.span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
