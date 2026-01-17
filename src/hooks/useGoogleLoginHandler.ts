import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useGoogleLoginHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    // flow: "auth-code", // best for SPA
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        console.log("tokenResponse", tokenResponse);
        const res = await axiosInstance.get(
          `auth/google/auth?code=${tokenResponse?.code}`
        );

        toast.success(res?.message || "Logged in with Google");

        login(); // mark authenticated
        navigate("/bookings");
      } catch (err: any) {
        console.error(err);
        toast.error(err?.message || "Google login failed");
      }
    },
    onError: () => {
      toast.error("Google authentication failed");
    },
  });

  return googleLogin;
};
