import { useEffect, useState } from "react";
import MeetingTable from "../../components/admin/MeetingTable";
import { FaSearch} from "react-icons/fa";
import { Input, Popover,PopoverHandler,PopoverContent } from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from 'dayjs'

const Meetings = () => {
  const [searchItem, setSearchItem]=useState("")
  const [meetings, setMeetings] = useState([{
    _id:1,
    meeting_id:1,
    user_id:1,
    meeting_date:"20/03/2025",
    meeting_time:"12:00",
    meeting_location:"fx",
    meeting_status:"Completed",
    createdAt:"",
    updatedAt:"",
  }]);

  const [user, setUser]=useState([{
    _id:1,
    profilePicture:"",
    username: "Juwono",
    phone:"+62 812-3456-7890",
    email:"juwono@student.binus.ac.id",
    address:"fx",
    role:"admin"
  }])
  const [value, setValue] = useState({ 
        startDate: null, 
        endDate: null
    });
  const [openPopover, setOpenPopover] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (newValue.startDate && newValue.endDate) {
      setOpenPopover(false); 
    }
  };
  
  const formatDateRange = ({ startDate, endDate }) => {
        if (!startDate && !endDate) return "";
        if (startDate && !endDate) return dayjs(startDate).format("DD/MM/YYYY");
        if (startDate && endDate) {
          return `${dayjs(startDate).format("DD/MM/YYYY")} - ${dayjs(endDate).format("DD/MM/YYYY")}`;
        }
        return "";
      }
      

  useEffect(() => {
  }, []);

  return (
    <div className=" w-full">
        <div>
          <div className="flex flex-row justify-between items-center">
          List of Meetings
          <div className="pt-3 pb-3 flex flex-row flex-wrap gap-4 items-center ">
          <div className="flex items-center gap-2 flex-1 relative">
            <FaSearch className="absolute left-3 transform-translate-y-1/2 text-gray-400"/>
            <Input
              className="w-full pl-10 custom-input"
              label="search item here.."
              labelProps={{ className: "custom-label pl-10" }}
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
                    <div className="flex items-center gap-2 flex-1 relative">
            <Popover open={openPopover} handler={setOpenPopover}>
              <PopoverHandler>
                <Input
                  label="Select a Date"
                  value={formatDateRange(value)}
                  readOnly
                  onClick={(e) => e.preventDefault()} 
                />
              </PopoverHandler>
              <PopoverContent className="right-3">
                <Datepicker
                  value={value}
                  onChange={handleChange}
                  primaryColor="blue"
                  toggleClassName="hidden" 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        </div>
            <MeetingTable users={user} meetings={meetings} searchItem={searchItem} date={value}/>
        </div>
    </div>
  );
};

export default Meetings;
