import { loadScript } from "../utils/loadScript";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export const openRazorpayCheckout = async (
  options: Record<string, unknown>,
): Promise<void> => {
  const loaded = await loadScript(RAZORPAY_SCRIPT_URL);

  if (!loaded) {
    throw new Error("Razorpay SDK failed to load");
  }

  if (!window.Razorpay) {
    throw new Error("Razorpay SDK not available");
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
};
