import { Loader2 } from "lucide-react";

const FormikSubmitButton = ({
  isLoading,
  loadingText,
  buttonText,
  className = "",
}) => {
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

export default FormikSubmitButton;
