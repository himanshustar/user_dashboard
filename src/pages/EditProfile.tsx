import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/useAuth";
import { Loader2, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import MyInput from "../components/ui/MyInput";
import { editProfileSchema } from "../schema/formSchema";
import FormikSubmitButton from "../components/ui/FormikSubmitButton";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, login } = useAuth();
  console.log("user:", user);
  const [emailVerified, setEmailVerified] = useState(user?.email_verified);
  const [phoneVerified, setPhoneVerified] = useState(user?.phone_verified);

  // Parse user data for initial values
  const getInitialValues = () => {
    return {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      alt_phone: user?.alt_phone || "",
      alt_email: user?.alt_email || "",
      company_name: user?.company_name || "",
      phone_verified: user?.phone_verified || 0,
      email_verified: user?.email_verified || 0,
      alt_phone_code: user?.alt_phone_code || "",
    };
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.patch("/auth/user/update/", values);

      if (response?.data?.success) {
        // Update user context
        login({
          first_name: response?.data?.data?.first_name || "",
          last_name: response?.data?.data?.last_name || "",
          email: response?.data?.data?.email || "",
          phone: response?.data?.data?.phone || "",
          alt_phone: response?.data?.data?.alt_phone || "",
          alt_email: response?.data?.data?.alt_email || "",
          company_name: response?.data?.data?.company_name || "",
          phone_verified: response?.data?.data?.phone_verified || null,
          email_verified: response?.data?.data?.email_verified || null,
          alt_phone_code: response?.data?.data?.alt_phone_code || "",
        });
      }

      // Show success message or navigate
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyEmail = () => {
    // Email verification logic
    console.log("Verify email");
    setEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    // Phone verification logic
    console.log("Verify phone");
    setPhoneVerified(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Edit Profile
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Update your personal information
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/70 shadow-xl">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={editProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps) => (
            <Form className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <MyInput
                  formikProps={formikProps}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your first name"
                  isRequired={true}
                />
                <MyInput
                  formikProps={formikProps}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                  isRequired={true}
                />
              </div>

              {/* Company Name */}
              <MyInput
                formikProps={formikProps}
                name="company_name"
                label="Company Name"
                placeholder="Enter company name (optional)"
              />

              {/* Mobile Number with Verification */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-medium">
                      +91
                    </span>
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
                  <button
                    type="button"
                    onClick={handleVerifyPhone}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                      phoneVerified
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-default"
                        : "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
                    }`}
                  >
                    {phoneVerified ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check size={16} />
                        Verified
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
                {formikProps.errors.phone && formikProps.touched.phone && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {formikProps.errors.phone}
                  </p>
                )}
              </div>

              {/* Alternate Mobile Number */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Alternate Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="alt_phone"
                    value={formikProps.values.alt_phone}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    placeholder="Enter alternate mobile number"
                    className={`w-full px-4 py-2.5 pl-14 bg-gray-900/40 rounded-lg text-white placeholder-gray-500 border transition-all duration-200 focus:outline-none ${
                      formikProps.errors.alt_phone &&
                      formikProps.touched.alt_phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-700 focus:border-blue-500"
                    }`}
                  />
                </div>
                {formikProps.errors.alt_phone &&
                  formikProps.touched.alt_phone && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {formikProps.errors.alt_phone}
                    </p>
                  )}
              </div>

              {/* Email with Verification */}
              <div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end">
                  <div className="flex-1 w-full">
                    <MyInput
                      formikProps={formikProps}
                      name="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    className={`w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                      emailVerified
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 cursor-default"
                        : "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
                    }`}
                  >
                    {emailVerified ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check size={16} />
                        Verified
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>

              {/* Alternate Email */}
              <MyInput
                formikProps={formikProps}
                name="alt_email"
                label="Alternate Email"
                placeholder="Enter alternate email"
                type="email"
              />

              {/* Submit Button */}
              <div className="pt-4">
                <FormikSubmitButton
                  isLoading={formikProps.isSubmitting}
                  buttonText={"Save Changes"}
                  loadingText={"Updating..."}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
