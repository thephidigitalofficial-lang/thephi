import React from "react";

import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import InputField from "@/components/InputField";
import Header from "@/components/Header";
import Head from "next/head";

import { toast } from "sonner";
import { useState } from "react";

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { fullName, email, phone, message } = formData;

    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate success
    setIsSuccess(true);
    toast.success("Message sent successfully! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-[#00000D] text-white   overflow-hidden relative">
      <Head>
        <title>Contact Us | The Phi</title>
        <meta
          name="description"
          content="Great Partnerships Start With a Single Conversation. Get in touch with The Phi for your next digital project."
        />
        <meta property="og:title" content="Contact Us | The Phi" />
        <meta
          property="og:description"
          content="Great Partnerships Start With a Single Conversation. Get in touch with The Phi for your next digital project."
        />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <div className="relative mt-20">
        <div
          data-aos="zoom-in-left"
          className="absolute top-0 -left-120 max-xl:-left-50 w-full h-1/2 radial"
        />

        <div className="px-15 max-xl:px-6 py-20 space-y-8 pb-20">
          <main className="flex flex-col  lg:flex-row lg:space-x-[70px]  items-start justify-center">
            {/* <div className="w-200 absolute bg-red-300 top-0 left-0 z-100">
            <div className="radial inset-0 !max-w-250 bg-red-300 max-h-1/2 mx-auto" />
          </div> */}

            <div className="flex flex-col flex-1 gap-20 max-xl:gap-4">
              <h1 className="text-[75px] max-xl:text-[36px] font-medium leading-tight ">
                Great Partnerships Start With a Single Conversation
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 max-xl:space-y-[20px]  text-gray-300">
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400 font-regular text-base">
                    Phone
                  </span>
                  <span className="font-regular text-white text-xl">
                    +971 50 286 2880
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400 font-regular text-base">
                    Address
                  </span>
                  <span className="font-regular text-xl">
                    8th Floor, Vasavi Sky City,
                    <br />
                    Gachibowli, Hyderabad, Telangana 500032
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-400 font-medium text-base">
                    Mail
                  </span>
                  <span className="font-medium text-xl">info@thephi.com</span>
                </div>
              </div>
            </div>

            <div className="flex-1  h-fit max-xl:w-full max-xl:mt-[40px] ">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center p-8 bg-[#1F1F1F] rounded-2xl border border-gray-800 animate-fade-in text-center h-full min-h-[400px]">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Thank You!
                  </h3>
                  <p className="text-gray-400 text-lg max-w-sm">
                    Your message has been sent successfully.{" "}
                    {`We'll get back to you shortly.`}
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        message: "",
                      });
                    }}
                    className="mt-8 text-sm text-gray-400 hover:text-white underline transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <InputField
                      label={"Full Name"}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      placeholder={"e.g. John Smith"}
                    />
                    <InputField
                      label={"Email"}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder={"e.g. johnsmith@thephi.com"}
                    />
                    <InputField
                      label={"Phone"}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder={"e.g. +971 50 286 2880"}
                    />
                    <InputField
                      label={"Message"}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      placeholder={"Leave us a message..."}
                    />
                  </div>

                  <div className="flex justify-center w-full max-xl:mt-8">
                    <GradientButton text="Submit" />
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
