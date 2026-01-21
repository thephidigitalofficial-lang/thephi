import React, { useRef, useEffect } from "react";

const cardHeight = "300px";
const cardCount = 3;
const cardStyle = {
  height: cardHeight,
  minHeight: "200px",
  borderRadius: "15px",
  transition: "none",
  willChange: "transform, opacity",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
};

const StackCard = ({ card, index, scrollProgress, activeCardIndex }) => {
  const cardRef = useRef(null);

  const getCardTransform = (index, progress) => {
    const totalCards = cardCount;
    const cardProgress = Math.min(
      Math.max(progress * totalCards - index, 0),
      1
    );

    const isMobile = window.innerWidth < 768; // Mobile check

    const paddingOffset = isMobile ? 15 : 30; // Reduced horizontal offset for mobile
    const verticalStackOffset = 25;
    const initialTranslateY = isMobile ? 100 : 300; // Reduced initial drop for mobile

    // The horizontal offset is now based on the index
    const translateX = index * paddingOffset;

    let translateY;
    let opacity;

    const isStacked = index < activeCardIndex;

    if (isStacked) {
      translateY = index * verticalStackOffset;
      opacity = 1;
    } else {
      translateY =
        initialTranslateY * (1 - cardProgress) +
        index * verticalStackOffset * cardProgress;
      opacity = cardProgress;
    }

    const zIndex = 10 + (totalCards - 1 - index);

    return {
      // Apply both translateX and translateY while maintaining center alignment
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px)`,
      opacity: opacity,
      zIndex: -zIndex,
    };
  };

  useEffect(() => {
    let intervalId;
    const updateTransform = () => {
      if (!cardRef.current) return;
      const transform = getCardTransform(index, scrollProgress.current);
      Object.assign(cardRef.current.style, transform);
    };

    intervalId = setInterval(updateTransform, 16);

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`absolute overflow-hidden text-white`}
      style={{
        left: "50%",
        top: "0%",
        transform: `translateX(-50%) translateY(300px)`,
        width: "100%",
        opacity: 0,
        zIndex: 10 + index,
      }}
    >
      {card?.content}
    </div>
  );
};
const MemoizedCard = React.memo(StackCard);
export default MemoizedCard;
