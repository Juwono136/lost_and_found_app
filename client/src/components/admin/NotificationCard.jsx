import { useEffect, useState } from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const NotificationCard = ({user_id, item_info, meeting_info, message, is_read}) => {
  const [isRead, setIsRead] = useState(is_read);

  useEffect(() => {
    setIsRead(is_read)
  }, [is_read]);

  const handleMarkAsRead = () => {
    setIsRead(true);
  };

  return (
    <div className="flex items-center border border-gray-300 shadow shadow-lg mb-5 p-4 " onClick={handleMarkAsRead}>
        <p className={`flex flex-row gap-2 ${isRead ? "" : "font-bold"} text-xs md:text-base`} > <AiFillExclamationCircle size={30} className="text-purple-800"/>Item with id {item_info} needs approval for meeting. Please approve for progress of item.</p>
    </div>
  );
};

export default NotificationCard;
