import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import MeetingTable from "../../components/admin/MeetingTable";

const Meetings = () => {
  const [meetings, setMeetings] = useState([{
    _id:1,
    item_id:"1",
    user_id:"1",
    meeting_date:"20/03/2025",
    meeting_time:"12:00",
    meeting_location:"fx",
    meeting_status:"Not yet",
    createdAt:"",
    updatedAt:"",
  }]);

  const navigate =useNavigate()

  useEffect(() => {
  }, []);

  return (
    <div className=" w-full">
        <div>
            <MeetingTable meetings={meetings}/>
        </div>
    </div>
  );
};

export default Meetings;
