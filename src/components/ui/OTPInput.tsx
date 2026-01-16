import { useEffect, useRef } from "react";

const OTPInput = ({ length = 4, value, onChange, hasError, disabled }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  const otpArray = value.split("").slice(0, length);
  while (otpArray.length < length) {
    otpArray.push("");
  }

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const newOtpArray = [...otpArray];
    newOtpArray[index] = digit;
    const newOtp = newOtpArray.join("");
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
        newOtpArray[index] = "";
        onChange(newOtpArray.join(""));
      } else if (index > 0) {
        newOtpArray[index - 1] = "";
        onChange(newOtpArray.join(""));
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
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
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
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-text hover:border-blue-400"
            }
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

export default OTPInput;
