import { useState, useEffect } from "react";
import OTPInput from "./OTPInput";
import MyButton from "../ui/MyButton";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";
import { X } from "lucide-react";

const VerifyOtpModal = ({ type, value, onClose, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [error, setError] = useState("");

  // 🔹 send OTP when modal opens
  useEffect(() => {
    sendOtp();
  }, []);

  const sendOtp = async () => {
    try {
      setSendingOtp(true);
      await axiosInstance.post("/auth/send-otp/", {
        [type]: value,
      });
      toast.success("OTP sent");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 4) {
      setError("Please enter complete 4-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axiosInstance.post("/auth/verify-otp/", {
        otp,
        [type]: value,
      });

      toast.success(`${type} verified successfully`);
      onVerified();
      onClose();
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl">
        {/* ---------------- Header ---------------- */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Verify {type === "email" ? "Email" : "Phone"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">OTP sent to {value}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* ---------------- Body ---------------- */}
        <div className="px-6 py-6 space-y-4">
          <OTPInput
            value={otp}
            onChange={setOtp}
            hasError={!!error}
            disabled={loading}
          />

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <MyButton
            buttonText="Verify OTP"
            loadingText="Verifying..."
            isLoading={loading}
            onClick={verifyOtp}
            disabled={otp.length !== 4}
          />
        </div>

        {/* ---------------- Footer ---------------- */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700">
          <MyButton
            buttonText="Resend OTP"
            variant="secondary"
            isLoading={sendingOtp}
            onClick={sendOtp}
            className="w-auto px-4 h-9 text-xs"
          />

          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
