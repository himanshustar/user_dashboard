import { Formik, Form } from "formik";
import axiosInstance from "../api/axios";
import MyInput from "../components/ui/MyInput";
import FormikSubmitButton from "../components/ui/FormikSubmitButton";
import toast from "react-hot-toast";
import { changePasswordSchema } from "../schema/formSchema";



const ChangePasswordPage = () => {
  const getInitialValues = () => {
    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
    };
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.patch(
        "/auth/user/change-password/",
        {
          old_password: values.old_password,
          new_password: values.new_password,
        }
      );

      if (response?.data?.success) {
        toast.success("Password changed successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error(
        error?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Change Password
          </h1>
        </div>
        <p className="text-gray-400 text-sm">
          Create a strong password to secure your account
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-700/70 shadow-xl">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={changePasswordSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps) => (
            <Form className="space-y-6">
              {/* Old Password */}

              <MyInput
                type="password"
                name="old_password"
                label="Old Password"
                placeholder="Enter your old password"
                formikProps={formikProps}
              />

              {/* New Password */}

              <MyInput
                type="password"
                name="new_password"
                label="New Password"
                placeholder="Enter your new password"
                formikProps={formikProps}
              />

              {/* Confirm New Password */}

              <MyInput
                type="password"
                name="confirm_password"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                formikProps={formikProps}
              />

              {/* Password Requirements */}
              <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-gray-300 mb-2 font-medium">
                  Password must contain:
                </p>
                <ul className="space-y-1.5">
                  <li className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    At least 4 characters
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <FormikSubmitButton
                  isLoading={formikProps.isSubmitting}
                  buttonText={"Change Password"}
                  loadingText={"Changing..."}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
