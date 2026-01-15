import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// MyInput Component
const MyInput = ({
  name,
  label,
  isRequired = false,
  disabled = false,
  formikProps,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const { values, errors, touched, handleChange, handleBlur } = formikProps;

  const hasError =
    errors[name] && (touched[name] || formikProps.submitCount > 0);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-400 mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          type={name === "password" && !showPassword ? "password" : "text"}
          className={` w-full px-4 py-3 ${
            name === "password" ? "pr-12" : "pr-4"
          } font-normal bg-gray-900/40 border-[0.8px] rounded-xl text-[#E3EDFF] placeholder-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 h-10.5 ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-800 focus:border-blue-500/50"
          }`}
          {...props}
        />

        {name === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 focus:outline-none transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {hasError && (
        <p className="mt-1.5 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );
};

export default MyInput;
