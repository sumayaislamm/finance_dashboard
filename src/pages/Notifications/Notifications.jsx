import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import "./Notification.css";
import { useNavigate } from "react-router";

const Notifications = ({ duration = 3000 }) => {
  const { notification, clearNotification } = useNotification();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        clearNotification();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [notification, duration, clearNotification]);

  if (!notification) return null;

  const handleClick = () => {
    navigate(notification.path);
    clearNotification();
  };

  return (
    <div
      onClick={handleClick}
      className={`notification ${visible ? "show" : ""}`}
      style={{ cursor: "pointer" }}
    >
      {notification.message}
    </div>
  );
};

export default Notifications;