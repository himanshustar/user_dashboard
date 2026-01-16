import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Smartphone, Mail, SendHorizontal, Loader2 } from "lucide-react";

// ==================== VALIDATION SCHEMAS ====================
const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const phoneSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

// ==================== ICONS ====================
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.15 0 5.79 1.08 7.95 3.06l5.9-5.9C34.11 3.1 29.45 1 24 1 14.61 1 6.57 6.38 2.69 14.14l6.98 5.43C11.5 13.24 17.23 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24c0-1.64-.15-3.21-.43-4.71H24v9.42h12.7c-.55 2.97-2.23 5.49-4.74 7.18l7.33 5.69C43.78 37.2 46.5 31.01 46.5 24z"
    />
    <path
      fill="#FBBC05"
      d="M9.67 28.57a14.5 14.5 0 010-9.14l-6.98-5.43A23.96 23.96 0 000 24c0 3.94.95 7.66 2.69 10.99l6.98-5.42z"
    />
    <path
      fill="#34A853"
      d="M24 47c6.45 0 11.86-2.13 15.81-5.79l-7.33-5.69c-2.04 1.37-4.66 2.18-8.48 2.18-6.77 0-12.5-3.74-14.33-8.99l-6.98 5.42C6.57 41.62 14.61 47 24 47z"
    />
  </svg>
);

const TruecallerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="24" fill="#1A73E8" />
    <path
      fill="#fff"
      d="M33.6 30.4l-4.4-1.9c-.6-.3-1.3-.1-1.7.4l-2 2.4c-3.3-1.7-6-4.4-7.7-7.7l2.4-2c.5-.4.6-1.1.4-1.7l-1.9-4.4c-.3-.7-1.1-1.1-1.8-.9l-3.8.9c-.7.2-1.2.8-1.2 1.5 0 10.5 8.5 19 19 19 .7 0 1.3-.5 1.5-1.2l.9-3.8c.2-.7-.2-1.5-.9-1.8z"
    />
  </svg>
);

