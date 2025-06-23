import React, { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const NotificationCard = ({user_id, item_info, meeting_info, message, is_read}) => {
  const [isRead, setIsRead] = useState(is_read);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 431);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 431); 
      };
    
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  useEffect(() => {
    setIsRead(is_read)
  }, [is_read]);

  const handleMarkAsRead = () => {
    setIsRead(true);
  };

  return (
    <div className="flex items-center bg-violet-200 border border-solid border-purple-700 mb-[20px] p-[10px] " onClick={handleMarkAsRead}>
        <p className={`flex flex-row gap-2 ${isRead ? "" : "font-bold"} ${isMobile?"text-xs" : "text-base"}`} > <AiFillExclamationCircle size={30} className="text-purple-800"/>Item with id {item_info} needs approval for meeting. Please approve for progress of item.</p>
    </div>
  );
};

export default NotificationCard;
