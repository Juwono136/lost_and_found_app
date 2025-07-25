import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Card, Typography ,Chip, CardHeader,CardBody,CardFooter, Button, Select, Option} from "@material-tailwind/react";
import { FaCaretSquareLeft, FaCaretSquareRight} from "react-icons/fa";

const MeetingTable= ({meetings})=>{
    const navigate =useNavigate()

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    const meetingHead=["ID","Item ID","User ID","Meeting Date","Meeting time","Meeting Location","Meeting Status"]
    const [active,setActive] = useState(1)
    const [meetingPerPage,setMeetingPerPage]=useState(10)
    const totalPages=Math.ceil(meetings.length/meetingPerPage)

    const meetingDisplayed=meetings.slice(
      (active - 1) * meetingPerPage,
      active * meetingPerPage
    );
    
    const next = () => {
      if(active<totalPages){
        setActive(active+1);
      }
    }

    const prev = () => {
      if (active>1){
        setActive(active-1);
      }
    }

    const deleteRow=(id)=>{

    }

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 700); 
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //retrieve items
      }, []);

      return(

                               
              <div>
                <Card className="h-[425px] flex flex-col">
                  <div className="overflow-auto flex-grow">
                    <table className="w-full table-fixed">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr>
                        {meetingHead.map((col) => (
                        <th
                            key={col}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                            >
                            {col}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {meetingDisplayed.map(
                        (
                        {
                            _id,
                            item_id,
                            user_id,
                            meeting_date,
                            meeting_time,
                            meeting_location,
                            meeting_status,
                        },
                        index
                        ) => {
                        return (
                            <tr key={_id} className=" cursor-pointer even:bg-gray-100">
                            <td className="p-2">
                                <Typography>{_id}</Typography>
                            </td>
                            <td className="p-2">
                                <Typography>{item_id}</Typography>
                            </td>
                            <td className="p-2">
                                <Typography>{user_id}</Typography>
                            </td>
                            <td className="p-2">
                                <Typography>{meeting_date}</Typography>
                            </td>
                            <td className="p-2">
                                <Typography>{meeting_time}</Typography>
                            </td>
                            <td className="p-2">
                                <Typography>{meeting_location}</Typography>
                            </td>
                            <td className="p-2">
                                <Chip 
                                size="sm"
                                value={meeting_status} 
                                className={
                                    meeting_status === "Store" ? "bg-blue-500 text-white" :
                                    meeting_status === "Approved" ? "bg-green-500 text-white" :
                                    "bg-red-500 text-white"
                                } />
                            </td>
                             {/* <td className="p-2 text-right">
                                  <div className="flex justify-end">
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        meeting_status === "Store" ? "bg-blue-500" :
                                        meeting_status === "Approved" ? "bg-green-500" :
                                        "bg-red-500"
                                      }`}
                                    />
                                  </div>
                                </td> */}
                            </tr>
                        );
                        }
                    )}
                    </tbody>
                </table>
                  </div>
        
                  <CardFooter className="mt-auto border-t px-4 py-2">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          variant="text"
                          disabled={active === 1}
                          onClick={prev}
                          className="w-10 h-10 p-0 flex items-center justify-center"
                        >
                          <FaCaretSquareLeft size={30} />
                        </Button>
                        <Typography color="gray" className="font-normal">
                          Page <strong className="text-gray-900">{active}</strong> of{" "}
                          <strong className="text-gray-900">{totalPages}</strong>
                        </Typography>
                        <Button
                          variant="text"
                          disabled={active === totalPages}
                          onClick={next}
                          className="w-10 h-10 p-0 flex items-center justify-center"
                        >
                          <FaCaretSquareRight size={30} />
                        </Button>
                      </div>
        
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Display Per Page:</span>
        
                          <Select
                            onChange={(value) => {
                              setMeetingPerPage(Number(value));
                              setActive(1);
                            }}
                            value={meetingPerPage.toString()}
                            menuProps={"w-[5px]"}
                          >
                            <Option value="10">10</Option>
                            <Option value="25">25</Option>
                            <Option value="50">50</Option>
                            <Option value="100">100</Option>
                          </Select>
                      </div>
        
                    </div>
                  </CardFooter>
                </Card>
              </div>
    )
}

export default MeetingTable;