import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import MeetingTable from "../../components/admin/MeetingTable";
import { FaPlus, FaSearch} from "react-icons/fa";
import { Button, Input, Select,Option, Popover,PopoverHandler,PopoverContent } from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";

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
          <div className="flex flex-row justify-between items-center">
          List of Meetings
          {/* <Button className="flex items-center gap-1 bg-fuchsia text-white p-1 text-xs border border-black rounded" onClick={()=>navigate("/admin/items/add")}>
            <FaPlus/>Add item
          </Button>
        </div>
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
          <div className="flex gap-5 md:w-auto w-full">
            <div className="flex items-center gap-2 flex-1 relative ">
              <Select 
                className="w-full pl-10"
                label="Filter By Category" 
                value={category} 
                onChange={(val) => setCategory(val || "")}
                inputProps={{ className: "p-5" }}
                >
                  <Option value="">all</Option>
                  <Option value="electronics">electronics</Option>
                  <Option value="daily appliance">daily appliance</Option>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 relative ">
              <Select 
                className="w-full pl-10"
                label="Filter By Status" 
                value={status} 
                onChange={(val) => setStatus(val || "")}
                inputProps={{ className: "p-5" }}
                >
                  <Option value="">all</Option>
                  <Option value="Claimed">Claimed</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="On Hold">On Hold</Option>
                  <Option value="Cancel">Cancel</Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-1 relative">
            <Popover open={openPopover} handler={setOpenPopover}>
              <PopoverHandler>
                <Input
                  label="Select a Date"
                  value={formatDateRange(value)}
                  readOnly
                  onClick={(e) => e.preventDefault()} // prevent manual input
                />
              </PopoverHandler>
              <PopoverContent className="right-3">
                <Datepicker
                  value={value}
                  onChange={handleChange}
                  primaryColor="blue"
                  toggleClassName="hidden" // optional: hides default toggle button if any
                />
              </PopoverContent>
            </Popover>
          </div>
         */}
        </div>
            <MeetingTable meetings={meetings}/>
        </div>
    </div>
  );
};

export default Meetings;
