"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import MenuBar from "./MenuBar";
import logo from "@/../public/images/newLogo.svg";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header if at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header if scrolling down more than 50px
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
        // Close menu when hiding header
        if (menuBarRef.current && menuBarRef.current.closeMenu) {
          menuBarRef.current.closeMenu();
        }
      }
      // Show header if scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`flex items-center fixed top-0 left-0 right-0 z-50 justify-between p-4 pt-4 bg-gradient-to-b from-[#1D1D20] to-transparent transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <Image
        alt="logo"
        src={logo}
        className="w-45 max-lg:w-35 cursor-pointer"
        onClick={() => router.push("/")}
      />

      <div>
        <MenuBar ref={menuBarRef} />
      </div>
    </header>
  );
}

export default Header;
