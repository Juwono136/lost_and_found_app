import React, { useEffect, useState } from "react";
import {FaBriefcase, FaCheckCircle, FaClock} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import ItemTable from "../../components/admin/ItemTable";
import GraphOfItems from "../../components/admin/GraphOfItems";
import { Chip } from "@material-tailwind/react";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [mediumWidth, setMediumWidth]=useState(window.innerWidth<923)

  const navigate =useNavigate()

  useEffect(() => {
  }, []);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 700); 
        setMediumWidth(window.innerWidth<923);
      };
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <>{isMobile ? (
      // mobile view
      <div className="w-full px-4">
        <div className="">
          Welcome, {username}
        </div>
        <hr className="border border-black"/>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 pt-4 pb-8">
            <p className="text-2xl ">Items Information</p>
            <GraphOfItems/>
            <div className="flex-1 bg-blue-300 border border-black rounded-xl p-4">
              <p className="flex items-center gap-1 text-white text-xs font-bold">
                <FaBriefcase color="white"/>
                Total Lost Item
              </p>
              <h1 className="text-sm text-white font-bold">{data.totalItems}</h1>
            </div>
            <div className="flex-1 bg-indigo-400 border border-black rounded-xl p-4">
              <p className="flex items-center gap-1 text-white text-xs font-bold">
                <FaCheckCircle color="white"/>
                Total Claimed Items
              </p>
              <h1 className="text-sm text-white font-bold">{data.claimsProcessed}</h1>
            </div>
            <div className="flex-1 bg-hot-pink border border-black rounded-xl p-4">
              <p className="flex items-center gap-1 text-white text-xs font-bold">
                <FaClock color="white"/>
                Pending Items
              </p>
              <h1 className="text-sm text-white font-bold">{data.totalMeetings}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 pb-8">
            <p className="text-2xl ">Meeting Information</p>
            <div className="flex flex-row w-full justify-between">
              <div className="w-[48%] gap-4">
                <div className="bg-fuchsia border border-solid border-black rounded-xl p-[5px] w-full mb-[10px]">
                  <p
                    className="flex justify-center text-white text-xs font-bold text-[15px] p-1"
                    onClick={() => navigate("/admin/meetings")}
                  >
                    Request meeting
                  </p>
                </div>
                <div className="bg-orange-500 border border-solid border-black rounded-xl p-[20px] w-full text-center ">
                  <p className="flex items-start gap-1 text-white text-xs font-bold">
                    Reschedule
                  </p>
                  <h1 className="text-sm text-white font-bold">{data.rescheduledMeeting}</h1>
                </div>
              </div>
              <div className="bg-blue-700 border border-solid border-black rounded-xl p-[20px] w-[48%] text-center">
                <p className="flex gap-1 text-white text-xs font-bold">Need Approval</p>
                <h1 className="text-sm text-white font-bold">{data.totalMeetings}</h1>
                <p className="flex gap-1 text-white text-xs font-bold">Rejected</p>
                <h1 className="text-sm text-white font-bold">{data.rejectedItem}</h1>
              </div>
            </div>
            
          </div>
          </div>
          
        <div className="flex flex-row pt-[20px] gap-4">


          
        </div>
      {/* Graph or extra content goes here */}

      {/* <ItemTable/> */}
    </div>
    
    ):(// computer view
      <>
    <div className=" w-full overflow-x-hidden overflow-y-auto flex flex-col gap-1">
      <div className="flex flex-inline">Welcome<h1 className="font-bold">, {username}</h1> </div>
      <Chip 
        size="sm"
        value={role} 
        className={"bg-blue-300 text-blue-800 border-2 border-solid border-blue-800 rounded-xl w-fit mb-[10px]"} />

      <div className="h-[375px] flex flex-row">
        {/* Top 3 components on the left side */}
        <div  className="flex flex-col h-full w-[110%] top-[0] justify-between">
          <div className="flex items-center justify-between w-full">
            <div className=" bg-blue-300 border-2 border-solid border-black rounded-xl p-3 pr-5 pl-5 ">
              <p className={`flex items-left gap-1 text-white font-bold ${mediumWidth?"text-[12px]":"text-[18px]"}`}>
              <FaBriefcase size={25} color="white"/> Total Lost Item</p>
              <h1 className={`text-white font-bold ${mediumWidth?"text-[18px]":"text-[25px]"}`}>{data.totalItems}</h1>
            </div>
            <div className=" bg-indigo-400 border-2 border-solid border-black rounded-xl p-3 pr-5 pl-5 ">
              <p className={`flex items-left gap-1 text-white font-bold ${mediumWidth?"text-[12px]":"text-[18px]"}`}>
              <FaCheckCircle size={25} color="white"/> Total Claimed Items</p>
              <h1 className={`text-white font-bold ${mediumWidth?"text-[18px]":"text-[25px]"}`} >{data.claimsProcessed}</h1>
            </div>
            {/* hot pink defined in tailwind.config.js */}
            <div className=" bg-hot-pink border-2 border-solid border-black rounded-xl p-3 pr-5 pl-5 ">
              <p className={`flex items-left gap-1 text-white font-bold ${mediumWidth?"text-[12px]":"text-[18px]"}`}>
              <FaClock size={25} color="white"/> Pending Items</p>
              <h1 className={`text-white font-bold ${mediumWidth?"text-[18px]":"text-[25px]"}`} >{data.totalMeetings}</h1>
            </div>
          </div>
              {/* Graph of statistics */}
          <div className="flex-grow pt-3">
            <GraphOfItems />
          </div>
        </div>

        <div className="flex flex-col h-[393px] w-[40%] items-center mr-[-5%] justify-between">
          {/* The right components */}
          <div className=" bg-fuchsia border-2 border-solid border-black rounded-xl p-[5px] w-[60%]" onClick={()=>navigate("/admin/meetings")}>
            <p className={`flex justify-center text-white font-bold ${mediumWidth ? "text-[13px]" : "text-[15px]"}`} > 
              Request meeting</p>
          </div>
          <div className=" bg-orange-500 border-2 border-solid border-black rounded-xl p-[15px] w-[60%] text-center" 
              onClick={() => navigate("/admin/meetings")}>
              <p className={`flex items-left gap-1 text-white font-bold ${mediumWidth ? "text-[13px]" : "text-[15px] p-2"}`}>
                Reschedule</p>
              <h1 className={`text-white font-bold ${mediumWidth?"text-[20px]": "text-[30px]"}`} >{data.rescheduledMeeting}</h1>
            </div>
          <div className=" bg-blue-700 border-2 border-solid border-black rounded-xl p-[15px] w-[60%] text-center" onClick={()=>navigate("/admin/meetings")}>
            <p className={`flex gap-1 justify-center text-white text-[13px] font-bold text-center ${mediumWidth ? "text-[13px]" : "text-[15px] pt-2"}`}> 
              Need Approval</p>
            <h1 className={`text-white font-bold ${mediumWidth?"text-[20px]": "text-[30px]"}`} >{data.totalMeetings}</h1>
            <p className={`flex gap-1 justify-center text-white text-[13px] font-bold text-center ${mediumWidth ? "text-[13px]" : "text-[15px] pt-2"}`}> 
              Rejected</p>
            <h1 className={`text-white font-bold ${mediumWidth?"text-[20px]": "text-[30px]"}`} >{data.rejectedItem}</h1>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ItemTable />
      </div>
    </div>
    
    </>)}
    </>
  );
};

export default Dashboard;
