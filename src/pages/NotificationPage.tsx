import React, { useEffect, useState } from "react";
import { Bell, CheckCircle, Clock, Loader2, Trash2 } from "lucide-react";
import axiosInstance from "../api/axios";
import { formatDate } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import { LoaderUi } from "../utils/HelperStructure";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        // Simulating API call with mock data
        const res = await axiosInstance.get("auth/notifications/");

        setNotifications(res?.data?.notifications);
        setLoading(false);
      } catch (error) {
        console.error("Notification Fetch Failed", error);
        setLoading(false);
      }
    };

    fetchNotification();
  }, []);

  const unreadCount = notifications.filter((n) => n.status === 0).length;

  if (loading) {
    return <LoaderUi />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <Bell className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <p className="text-slate-400 text-sm mt-1">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 text-center border border-slate-700/50">
            <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              No notifications yet
            </h3>
            <p className="text-slate-500">
              When you get notifications, they'll show up here
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`group bg-slate-800/50 cursor-pointer backdrop-blur-sm rounded-xl p-5 border transition-all hover:bg-slate-800/70 hover:shadow-lg hover:shadow-blue-500/5 ${
                notification.status === 0
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-slate-700/50"
              }`}
              onClick={() =>
                navigate(`/query/initialize/${notification?.deal_id}`)
              }
            >
              <div className="flex items-start gap-4">
                {/* Unread Indicator */}
                <div className="pt-1">
                  {notification.status === 0 && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold mb-1 ${
                      notification.status === 0
                        ? "text-white"
                        : "text-slate-300"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(notification.created_at)}</span>
                    </div>
                    {notification.deal_id && (
                      <span className="bg-slate-700/50 px-2 py-1 rounded">
                        Deal #{notification.deal_id}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
