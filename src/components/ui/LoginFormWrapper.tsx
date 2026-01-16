import React, { useState } from "react";
import LightRays from "./LightRays";
import LoginForm from "../LoginForm";
import NewLoginForm from "../NewLoginForm";
import { SendHorizontal } from "lucide-react";

const LoginFormWrapper = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [resendingOTP, setResendingOTP] = useState(false);

  const handleBackToLogin = () => {
    setCurrentScreen("login");
    setOtp("");
    setOtpError("");
    setVerifyingOTP(false);
    setResendingOTP(false);
  };

  return (
    <div className=" w-full flex items-start md:items-center justify-center  md:p-4 p-2 mt-12 md:mt-0">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden bg-transparent md:bg-[#00000E] md:backdrop-blur-xl rounded-3xl p-4 md:p-8  md:border md:border-gray-700/50 md:shadow-2xl">
          <div className="absolute inset-0 top-0 min-h-screen rounded-3xl hidden md:block md:-z-10">
            <LightRays
              raysOrigin="top-right"
              rayAngle={150}
              raysColor="#56ADFF"
              raysSpeed={0.35}
              lightSpread={2.15}
              rayLength={3.25}
              fadeDistance={3.2}
              saturation={1}
              pulsating={false}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0.08}
              distortion={0.04}
            />
          </div>

          {currentScreen === "otp" && (
            <button
              onClick={handleBackToLogin}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
            >
              <SendHorizontal className="w-4 h-4 rotate-180" />
              Back to Login
            </button>
          )}

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-2">
              {currentScreen === "otp" ? "Verify OTP" : "Log in"}
            </h1>
            <p className="text-gray-400 text-sm font-normal">
              {currentScreen === "otp"
                ? `Enter the 4-digit code sent to `
                : " Enter details to log into your account."}
              {currentScreen === "otp" && (
                <span className="text-sky-500">+91 {phoneNumber}</span>
              )}
            </p>
          </div>
          <LoginForm
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            otp={otp}
            setOtp={setOtp}
            otpError={otpError}
            setOtpError={setOtpError}
            verifyingOTP={verifyingOTP}
            setVerifyingOTP={setVerifyingOTP}
            resendingOTP={resendingOTP}
            setResendingOTP={setResendingOTP}
          />
          {/* <NewLoginFormVerify OTP
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginFormWrapper;
