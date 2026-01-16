import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useGoogleLoginHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "implicit", // best for SPA
    onSuccess: async (tokenResponse) => {
      try {
        /**
         * tokenResponse.id_token is what backend needs
         */
        const res = await axiosInstance.get(
          "/auth/google/auth",
          {
            id_token: tokenResponse.id_token,
          },
          {
            withCredentials: true, // IMPORTANT if backend sets cookies
          }
        );

        toast.success(res.data.message || "Logged in with Google");

        login(); // mark authenticated
        navigate("/bookings");
      } catch (err: any) {
        console.error(err);
        toast.error(err?.response?.data?.error || "Google login failed");
      }
    },
    onError: () => {
      toast.error("Google authentication failed");
    },
  });

  return googleLogin;
};
