import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

const NotificationDetailsPage = () => {
  const { dealId } = useParams();
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axiosInstance.get(
          `/deals/deal-notification/${dealId}/`,
        );
        console.log("res:", res);
      } catch (error) {
        console.error("Notification Fetch Failed", error);
      }
    };

    fetchNotification();
  }, []);

  return <div className="text-white">Deal ID: {dealId}</div>;
};

export default NotificationDetailsPage;
