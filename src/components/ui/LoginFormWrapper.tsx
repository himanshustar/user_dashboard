import { useState } from "react";
import LightRays from "./LightRays";
import LoginForm from "../LoginForm";
import { SendHorizontal } from "lucide-react";
import useIsMobile from "../../hooks/useMediaQuery";

const LoginFormWrapper = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [resendingOTP, setResendingOTP] = useState(false);
  const isMobile = useIsMobile();

  const handleBackToLogin = () => {
    if (currentScreen === "sendOtp") {
      setCurrentScreen("login");
    } else if (currentScreen === "otp") {
      setCurrentScreen("sendOtp");
      setOtp("");
      setOtpError("");
      setVerifyingOTP(false);
      setResendingOTP(false);
    }
  };

  const handleBottomTextClick = () => {
    if (currentScreen === "signUp") {
      setCurrentScreen("login");
    } else if (currentScreen === "login") {
      setCurrentScreen("signUp");
    } else if (currentScreen === "sendOtp") {
      setCurrentScreen("signUp");
    }
  };

  const renderHeading = () => {
    switch (currentScreen) {
      case "otp":
        return "Login";

      case "sendOtp":
        return "Login";

      case "login":
        return "Login";

      case "signUp":
        return "Sign up";

      default:
        return "";
    }
  };

  const renderDetailLine = () => {
    switch (currentScreen) {
      case "otp":
        return (
          <>
            Enter the 4-digit code sent to{" "}
            <span className="text-sky-500">+91 {phoneNumber}</span>
          </>
        );

      case "login":
        return (
          <p
            className="text-sky-400 cursor-pointer"
            onClick={handleBottomTextClick}
          >
            New to StarClinch? Create an account
          </p>
        );

      case "sendOtp":
        return (
          <p
            className="text-sky-400 cursor-pointer"
            onClick={handleBottomTextClick}
          >
            New to StarClinch? Create an account
          </p>
        );
      case "signUp":
        return (
          <p
            className="text-sky-400 cursor-pointer"
            onClick={handleBottomTextClick}
          >
            Existing User? Login
          </p>
        );

      default:
        return "";
    }
  };

  // key={currentScreen}
  //     className=" transition-all duration-500 ease-in-out
  //            transform origin-top
  //            animate-screenChange"

  return (
    <div className=" w-full flex items-start md:items-center justify-center  md:p-4 p-2  mt-12 md:mt-0 ">
      <div key={currentScreen}
        className={`w-full max-w-md transition-all duration-500 ease-in-out transform origin-center animate-screenChange`}
      >
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

          {currentScreen !== "login" && currentScreen !== "signUp" && (
            <button
              onClick={handleBackToLogin}
              className="flex items-center cursor-pointer gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
            >
              <SendHorizontal className="w-4 h-4 rotate-180" />
              Back
            </button>
          )}

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-2">
              {renderHeading()}
            </h1>
            <p className="text-gray-400 text-sm font-normal">
              {renderDetailLine()}
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
        </div>
      </div>
    </div>
  );
};

export default LoginFormWrapper;
