import { useState, useEffect, useRef, useCallback } from "react";

/**
 * A hook that detects when the top of an element reaches a certain threshold from the top of the viewport.
 * Uses debouncing and one-way locking to prevent feedback loops from layout shifts.
 * 
 * @param {number} threshold - The distance from the top of the viewport in pixels.
 * @returns {object} { ref, touched } - ref to attach to the element, touched boolean.
 */
export function useTouchTop(threshold = 100) {
    const [touched, setTouched] = useState(false);
    const ref = useRef(null);
    const isLockedRef = useRef(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const top = rect.top;

            // Once touched, stay touched until we scroll significantly back down
            // This prevents the feedback loop from height changes
            if (!touched && top <= threshold) {
                // Opening: lock for a moment to let animation settle
                if (!isLockedRef.current) {
                    isLockedRef.current = true;
                    setTouched(true);

                    // Keep locked for 500ms to let the height animation finish
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        isLockedRef.current = false;
                    }, 500);
                }
            } else if (touched && top > threshold + 100) {
                // Only close if we've scrolled significantly back down (100px buffer)
                // This prevents closing due to small layout shifts
                if (!isLockedRef.current) {
                    isLockedRef.current = true;
                    setTouched(false);

                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    timeoutRef.current = setTimeout(() => {
                        isLockedRef.current = false;
                    }, 500);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [threshold, touched]);

    return { ref, touched };
}
