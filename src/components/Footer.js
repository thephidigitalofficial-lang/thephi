import Image from "next/image";
import footerImage from "@/../public/images/footerMask.png";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden   bg-black/30 min-h-[60vh]   flex items-end">
      <Image
        src={footerImage}
        alt=""
        className="absolute  max-h-[110%] flex justify-end items-end w-full b-20 "
      />

      <div className="relative z-10  mx-auto w-full pb-8  ">
        <div className="flex flex-row max-xl:flex-col px-8 max-xl:px-6 justify-between   items-end  ">
          <div className="flex flex-col gap-8   px-4 max-xl:grid max-xl:grid-cols-2">
            <nav className="flex max-xl:flex-col flex-wrap gap-6 text-base">
              <p className="text-[#AAAAAA] font-bold text-xl mt-6 xl:hidden">
                Menu
              </p>
              <Link href={'/'}>Home</Link>
              <Link href={'/about_us'}>About Us</Link>
              <Link href={'/services'}>Services</Link>
              <Link href={'/recent_work'}>Projects</Link>
              <Link href={'/contact_us'}>Contact Us</Link>
              {/* <a href="#" className="hover:text-gray-300">
                Home
              </a>
              <a href="#" className="hover:text-gray-300">
                About Us
              </a>
              <a href="#" className="hover:text-gray-300">
                Services
              </a>
              <a href="#" className="hover:text-gray-300">
                Projects
              </a>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a> */}
            </nav>

            <div className="flex max-xl:flex-col max-xl:gap-4 xl:max-w-160 gap-16 text-base mb-6">
              <p className="text-[#AAAAAA] font-bold text-xl mt-6 xl:hidden">
                Contact Info
              </p>
              <p className="whitespace-nowrap">+971 50 286 2880</p>
              <p className="whitespace-nowrap">info@thephi.com</p>

              <span className="font-regular text-xl">
                8th Floor, Vasavi Sky City,
                <br />
                Gachibowli, Hyderabad, Telangana 500032
              </span>

            </div>
          </div>

          <div className="font-black font-bold    mt-120 text-end !m-0 !p-0  flex justify-end items-end  ">
            <p className="text-[96px] max-xl:text-[64px] -mb-6 xl:-mb-8 max-xl:mt-16">
              {" "}
              The Phi
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#30303D] mb-6"></div>

        <div className="flex flex-col text-[#AAAAAA]  xl:flex-row justify-between items-center   gap-4 px-8  ">
          <p className=" text-[14px] text-regular max-xl:order-3">
            ©2025 by The Phi | All Rights Reserved (v4)
          </p>

          <div className="flex gap-6 text-base text-white max-xl:order-1">
            {/* <a href="#" className="hover:text-gray-300">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-300">
              Behance
            </a>
            <a href="#" className="hover:text-gray-300">
              LinkedIn
            </a> */}
          </div>

          <div className="flex gap-4 text-[14px] text-regular max-xl:order-2">
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
