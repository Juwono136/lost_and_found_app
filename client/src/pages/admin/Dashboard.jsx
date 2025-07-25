import React, { useEffect, useState } from "react";
import {FaBriefcase, FaCheckCircle, FaClock} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import GraphOfItems from "../../components/admin/GraphOfItems";
import { Chip } from "@material-tailwind/react";
import GraphOfMeetings from "../../components/admin/GraphOfMeetings";
import ItemTableDashboard from "../../components/admin/ItemTableDashboard";

const Dashboard = () => {
  const [data, setData] = useState({
    totalItems: 1273,
    claimsProcessed: 393,
    totalMeetings: 172,
    unapprovedItems: 1920,
    rescheduledMeeting:1772,
    rejectedItem:200,

  });
  
  const [username, setUsername]=useState("Placeholder")
  const [role,setRole]=useState("staff")

  const navigate =useNavigate()

  useEffect(() => {
  }, []);

  useEffect(() => {
     
    }, []);

  return (
      <>
    <div className=" w-full overflow-x-hidden overflow-y-auto flex flex-col gap-1">
        <div className="flex flex-inline">Welcome<h1 className="font-bold">, {username}</h1> </div>
        <Chip 
          size="sm"
          value={role} 
          className={"bg-blue-300 text-blue-800 border-2 border-solid border-blue-800 rounded-xl w-fit mb-[10px]"} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col w-full gap-5">
              <div className="flex md:flex-row flex-col justify-between gap-5">
                <div className="border border-solid border-gray-400 shadow shadow-xl rounded p-3 md:w-1/3 w-full">
                  <p className="flex font-bold items-left gap-1  text-[12px] lg:text-[18px]">
                  <FaBriefcase size={20} color=""/> Total Lost Item</p>
                  <h1 className={` font-bold text-[18px] lg:text-[25px]`}>{data.totalItems}</h1>
                  <p className="text-sm text-gray-700">+5 past week</p>
                </div>
                <div className="border border-solid border-gray-400 shadow shadow-xl rounded p-3 md:w-1/3 w-full">
                  <p className="flex font-bold items-left gap-1 text-[12px] lg:text-[18px]">
                  <FaCheckCircle size={20} color=""/> Total Claimed Items</p>
                  <h1 className={` font-bold text-[18px] lg:text-[25px]`} >{data.claimsProcessed}</h1>
                  <p className="text-sm text-gray-700">+5 past week</p>
                </div>
                <div className="border border-solid border-gray-400 shadow shadow-xl rounded p-3 md:w-1/3 w-full">
                  <p className="flex font-bold items-left gap-1 text-[12px] lg:text-[18px]">
                  <FaClock size={20} color=""/> Pending Items</p>
                  <h1 className={` font-bold text-[18px] lg:text-[25px]`} >{data.totalMeetings}</h1>
                  <p className="text-sm text-gray-700">+5 past week</p>
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-7">
                <div className="md:w-3/5 w-full">
                  <GraphOfItems/>
                </div>
                <div className="md:w-2/5 w-full">
                  <GraphOfMeetings/>
                </div>
              </div>
            </div>
          </div>
          <ItemTableDashboard/>
        </div>
    </div>
    
    </>
  );
};

export default Dashboard;
