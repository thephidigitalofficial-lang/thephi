import React, { useState } from "react";
import GradientButton from "../GradientButton";
import InputField from "../InputField";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { showAuthDialog } from "@/redux/slices/authSlice";
const SignInDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showAuthDialog: showDialog } = useSelector(
    (state) => state.authSlice
  );

  const dispatch = useDispatch();

  const handleSocialLogin = async (platform) => {
    if (platform == "Google") {
      window.open(
        "https://nodejs-app-754042928988.asia-south1.run.app" + "/auth/google",
        "googleLogin",
        "width=500,height=600"
      );
      dispatch(showAuthDialog(false));
    } else {
      alert("Coming Soon");
    }
  };

  if (!showDialog) return <></>;
  return (
    <div className="min-h-screen w-full fixed z-100 bg-[#00000D]/70 flex items-center justify-center p-4 ">
      <div
        className={`
        w-full max-w-xl bg-[#00000D]  p-8 rounded-3xl  
        transition-all duration-300 ease-in-out 
      `}
      >
        <div className="flex items-center  justify-between mb-8">
          <div className="flex flex-col items-start space-y-2 ">
            <h2 className="text-3xl font-extrabold text-white text-center ">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-400 text-center ">
              Sign in to access your account.
            </p>
          </div>
          <X
            className="text-white cursor-pointer"
            onClick={() => dispatch(showAuthDialog(false))}
          />
        </div>

        <div className="space-y-6">
          <InputField
            type="email"
            label={"Email"}
            value={email}
            placeholder={"Enter your email"}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            label={"Password"}
            value={password}
            placeholder={"Enter your Password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-white  "
                onClick={(e) => {
                  e.preventDefault();
                  showMessage("Redirecting to password reset...");
                }}
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center w-full mt-4"
          onClick={() => alert("Coming Soon")}
        >
          <GradientButton text="Sign In" hoverUp={40} />
        </div>
        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-400">
          {` Don't have an account? `}
          <a
            href="#"
            className="font-medium text-white ml-2 hover:text-indigo-300 "
            onClick={(e) => {
              e.preventDefault();
              showMessage("Redirecting to sign-up page...");
            }}
          >
            Sign Up
          </a>
        </p>

        <div className="relative my-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-[#00000D] text-gray-400 font-medium">
              Or sign in with email
            </span>
          </div>
        </div>

        <div className=" gap-6 flex items-center justify-center">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl shadow-sm text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            <Image
              alt="google"
              src={"./images/icons/google.png"}
              width={0}
              height={0}
              className="w-12 "
            />
            <span className="max-xl:hidden">Continue with Google</span>
          </button>

          {/* <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            <Image
              alt="google"
              src={"./images/icons/facebook.png"}
              width={0}
              height={0}
              className="w-6 mr-3 "
            />
            <span className="max-xl:hidden">Continue with Facebook</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
