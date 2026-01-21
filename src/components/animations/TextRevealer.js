import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TextRevealer({ text, className }) {
  const letters = text.split("");
  const [revealedIndices, setRevealedIndices] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const unrevealedIndices = letters
        .map((_, index) => index)
        .filter((index) => !revealedIndices.includes(index));

      if (unrevealedIndices.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * unrevealedIndices.length
        );
        const nextIndexToReveal = unrevealedIndices[randomIndex];

        setRevealedIndices((prevIndices) => [
          ...prevIndices,
          nextIndexToReveal,
        ]);
      }
    }, 30); // slower interval for elegance

    return () => clearInterval(timer);
  }, [revealedIndices, letters.length]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.98,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier
      },
    },
  };

  return (
    <span className="whitespace-pre-wrap block text-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="hidden"
          animate={revealedIndices.includes(index) ? "visible" : "hidden"}
          className={`${className} inline-block`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
