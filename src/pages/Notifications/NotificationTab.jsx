import React, { useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const NotificationTab = () => {
  const { notifications, markAsRead, fetchNotifications } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications(); // reload when tab opens
  }, []);

  if (!notifications.length)
    return <p className="p-4 text-center">No notifications found</p>;

  return (
    <div className="p-4 flex flex-col gap-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`alert shadow-lg cursor-pointer ${
            n.read ? "opacity-50" : "alert-info"
          }`}
          onClick={() => {
            navigate(n.path);
            markAsRead(n.id);
          }}
        >
          <span>{n.message}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationTab;