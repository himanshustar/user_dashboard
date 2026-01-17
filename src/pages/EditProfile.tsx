import { useState } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "../context/useAuth";
import { Check } from "lucide-react";
import axiosInstance from "../api/axios";
import MyInput from "../components/ui/MyInput";
import { editProfileSchema } from "../schema/formSchema";
import FormikSubmitButton from "../components/ui/FormikSubmitButton";
import toast from "react-hot-toast";
import VerifyOtpModal from "../components/ui/VerifyOtpModal";

const EditProfile = () => {
  const { user, login } = useAuth();
  const [emailVerified, setEmailVerified] = useState(user?.email_verified);
  const [phoneVerified, setPhoneVerified] = useState(user?.phone_verified);
  const [verifyModal, setVerifyModal] = useState<{
    type: "email" | "phone";
    value: string;
  } | null>(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.patch("/auth/user/update/", values);
      login(response?.data);

      // Show success message or navigate
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyEmail = async () => {
    setVerifyModal({
      type: "email",
      value: user.email,
    });
  };

  const handleVerifyPhone = async () => {
    setVerifyModal({
      type: "phone",
      value: user.phone,
    });
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
          initialValues={{
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
          }}
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
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end">
                <div className="flex-1 w-full">
                  <MyInput
                    formikProps={formikProps}
                    name="phone"
                    label="Mobile Number"
                    isRequired={true}
                    placeholder="Enter 10-digit number"
                    customType="phone"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className={`w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
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

              <MyInput
                formikProps={formikProps}
                name="phone"
                label="Mobile Number"
                isRequired={true}
                placeholder="Enter 10-digit number"
                customType="phone"
              />

              {/* Alternate Mobile Number */}
              <MyInput
                formikProps={formikProps}
                name="alt_phone"
                label="Alternate Mobile Number"
                placeholder="Enter alternate mobile number"
                customType="phone"
              />

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
                    className={`w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
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
      {verifyModal && (
        <VerifyOtpModal
          type={verifyModal.type}
          value={verifyModal.value}
          onClose={() => setVerifyModal(null)}
          onVerified={() => {
            login({
              ...user,
              [`${verifyModal.type}_verified`]: true,
            });
          }}
        />
      )}
    </div>
  );
};

export default EditProfile;
