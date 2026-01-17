import React from "react";
import { useRazorpay } from "../../hooks/useRazorpay";

interface PayButtonProps {
  amount: number;
  currency?: string;
}

const PayButton: React.FC<PayButtonProps> = ({ amount, currency = "USD" }) => {
  const { pay } = useRazorpay();

  return (
    <button
      onClick={() => pay({ amount, currency })}
      className="w-full sm:w-auto cursor-pointer px-4 md:px-6 py-2.5 md:py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm md:text-base shadow-lg shadow-blue-500/30"
    >
      Book Now
    </button>
  );
};

export default PayButton;
