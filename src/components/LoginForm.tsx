import { useState } from "react";
import MyInput from "../components/ui/MyInput";
import { Formik, Form } from "formik";
import { loginSchema, phoneSchema } from "../schema/formSchema";
import { Smartphone, Mail } from "lucide-react";
import FormikSubmitButton from "./ui/FormikSubmitButton";
import LightRays from "./ui/LightRays";

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

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("email"); // 'email' or 'phone'

  return (
    <div className="min-h-screen md:min-h-full w-full flex items-start md:items-center justify-center  md:p-4 p-2 mt-12 md:mt-0">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden bg-transparent md:bg-[#00000E] md:backdrop-blur-xl rounded-3xl p-4 md:p-8  md:border md:border-gray-700/50 md:shadow-2xl">
          <div className="absolute inset-0 top-0 min-h-screen rounded-3xl hidden md:block">
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

          {/* <div className="absolute bottom-0 left-0 w-[177px] h-[177px] bg-blue-500" /> */}

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-white mb-2">Log in</h1>
            <p className="text-gray-400 text-sm font-normal">
              Enter details to log into your account.
            </p>
          </div>

          {/* Tabs */}
          <div className="relative flex mb-6 border-b border-gray-700/50">
            {/* Phone Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("phone")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 md:px-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === "phone"
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Phone
            </button>

            {/* Vertical Divider */}
            <div className="w-px bg-gray-700/50 my-2 z-10" />

            {/* Email Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 md:px-4 pl-4 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === "email"
                  ? "text-gray-300"
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              <Mail className="w-4 h-4" />
              Email Address
            </button>

            {/* 🔥 Animated Underline */}
            <div
              className={`absolute bottom-0 left-0 w-1/2 h-0.5
      transition-transform duration-300 ease-in-out
      ${activeTab === "phone" ? "translate-x-0" : "translate-x-full"}
    `}
            >
              <div
                className="mx-auto w-3/4 h-full
        bg-gradient-to-r from-transparent via-cyan-400 to-transparent
        shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                style={{
                  clipPath:
                    "polygon(0 50%, 5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%)",
                }}
              />
            </div>
          </div>

          {/* Email Form */}
          {activeTab === "email" && (
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("Form values:", values);
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 1000);
              }}
              
            >
              {(props) => (
                <Form className="space-y-4">
                  {/* Email Input */}
                  <MyInput
                    formikProps={props}
                    name="email"
                    label="Email Address"
                    isRequired={false}
                    placeholder="Enter your email address"
                  />

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm text-gray-300">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-sm text-[#E3EDFF] hover:underline transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <MyInput
                      formikProps={props}
                      name="password"
                      label=""
                      isRequired={false}
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Submit Button */}
                  <FormikSubmitButton
                    isLoading={props.isSubmitting}
                    loadingText={props.isSubmitting}
                    buttonText="Log In"
                    className={"hidden md:block"}
                  />
                </Form>
              )}
            </Formik>
          )}

          {/* Phone Form */}
          {activeTab === "phone" && (
            <Formik
              initialValues={{
                phone: "",
              }}
              validationSchema={phoneSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("Phone values:", values);
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form className="space-y-4">
                  {/* Phone Input */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-medium">
                        +91
                      </span>

                      <input
                        type="tel"
                        name="phone"
                        value={props.values.phone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder="Enter your phone number"
                        className={` w-full px-4 py-2.5 pl-14 bg-gray-900/40 rounded-lg text-white placeholder-gray-500
      border transition-all duration-200
      focus:outline-none
      ${
        props.errors.phone
          ? "border-red-500 focus:border-red-500"
          : "border-gray-700 focus:border-blue-500"
      }
    `}
                      />
                    </div>

                    {props.errors.phone && props.touched.phone && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {props.errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <FormikSubmitButton
                    isLoading={props.isSubmitting}
                    loadingText={"Sending OTP..."}
                    buttonText="Send OTP"
                    className={"hidden md:block"}
                  />
                </Form>
              )}
            </Formik>
          )}

          {/* Divider */}
          <div className="relative my-6 hidden md:block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[#00000E] text-gray-400">OR</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="hidden md:flex flex-col justify-center items-center gap-4 z-10 ">
            {/* Google */}
            <button
              type="button"
              className="w-full h-11 bg-gray-800/50 hover:bg-gray-800/70
             text-white font-medium rounded-lg transition-all duration-200
             flex items-center justify-center gap-3
             border border-gray-700/50 cursor-pointer"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Truecaller */}
            <button
              type="button"
              className="w-full h-11 bg-gray-800/50 hover:bg-gray-800/70
             text-white font-medium rounded-lg transition-all duration-200
             flex items-center justify-center gap-3
             border border-gray-700/50 cursor-pointer"
            >
              <TruecallerIcon />
              Continue with Truecaller
            </button>
          </div>
        </div>
        {/* MOBILE BOTTOM ACTION BAR */}
        <div
          className="
    fixed bottom-0 left-0 right-0
    md:hidden
    bg-gradient-to-t from-[#001B3A] to-[#003B73]
    px-4 py-3
    flex items-center gap-3 justify-center
    rounded-tl-[80px]
    z-50
  "
        >
          <button
            className="
    px-12
    h-11
    bg-white
    text-black
    rounded-3xl
    font-medium
    flex items-center justify-center gap-2 
  "
          >
            Login
          </button>

          <button className="w-11 h-11 rounded-lg bg-black flex items-center justify-center">
            <GoogleIcon />
          </button>

          <button className="w-11 h-11 rounded-lg bg-black flex items-center justify-center">
            <TruecallerIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
