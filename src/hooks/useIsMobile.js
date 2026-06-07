import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1280;

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined"
            ? window.innerWidth < MOBILE_BREAKPOINT
            : false
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};