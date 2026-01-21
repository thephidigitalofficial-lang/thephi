// import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

// import { IoReorderTwoOutline } from "react-icons/io5";
// import Link from "next/link";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";

// function MenuBar() {
//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/aboutUs" },
//     { name: "Services", href: "/services" },
//     { name: "Recent Works", href: "/recentWork" },
//     { name: "Contact", href: "/contactUs" },
//     { name: "Login", href: "/login" },
//   ];

//   const [isOpen, setIsOpen] = useState(false);
//   const [anchorRect, setAnchorRect] = useState(null); // DOMRect of button

//   const buttonRef = useRef(null);
//   const menuRef = useRef(null);

//   // Toggle handler
//   const toggle = () => {
//     if (!isOpen) {
//       if (buttonRef.current) {
//         setAnchorRect(buttonRef.current.getBoundingClientRect());
//       }
//       setIsOpen(true);
//     } else {
//       setIsOpen(false);
//     }
//   };

//   // Click outside to close; recompute anchor rect on scroll/resize
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleDocClick = (e) => {
//       // Check if click is outside the menu AND outside the button
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(e.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(e.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     const recompute = () => {
//       if (buttonRef.current) {
//         setAnchorRect(buttonRef.current.getBoundingClientRect());
//       }
//     };

//     // Attach listeners
//     window.addEventListener("mousedown", handleDocClick);
//     window.addEventListener("resize", recompute);
//     // Use true for capture phase to catch scroll events from any container
//     window.addEventListener("scroll", recompute, true);

//     return () => {
//       // Cleanup listeners
//       window.removeEventListener("mousedown", handleDocClick);
//       window.removeEventListener("resize", recompute);
//       window.removeEventListener("scroll", recompute, true);
//     };
//   }, [isOpen]);

//   const menu = isOpen ? (
//     <div
//       ref={menuRef}
//       // style={computeStyle()}
//       className="
//         p-5 space-y-3
//         bg-white/5 backdrop-blur-xl
//         border-2 border-gray-600/50
//         shadow-[0_0_25px_rgba(0,0,0,0.1)] rounded-[10px]
//         transition-opacity duration-300 absolute top-20
//       "
//     >
//       <div className="grid grid-cols-3 gap-3">
//         {navItems.map((item, index) => (
//           // Link Item: 131px width, 48px height, frosted button style
//           <Link
//             href={item.href}
//             key={index}
//             // Using w-32 (128px) and h-12 (48px) is close, using custom values for accuracy
//             className="
//               w-[131px] h-[48px] flex items-center justify-center text-center
//               text-white text-base font-semibold font-['Lato']
//               bg-white/10 border-2 border-[#48484880] rounded-[10px]
//               shadow-sm hover:bg-white/20 transition duration-200
//               focus:outline-none focus:ring-2 focus:ring-white/50
//             "
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>

//       {/* Line 8: Divider */}
//       <div className="pt-2">
//         <div className="border-t border-white/20"></div>
//       </div>

//       {/* Social links: Linkedin Instagram WhatsApp */}
//       <div className="flex justify-evenly py-1 text-white text-base font-normal  tracking-wider">
//         <a
//           href="https://linkedin.com"
//           className="hover:text-amber-400 transition"
//         >
//           Linkedin
//         </a>
//         <a
//           href="https://instagram.com"
//           className="hover:text-amber-400 transition"
//         >
//           Instagram
//         </a>
//         <a
//           href="https://wa.me/919876543210"
//           className="hover:text-amber-400 transition"
//         >
//           WhatsApp
//         </a>
//       </div>
//     </div>
//   ) : null;

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="xl:hidden w-[62px] h-[48px] flex items-center justify-center border-b border-b-[0px] rounded-[10px] bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
//         <HiOutlineMenuAlt4
//           size={40}
//           color="white"
//           ref={buttonRef}
//           onClick={toggle}
//         />
//       </div>

//       {menu}
//       <div className="rounded-xl bg-[#FF773C26] relative max-xl:hidden">
//         <div className="bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.25)] text-center rounded-xl flex items-center justify-between max-w-2xl px-4 h-[48px]">
//           <p className="text-white px-3">info@thephi.digital</p>
//           <p className="text-white px-3 border-l border-white/30">
//             +971 50 286 2880
//           </p>

//           <div className="border-l border-white/30">
//             <button
//               ref={buttonRef}
//               onClick={toggle}
//               className="p-2 focus:outline-none"
//               aria-expanded={isOpen}
//               aria-haspopup="true"
//             >
//               <IoReorderTwoOutline
//                 size={30}
//                 className="mr-4 mx-3 text-center text-white"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MenuBar;
import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import { IoReorderTwoOutline } from "react-icons/io5";
import Link from "next/link";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

/**
 * MenuBar props:
 *  - placement: "auto" | "top" | "bottom"   (default "auto")
 *  - align: "center" | "left" | "right"     (default "center")
 *  - offset: number (px) for gap between button and menu (default 8)
 */
const MenuBar = forwardRef(({ placement = "auto", align = "center", offset = 8 }, ref) => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about_us" },
    { name: "Services", href: "/services" },
    { name: "Recent Works", href: "/recent_work" },
    { name: "Contact", href: "/contact_us" },
    // { name: "Blogs", href: "/blogs" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null); // DOMRect of button
  const [containerRect, setContainerRect] = useState(null); // DOMRect of container
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  // Expose closeMenu method to parent via ref
  useImperativeHandle(ref, () => ({
    closeMenu: () => {
      setIsOpen(false);
    }
  }));


  const openAtTarget = (target, container) => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const contRect = container ? container.getBoundingClientRect() : rect;
    setAnchorRect(rect);
    setContainerRect(contRect);
    setIsOpen(true);
  };

  const toggle = (e) => {
    // If opening, capture the button's bounding rect from the button element
    if (!isOpen) {
      // Use the buttonRef element (the clickable wrapper)
      const btn = buttonRef.current;
      const container = containerRef.current;
      if (btn) {
        openAtTarget(btn, container);
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  };

  // Compute the menu's fixed style whenever anchorRect, placement, align, isOpen, or menu size changes.
  const computeMenuStyle = () => {
    if (!anchorRect || !menuRef.current) return;

    const menuEl = menuRef.current;
    const menuRect = menuEl.getBoundingClientRect();
    const isMobile = window.innerWidth < 1280; // xl breakpoint

    // For fixed positioning, we use viewport coordinates (no scroll offsets needed)

    // On mobile, always open below the button
    // On desktop, use auto placement logic
    let preferBottom = true;

    if (!isMobile && placement === "auto") {
      const spaceBelow = window.innerHeight - anchorRect.bottom;
      const spaceAbove = anchorRect.top;
      // choose the side with more space; prefer bottom if equal
      preferBottom = spaceBelow >= Math.max(menuRect.height + offset, 0);
      if (!preferBottom && spaceAbove >= menuRect.height + offset) {
        preferBottom = false;
      } else if (!preferBottom && spaceBelow < menuRect.height + offset) {
        // If neither side fully fits, pick the side with more space
        preferBottom = spaceBelow >= spaceAbove;
      }
    } else if (placement === "top") {
      preferBottom = false;
    }

    let top;
    if (preferBottom) {
      top = anchorRect.bottom + offset;
    } else {
      // open above
      top = anchorRect.top - menuRect.height - offset;
    }

    let left;
    let width;

    if (isMobile) {
      // Mobile: 90% of screen width, centered
      width = window.innerWidth * 0.9;
      left = (window.innerWidth - width) / 2;
    } else {
      // Desktop: use container's position and width
      if (containerRect) {
        left = containerRect.left;
        width = containerRect.width;
      } else {
        left = anchorRect.left;
        width = anchorRect.width;
      }
    }

    // Constrain to viewport (prevent overflow)
    const minLeft = 8;
    const maxLeft = window.innerWidth - width - 8;
    left = Math.min(Math.max(left, minLeft), maxLeft);

    // If top overflows (very tall menu), clamp
    // On mobile, ensure menu doesn't go above the button
    const minTop = isMobile ? anchorRect.bottom + offset : 8;
    const maxTop = window.innerHeight - menuRect.height - 8;
    top = Math.min(Math.max(top, minTop), maxTop);

    setMenuStyle({
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      width: `${Math.round(width)}px`,
      zIndex: 9999,
    });
  };

  // Recompute style after layout (menu inserted) and on anchorRect changes
  useLayoutEffect(() => {
    if (!isOpen) return;
    computeMenuStyle();
    // also run a small timeout to ensure measurements after any CSS transitions
    const t = setTimeout(() => computeMenuStyle(), 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, anchorRect, placement, align]);

  // Click outside to close; recompute anchor rect on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const handleDocClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const recompute = () => {
      if (buttonRef.current) {
        setAnchorRect(buttonRef.current.getBoundingClientRect());
      }
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
      // also recompute menu position
      computeMenuStyle();
    };

    window.addEventListener("mousedown", handleDocClick);
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, true);

    return () => {
      window.removeEventListener("mousedown", handleDocClick);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // If menu size changes (e.g., responsive), recompute on window resize (keep it updated)
  useEffect(() => {
    if (!isOpen) return;
    const ro = new ResizeObserver(() => {
      computeMenuStyle();
    });
    if (menuRef.current) ro.observe(menuRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const menu = isOpen ? (
    <div
      ref={menuRef}
      style={{ ...menuStyle, position: "fixed" }}
      className="
        p-5 space-y-3
        bg-gradient-to-b from-bg-white/10 to-bg-white/40
        backdrop-blur-xl 
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-[10px] 
        transition-opacity duration-200
      "
    >
      <div className="grid grid-cols-3 gap-3">
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="
                h-[48px] flex items-center justify-center text-center
              text-white text-base font-semibold font-['Lato']
              bg-white/10   rounded-[10px]
              shadow-sm hover:bg-white/25 transition duration-200
              focus:outline-none focus:ring-2 focus:ring-white/50
            "
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* <div className="pt-2">
        <div className="border-t border-white/30"></div>
      </div> */}

      {/* <div className="flex justify-evenly py-1 text-white text-base font-normal tracking-wider">
        <a
          href="https://linkedin.com"
          className="hover:text-amber-400 transition"
        >
          Linkedin
        </a>
        <a
          href="https://instagram.com"
          className="hover:text-amber-400 transition"
        >
          Instagram
        </a>
        <a
          href="https://wa.me/919876543210"
          className="hover:text-amber-400 transition"
        >
          WhatsApp
        </a>
      </div> */}
    </div>
  ) : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile (xl:hidden) */}
      <div className="xl:hidden">
        <button
          ref={buttonRef}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="w-[62px] h-[48px] flex items-center justify-center rounded-[10px] bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
        >
          <HiOutlineMenuAlt4 size={28} color="white" />
        </button>
      </div>

      {/* render menu absolutely (so it floats over everything) */}
      {menu}

      {/* Desktop bar */}
      <div ref={containerRef} className="rounded-xl bg-[#FF773C26] relative max-xl:hidden">
        <div className="bg-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.25)] text-center rounded-xl flex items-center justify-between max-w-2xl px-4 h-[48px]">
          <p className="text-white px-3">info@thephi.digital</p>
          <p className="text-white px-3 border-l border-white/30">
            +971 50 286 2880
          </p>

          <div className="border-l border-white/30">
            <button
              ref={buttonRef}
              onClick={toggle}
              className="p-2 focus:outline-none"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <IoReorderTwoOutline
                size={30}
                className="mr-4 mx-3 text-center text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

MenuBar.displayName = 'MenuBar';

export default MenuBar;
