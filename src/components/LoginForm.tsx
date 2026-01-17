import { useState } from "react";
import MyInput from "../components/ui/MyInput";
import { Formik, Form } from "formik";
import {
  loginSchema,
  phoneSchema,
  phoneWithPassSchema,
} from "../schema/formSchema";
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

const LoginForm = ({
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
  const [phoneLoginMode, setPhoneLoginMode] = useState("otp");

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    if (otpError) setOtpError("");
  };

  const handleLoginSubmit = async (values) => {
    try {
      const res = await axiosInstance.post("/auth/login/", values);

      toast.success(res.message);
      login();
      navigate("/bookings");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };

  const handleSendOtp = async (values) => {
    setPhoneNumber(values.phone);
    try {
      const res = await axiosInstance.post("/auth/send-otp/", values);

      toast.success(res.message);
      setCurrentScreen("otp");
    } catch (error: any) {
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

  const LoginModeSwitch = ({ mode, onChange }) => {
    const isOtp = mode === "otp";

    return (
      <div className="w-full flex items-center justify-end my-2">
        {/* <label
          className={` ${isOtp ? "invisible" : "block"} text-sm text-[#E3EDFF]`}
        >
          Password <span className="text-red-400">*</span>
        </label> */}
        <div className="w-fit gap-1 md:gap-2 flex items-center justify-between text-sm text-[#E3EDFF]">
          Login using
          <span
            className={`transition-colors ${
              isOtp ? "text-sky-400" : "text-gray-400"
            }`}
          >
            OTP
          </span>
          <button
            type="button"
            onClick={() => onChange(isOtp ? "password" : "otp")}
            className={`relative cursor-pointer w-8 h-4 rounded-full  transition-all ease-in-out duration-100 ${
              isOtp ? "bg-sky-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-[3px]  h-3 w-3.5 rounded-full bg-white transition-all ease-in-out duration-100 ${
                isOtp ? "translate-x-0" : "translate-x-3"
              }`}
            />
          </button>
          <span
            className={`transition-colors ${
              !isOtp ? "text-sky-400" : "text-gray-400"
            }`}
          >
            Password
          </span>
        </div>
      </div>
    );
  };

  const getPhoneSchema = (mode) =>
    mode === "otp" ? phoneSchema : phoneWithPassSchema;

  const handlePhoneSubmit = async (values) => {
    if (phoneLoginMode === "otp") {
      await handleSendOtp(values);
    } else {
      await handleLoginSubmit(values);
    }
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
              initialValues={{ phone: "", password: "" }}
              validationSchema={getPhoneSchema(phoneLoginMode)}
              onSubmit={handlePhoneSubmit}
            >
              {(formikProps) => (
                <Form className="space-y-4">
                  <MyInput
                    formikProps={formikProps}
                    name="phone"
                    label=""
                    isRequired
                    placeholder="Enter 10-digit number"
                    customType="phone"
                  />

                  {/* MODE SWITCH */}
                  <LoginModeSwitch
                    mode={phoneLoginMode}
                    onChange={setPhoneLoginMode}
                  />

                  {/* PASSWORD FIELD */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      phoneLoginMode === "password"
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <MyInput
                      formikProps={formikProps}
                      name="password"
                      label=""
                      isRequired
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>

                  <FormikSubmitButton
                    isLoading={formikProps.isSubmitting}
                    loadingText={
                      phoneLoginMode === "otp"
                        ? "Sending OTP..."
                        : "Logging in..."
                    }
                    buttonText={phoneLoginMode === "otp" ? "Send OTP" : "Login"}
                    className="hidden md:block"
                  />
                  {/* MOBILE BOTTOM ACTION BAR */}
                  <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-[#01508A] to-[#66A3FF] px-4 py-4 pl-8 flex items-center gap-3 justify-center rounded-tl-[80px] z-50">
                    <button
                      type="submit"
                      disabled={formikProps.isSubmitting}
                      className={"px-10 h-11 cursor-pointer bg-[#E8F1FA] text-sm text-[#004B87] font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:bg-white transition-colors mr-4"}
                      style={{ borderRadius: "2rem 0 4rem 2rem" }}
                    >
                      {formikProps.isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <SendHorizontal
                            className={` h-4 w-4 `}
                          />
                          {phoneLoginMode === "otp" ? "Send OTP" : "Login"}
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => googleLogin()}
                      className="w-11 h-11 cursor-pointer rounded-[15px] rounded-bl-none bg-[#101828] flex items-center justify-center"
                    >
                      <GoogleIcon />
                    </button>

                    <button className="w-11 h-11 rounded-[15px] rounded-bl-none bg-[#101828] flex items-center justify-center">
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
                    label=""
                    isRequired={true}
                    placeholder="Enter your email"
                    type="email"
                  />

                  <div>
                    <div className="flex items-center justify-end mb-1.5">
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
                      className="px-10 h-11 cursor-pointer bg-[#E8F1FA] text-sm text-[#004B87] font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:bg-white transition-colors mr-4"
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
                      className="w-11 h-11 cursor-pointer rounded-[15px] rounded-bl-none bg-[#101828] flex items-center justify-center"
                    >
                      <GoogleIcon />
                    </button>

                    <button className="w-11 h-11 rounded-[15px] rounded-bl-none bg-[#101828] flex items-center justify-center">
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
            <div className="text-white flex items-center justify-center gap-6">
              <p className="">Continue with</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => googleLogin()}
                  className="w-10 h-10 cursor-pointer rounded-[15px] rounded-bl-none bg-[#ffffff] flex items-center justify-center"
                >
                  <GoogleIcon />
                </button>
                <button className="w-10 h-10 cursor-pointer rounded-[15px] rounded-bl-none bg-[#ffffff] flex items-center justify-center">
                  <TruecallerIcon bgColor="#fff" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentScreen === "sendOtp" && (
        <>
          <Formik
            initialValues={{ phone: "" }}
            validationSchema={phoneSchema}
            onSubmit={handleSendOtp}
          >
            {(formikProps) => (
              <Form className="space-y-4">
                <MyInput
                  formikProps={formikProps}
                  name="phone"
                  label=""
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

          <div className="relative my-6 hidden md:block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-800/30 text-gray-400">OR</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-0 ">
            {/* <MyButton
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
            /> */}
            <div className="text-white flex items-center justify-center gap-6">
              <p className="">Continue with</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => googleLogin()}
                  className="w-10 h-10 cursor-pointer rounded-[15px] rounded-bl-none bg-[#ffffff] flex items-center justify-center"
                >
                  <GoogleIcon />
                </button>
                <button className="w-10 h-10 cursor-pointer rounded-[15px] rounded-bl-none bg-[#ffffff] flex items-center justify-center ">
                  <TruecallerIcon />
                </button>
              </div>
            </div>
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
        </>
      )}

      {currentScreen === "signUp" && (
        <div className="w-full md:px-12 mt-12 md:mt-0">
          <button
            onClick={() => navigate("https://starclinch.com/book/category")}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 whitespace-nowrap cursor-pointer"
          >
            Post Your Requirement
          </button>
        </div>
      )}
    </>
  );
};

export default LoginForm;
