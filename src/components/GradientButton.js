import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import btnGradient from "@/../public/images/btnGradient.png";

export default function GradientButton({
  text = "Explore More",
  glowSrc = "https://sdmntprcentralus.oaiusercontent.com/files/00000000-6160-61f5-9677-e729a2318aee/raw?se=2025-09-18T20%3A07%3A45Z&sp=r&sv=2024-08-04&sr=b&scid=da0a1fbe-4308-5bc2-aaf5-82d227ef9b22&skoid=9063adf3-a524-4acf-b70a-8731b33f2f50&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-18T16%3A20%3A46Z&ske=2025-09-19T16%3A20%3A46Z&sks=b&skv=2024-08-04&sig=37XwD9lp2bM5Ajk/jNd%2Bas4KT26hNStdhwEx37wwOBg%3D", // glowSrc = "https://sdmntprcentralus.oaiusercontent.com/files/00000000-6160-61f5-9677-e729a2318aee/raw?se=2025-09-18T14%3A18%3A32Z&sp=r&sv=2024-08-04&sr=b&scid=25d56cf1-a6c9-54a1-9805-3ede65b8e59c&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-18T12%3A49%3A26Z&ske=2025-09-19T12%3A49%3A26Z&sks=b&skv=2024-08-04&sig=4Jk6HCo9vgsiITkheBpHYd0QWNQkKKiekMv7LPKFjuw%3D",
  glowAlt = "",
  innerShadowColor = "#ff773c99",
  hoverUp = 80,
  size = 'medium'
}) {
  const shiftMap = {
    40: "group-hover:-translate-y-[40px]",
    80: "group-hover:-translate-y-[80px]",
    120: "group-hover:-translate-y-[120px]",
  };

  const sizeMap = {
    small: "p-2 px-6",
    medium: "p-3 px-8",
    large: "p-4 px-8",
  }

  return (
    <>
      <button
        className={`
        relative group                
        inline-flex items-center justify-center
         rounded-[10px]  
  ${sizeMap[size]}
        font-bold text-white text-center no-underline
        overflow-hidden
        border border-[#ffaaaaff]
        transition-all duration-500 transform
        hover:scale-105
      `}
        style={{
          backgroundColor: "black",
          WebkitBackdropFilter: "blur(100px)",
          backdropFilter: "blur(100px)",
          cursor: "pointer",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-base !font-medium relative z-10 select-none uppercase">
            {text}
          </span>
          <ArrowRight />
        </div>

        {/* inner shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{ boxShadow: `inset 0 4px 22px ${innerShadowColor}` }}
        />

        {glowSrc && (
          <Image
            width={0}
            height={0}
            src={btnGradient}
            alt={glowAlt}
            loading="lazy"
            aria-hidden
            className={`
            absolute
            top-[40%] -left-[49%]
            w-[100%]
            z-[-1]
            blur-[5px]
            mix-blend-lighten
            pointer-events-none 
            transform transition-transform duration-700 ease-out
            motion-safe:transform motion-safe:transition-transform 
            group-hover:translate-x-[32px]
           ${shiftMap[hoverUp]}
          `}
          />
        )}
      </button>
    </>
  );
}
