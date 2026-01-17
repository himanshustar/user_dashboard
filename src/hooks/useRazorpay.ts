import { useCallback } from "react";
import { openRazorpayCheckout } from "../services/razorpay.service";
import type {
  RazorpayOrder,
  RazorpaySuccessResponse,
  CreateOrderPayload,
} from "../types/razorpay";
import axiosInstance from "../api/axios";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

export const useRazorpay = () => {
  const createOrder = async (
    payload: CreateOrderPayload,
  ): Promise<RazorpayOrder> => {
    const { data } = await axiosInstance.post<RazorpayOrder>(
      `${VITE_API_BASE_URL}payment/`,
      {
        amount: payload.amount * 100,
        currency: payload.currency,
      },
    );

    return data;
  };

  const notifyBackend = async (
    status: "succeeded" | "failed" | "cancelled" | "timeout",
    payload?: unknown,
  ): Promise<void> => {
    await axiosInstance.post(`${VITE_API_BASE_URL}/payment`, {
      status,
      payload,
    });
  };

  const pay = useCallback(
    async ({
      amount,
      currency,
      name = "My App",
    }: {
      amount: number;
      currency: string;
      name?: string;
    }) => {
      const order = await createOrder({ amount, currency });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name,
        order_id: order.order_id,

        handler: async (response: RazorpaySuccessResponse) => {
          await notifyBackend("succeeded", response);
        },

        modal: {
          confirm_close: true,
          ondismiss: async (reason?: unknown) => {
            if (!reason) {
              await notifyBackend("cancelled");
            } else if (reason === "timeout") {
              await notifyBackend("timeout");
            } else {
              await notifyBackend("failed", reason);
            }
          },
        },

        retry: { enabled: false },
        timeout: 900,
        theme: { color: "#0d6efd" },
      };

      await openRazorpayCheckout(options);
    },
    [],
  );

  return { pay };
};