// ==================== MY INPUT COMPONENT ====================
const MyInput = ({ formikProps, name, label, isRequired, placeholder, type = "text" }) => {
  const hasError = formikProps.touched[name] && formikProps.errors[name];

  return (
    <div>
      {label && (
        <label className="block text-sm text-gray-300 mb-1.5">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={formikProps.values[name]}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-gray-900/40 rounded-lg text-white placeholder-gray-500 border transition-all duration-200 focus:outline-none ${
          hasError ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-blue-500"
        }`}
      />
      {hasError && (
        <p className="mt-1.5 text-sm text-red-500">{formikProps.errors[name]}</p>
      )}
    </div>
  );
};

// ==================== FORMIK SUBMIT BUTTON ====================
const FormikSubmitButton = ({ isLoading, loadingText, buttonText, className = "" }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full h-11 rounded-xl text-white text-sm font-medium cursor-pointer bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 border border-blue-300/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.75)] hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};

// ==================== MY BUTTON COMPONENT ====================
const MyButton = ({ 
  buttonText, 
  onClick, 
  isLoading, 
  loadingText, 
  disabled, 
  variant = "primary",
  className = "",
  type = "button"
}) => {
  const baseClasses = "w-full rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = variant === "primary" 
    ? "h-11 text-white bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 border border-blue-300/40 backdrop-blur-md hover:shadow-[0_0_10px_rgba(59,130,246,0.75)] hover:from-blue-400 hover:via-blue-600 hover:to-blue-800"
    : "h-12 mt-4 bg-gray-800/50 hover:bg-gray-800/70 text-white border border-gray-700/50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText}
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};

// ==================== OTP INPUT COMPONENT ====================
const OTPInput = ({ length = 4, value, onChange, hasError, disabled }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  const otpArray = value.split('').slice(0, length);
  while (otpArray.length < length) {
    otpArray.push('');
  }

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    const newOtpArray = [...otpArray];
    newOtpArray[index] = digit;
    const newOtp = newOtpArray.join('');
    onChange(newOtp);
    
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtpArray = [...otpArray];
      
      if (otpArray[index]) {
        newOtpArray[index] = '';
        onChange(newOtpArray.join(''));
      } else if (index > 0) {
        newOtpArray[index - 1] = '';
        onChange(newOtpArray.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, '');
    if (pastedData) {
      const newOtp = pastedData.slice(0, length);
      onChange(newOtp);
      const nextIndex = Math.min(newOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (index) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className="flex gap-3 justify-center">
      {otpArray.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          className={`
            w-14 h-14 text-center text-2xl font-semibold
            bg-gray-900/40 text-white rounded-xl
            border-2 transition-all duration-200
            focus:outline-none
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text hover:border-blue-400'}
            ${
              hasError
                ? "border-red-500"
                : digit
                ? "border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                : "border-gray-700"
            }
          `}
        />
      ))}
    </div>
  );
};

// ==================== MAIN LOGIN FORM ====================
const NewLoginForm = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [activeTab, setActiveTab] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [resendingOTP, setResendingOTP] = useState(false);

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    if (otpError) setOtpError("");
  };

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    if (activeTab === "phone") {
      setPhoneNumber(values.phone);
      setTimeout(() => {
        setCurrentScreen("otp");
        setSubmitting(false);
      }, 1000);
    } else {
      // Handle email login
      setTimeout(() => {
        console.log("Email login:", values);
        setSubmitting(false);
      }, 1000);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 4) {
      setOtpError("Please enter complete 4-digit OTP");
      return;
    }

    if (verifyingOTP || resendingOTP) return;

    setVerifyingOTP(true);
    setOtpError("");

    setTimeout(() => {
      if (otp === "1234") {
        setCurrentScreen("dashboard");
        setOtp("");
        setOtpError("");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
      setVerifyingOTP(false);
    }, 1200);
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

  const handleBackToLogin = () => {
    setCurrentScreen("login");
    setOtp("");
    setOtpError("");
    setVerifyingOTP(false);
    setResendingOTP(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#00000E] to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
        
        {currentScreen === "login" && (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 mb-6">Sign in to continue</p>

            {/* Tabs */}
            <div className="relative flex mb-6 border-b border-gray-700/50">
              <button
                type="button"
                onClick={() => setActiveTab("phone")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "phone" ? "text-gray-300" : "text-gray-500 hover:text-gray-400"
                }`}
              >
                <Smartphone className="w-4 h-4" color={activeTab === "phone" ? "rgba(28, 168, 255, 0.7)" : "#6a7282"} />
                Phone
              </button>

              <div className="w-px bg-gray-700/50 my-2 z-10" />

              <button
                type="button"
                onClick={() => setActiveTab("email")}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "email" ? "text-gray-300" : "text-gray-500 hover:text-gray-400"
                }`}
              >
                <Mail className="w-4 h-4" color={activeTab === "email" ? "rgba(28, 168, 255, 0.7)" : "#6a7282"} />
                Email
              </button>

              <div
                className={`absolute bottom-0 left-0 w-1/2 h-0.5 transition-transform duration-300 ease-in-out ${
                  activeTab === "phone" ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div
                  className="mx-auto w-3/4 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  style={{ clipPath: "polygon(0 50%, 5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%)" }}
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
                    <div>
                      <label className="block text-sm text-gray-300 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-medium">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formikProps.values.phone}
                          onChange={formikProps.handleChange}
                          onBlur={formikProps.handleBlur}
                          placeholder="Enter 10-digit number"
                          className={`w-full px-4 py-2.5 pl-14 bg-gray-900/40 rounded-lg text-white placeholder-gray-500 border transition-all duration-200 focus:outline-none ${
                            formikProps.errors.phone && formikProps.touched.phone
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-700 focus:border-blue-500"
                          }`}
                        />
                      </div>
                      {formikProps.errors.phone && formikProps.touched.phone && (
                        <p className="mt-1.5 text-sm text-red-500">{formikProps.errors.phone}</p>
                      )}
                    </div>

                    <FormikSubmitButton
                      isLoading={formikProps.isSubmitting}
                      loadingText="Sending OTP..."
                      buttonText="Send OTP"
                    />
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
                        <label className="block text-sm text-gray-300">Password</label>
                        <button type="button" className="text-sm text-blue-400 hover:underline">
                          Forgot Password?
                        </button>
                      </div>
                      <MyInput
                        formikProps={formikProps}
                        name="password"
                        label=""
                        isRequired={false}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>

                    <FormikSubmitButton
                      isLoading={formikProps.isSubmitting}
                      loadingText="Logging in..."
                      buttonText="Log In"
                    />
                  </Form>
                )}
              </Formik>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-800/30 text-gray-400">OR</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full h-11 bg-gray-800/50 hover:bg-gray-800/70 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-3 border border-gray-700/50">
                <GoogleIcon />
                Continue with Google
              </button>
              <button className="w-full h-11 bg-gray-800/50 hover:bg-gray-800/70 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-3 border border-gray-700/50">
                <TruecallerIcon />
                Continue with Truecaller
              </button>
            </div>
          </>
        )}

        {currentScreen === "otp" && (
          <>
            <button
              onClick={handleBackToLogin}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-4 transition-colors"
            >
              <SendHorizontal className="w-4 h-4 rotate-180" />
              Back to Login
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
            <p className="text-gray-400 mb-6">
              Enter the 4-digit code sent to +91 {phoneNumber}
            </p>

            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-4">Enter OTP</label>
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
              Correct OTP for testing: <span className="text-blue-400 font-mono">1234</span>
            </p>
          </>
        )}

        {currentScreen === "dashboard" && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
      </div>
    </div>
  );
};

export default NewLoginForm;
