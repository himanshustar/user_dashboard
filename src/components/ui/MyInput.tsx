import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const MyInput = ({
  name,
  label,
  isRequired = false,
  disabled = false,
  formikProps,
  type = "text",
  customType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const { values, errors, touched, handleChange, handleBlur, submitCount } =
    formikProps;

  const hasError = errors[name] && (touched[name] || submitCount > 0);

  const isPhone = customType === "phone";

  const inputType = isPhone
    ? "tel"
    : type === "password"
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[#E3EDFF] mb-2">
          {label} {isRequired && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="relative">
        {/* +91 prefix for phone */}
        {isPhone && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
            +91
          </span>
        )}

        <input
          name={name}
          value={values[name] || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          type={inputType}
          inputMode={isPhone ? "numeric" : undefined}
          maxLength={isPhone ? 10 : undefined}
          className={`w-full px-4 py-3 ${isPhone ? "pl-14" : ""} ${
            type === "password" ? "pr-12" : "pr-4"
          }
          font-normal bg-gray-900/40 border-[0.8px] rounded-xl
          text-[#E3EDFF] placeholder-gray-600 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 h-10.5
          ${
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-800 focus:border-blue-500/50"
          }`}
          {...props}
        />

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
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
