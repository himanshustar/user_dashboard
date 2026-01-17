import { useState } from "react";
import MyInput from "../components/ui/MyInput";
import { Formik, Form } from "formik";
import { loginSchema, phoneSchema } from "../schema/formSchema";
import { Smartphone, Mail, SendHorizontal, Loader2 } from "lucide-react";
import FormikSubmitButton from "./ui/FormikSubmitButton";
import MyButton from "./ui/MyButton";
import OTPInput from "./ui/OTPInput";
import { GoogleIcon, TruecallerIcon } from "../utils/HelperStructure";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { useGoogleLoginHandler } from "../hooks/useGoogleLoginHandler";

const NewLoginForm = ({
  currentScreen,
  setCurrentScreen,
  phoneNumber,
  setPhoneNumber,
  otp,
  setOtp,
  otpError,
  setOtpError,
  verifyingOTP,
  setVerifyingOTP,
  resendingOTP,
  setResendingOTP,
}) => {
  const [activeTab, setActiveTab] = useState("email");
  const navigate = useNavigate();
  const { login } = useAuth();
  const googleLogin = useGoogleLoginHandler();

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    if (otpError) setOtpError("");
  };

  const handleLoginSubmit = async (values) => {
    try {
      if (activeTab === "phone") {
        setPhoneNumber(values.phone);

        const res = await axiosInstance.post("/auth/send-otp/", values);

        toast.success(res.message);
        setCurrentScreen("otp");
      } else {
        const res = await axiosInstance.post("/auth/login/", values);

        toast.success(res.message);
        login();
        navigate("/bookings");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    // 🔴 Validation
    if (otp.length !== 4) {
      setOtpError("Please enter a complete 4-digit OTP");
      toast.error("Invalid OTP");
      return;
    }

    // 🔴 Prevent multiple clicks
    if (verifyingOTP || resendingOTP) return;

    setVerifyingOTP(true);
    setOtpError("");

    try {
      const response = await axiosInstance.post("/auth/verify-otp/", {
        otp,
        phone: phoneNumber,
      });

      if (response?.status === 200) {
        toast.success(response?.message || "OTP verified successfully ✅");
        login(); // No user object needed

        navigate("/bookings");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error: any) {
      console.error("Verify OTP error:", error);
      setOtpError(error.message);
      toast.error(error.message);
    } finally {
      setVerifyingOTP(false);
    }
  };

  const handleResendOTP = () => {
    if (resendingOTP || verifyingOTP) return;

    setResendingOTP(true);
    setOtp("");
    setOtpError("");

    setTimeout(() => {
      console.log("OTP resent to:", phoneNumber);
      alert("OTP has been resent successfully!");
      setResendingOTP(false);
    }, 1000);
  };

  return (
    <>
      {currentScreen === "login" && (
        <>
          {/* Tabs */}
          <div className="relative flex mb-6 border-b border-gray-700/50">
            <button
              type="button"
              onClick={() => setActiveTab("phone")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === "phone"
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              <Smartphone
                className="w-4 h-4"
                color={
                  activeTab === "phone" ? "rgba(28, 168, 255, 0.7)" : "#6a7282"
                }
              />
              Phone
            </button>

            <div className="w-px bg-gray-700/50 my-2 z-10" />

            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === "email"
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              <Mail
                className="w-4 h-4"
                color={
                  activeTab === "email" ? "rgba(28, 168, 255, 0.7)" : "#6a7282"
                }
              />
              Email
            </button>

            <div
              className={`absolute bottom-0 left-0 w-1/2 h-0.5 transition-transform duration-300 ease-in-out ${
                activeTab === "phone" ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                className="mx-auto w-3/4 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                style={{
                  clipPath:
                    "polygon(0 50%, 5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%)",
                }}
              />
            </div>
          </div>

          {/* Phone Form */}
          {activeTab === "phone" && (
            <Formik
              initialValues={{ phone: "" }}
              validationSchema={phoneSchema}
              onSubmit={handleLoginSubmit}
            >
              {(formikProps) => (
                <Form className="space-y-4">
                  <MyInput
                    formikProps={formikProps}
                    name="phone"
                    label="Phone Number"
                    isRequired={true}
                    placeholder="Enter 10-digit number"
                    customType="phone"
                  />

                  <FormikSubmitButton
                    isLoading={formikProps.isSubmitting}
                    loadingText="Sending OTP..."
                    buttonText="Send OTP"
                    className="hidden md:block"
                  />
                  {/* MOBILE BOTTOM ACTION BAR */}
                  <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-[#01508A] to-[#66A3FF] px-4 py-4 pl-8 flex items-center gap-3 justify-center rounded-tl-[80px] z-50">
                    <button
                      disabled={formikProps.isSubmitting}
                      className="px-8 h-11 cursor-pointer bg-[#E8F1FA] text-xs text-[#004B87] font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:bg-white transition-colors mr-4"
                      style={{ borderRadius: "2rem 0 4rem 2rem" }}
                    >
                      {formikProps.isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <SendHorizontal className="w-4 h-4" />
                          Send OTP
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => googleLogin()}
                      className="w-11 h-11 cursor-pointer rounded-[15px] rounded-bl-none bg-[#020211] flex items-center justify-center"
                    >
                      <GoogleIcon />
                    </button>

                    <button className="w-11 h-11 cursor-pointer rounded-[15px] rounded-bl-none bg-[#020211] flex items-center justify-center">
                      <TruecallerIcon />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Email Form */}
          {activeTab === "email" && (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              {(formikProps) => (
                <Form className="space-y-4">
                  <MyInput
                    formikProps={formikProps}
                    name="email"
                    label="Email Address"
                    isRequired={true}
                    placeholder="Enter your email"
                    type="email"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm text-[#E3EDFF]">
                        Password <span className="text-red-400">*</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-[#E3EDFF] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <MyInput
                      formikProps={formikProps}
                      name="password"
                      label=""
                      isRequired={true}
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>

                  <FormikSubmitButton
                    isLoading={formikProps.isSubmitting}
                    loadingText="Logging in..."
                    buttonText="Login"
                    className="hidden md:block"
                  />

                  {/* MOBILE BOTTOM ACTION BAR */}
                  <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-[#01508A] to-[#66A3FF] px-4 py-4 pl-8 flex items-center gap-3 justify-center rounded-tl-[80px] z-50">
                    <button
                      type="submit"
                      disabled={formikProps.isSubmitting}
                      className="px-8 h-11 cursor-pointer bg-[#E8F1FA] text-xs text-[#004B87] font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:bg-white transition-colors mr-4"
                      style={{ borderRadius: "2rem 0 4rem 2rem" }}
                    >
                      {formikProps.isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <SendHorizontal className="w-4 h-4" />
                          Login
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => googleLogin()}
                      className="w-11 h-11 cursor-pointer rounded-[15px] rounded-bl-none bg-[#020211] flex items-center justify-center"
                    >
                      <GoogleIcon />
                    </button>

                    <button className="w-11 h-11 rounded-[15px] rounded-bl-none bg-[#020211] flex items-center justify-center">
                      <TruecallerIcon />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          <div className="relative my-6 hidden md:block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-800/30 text-gray-400">OR</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-0 ">
            <MyButton
              variant="secondary"
              onClick={() => googleLogin()}
              buttonText={
                <div className="flex items-center justify-center gap-3">
                  <GoogleIcon />
                  Continue with Google
                </div>
              }
            />
            <MyButton
              variant="secondary"
              buttonText={
                <div className="flex items-center justify-center gap-3">
                  <TruecallerIcon />
                  Continue with Truecaller
                </div>
              }
            />
          </div>
        </>
      )}

      {currentScreen === "otp" && (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-4">
              Enter OTP
            </label>
            <OTPInput
              length={4}
              value={otp}
              onChange={handleOtpChange}
              hasError={!!otpError}
              disabled={verifyingOTP || resendingOTP}
            />
          </div>

          {otpError && (
            <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>
          )}

          <MyButton
            buttonText="Verify OTP"
            onClick={handleVerifyOTP}
            isLoading={verifyingOTP}
            loadingText="Verifying..."
            disabled={resendingOTP || otp.length !== 4}
          />

          <MyButton
            variant="secondary"
            buttonText="Resend OTP"
            onClick={handleResendOTP}
            isLoading={resendingOTP}
            loadingText="Resending..."
            disabled={verifyingOTP}
          />

          <p className="text-center text-gray-400 text-sm mt-4">
            Correct OTP for testing:{" "}
            <span className="text-blue-400 font-mono">1234</span>
          </p>
        </>
      )}

      {currentScreen === "dashboard" && (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <h2 className="text-3xl font-bold text-white mb-2">Welcome!</h2>
          <p className="text-gray-300 mb-8">You have successfully logged in</p>
          <button
            onClick={() => {
              setCurrentScreen("login");
              setPhoneNumber("");
              setOtp("");
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NewLoginForm;
