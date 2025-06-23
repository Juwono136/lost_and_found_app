import React, { useEffect, useState } from "react";
import NotificationCard from "../../components/admin/NotificationCard";

const Notificication = () => {
  const [notifications, setNotifications] = useState([{
    _id:1,
    user_id:1,
    item_info:1,
    meeting_info:1,
    message:"message",
    is_read:false,
  },{
    _id:2,
    user_id:1,
    item_info:2,
    meeting_info:2,
    message:"message",
    is_read:false,
  }]);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        is_read: true,
      }))
    );
  };

  useEffect(() => {
  }, []);

  return (
    <div className="w-[90%]">
        <p>Check the notifications here</p>
        <p className="text-right underline" onClick={()=>markAllAsRead()}>Mark all as read</p>
        {notifications.map((notification)=>(
            <NotificationCard key={notification._id} {...notification}/>
        ))}
    </div>
  );
};

export default Notificication;
