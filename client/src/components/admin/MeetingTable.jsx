import { useEffect, useState } from "react";
import { Card, Typography ,Chip, CardFooter, Button, Select, Option} from "@material-tailwind/react";
import { FaCaretSquareLeft, FaCaretSquareRight} from "react-icons/fa";

const MeetingTable= ({meetings, searchItem, date, users})=>{
    const meetingHead=["Meeting Number","Meeting ID","Username","Meeting Date","Meeting time","Meeting Location","Meeting Status"]
    const [active,setActive] = useState(1)
    const [meetingPerPage,setMeetingPerPage]=useState(10)
    const totalPages=Math.ceil(meetings.length/meetingPerPage)

    //meeting list with username
    const newMeetingList = meetings.map((meeting) => {
      const user = users.find((u) => u._id === meeting.user_id); 
      return {
        ...meeting,
        username: user ? user.username : "Unknown User", 
      };
    });

    //filter data
    const filteredMeetings = newMeetingList.filter((meeting) => {
      const matchesSearch = searchItem
        ? Object.values(meeting).some((val) =>
            String(val).toLowerCase().includes(searchItem.toLowerCase())
          )
        : true;

      const matchesDate = (() => {
        if (!date?.startDate && !date?.endDate) return true;

        const meetingDate = parseDate(meeting.meeting_date);

        const startDate = date?.startDate ? new Date(date.startDate) : null;
        const endDate = date?.endDate ? new Date(date.endDate) : null;

        if (startDate && endDate) {
          return meetingDate >= startDate && meetingDate <= endDate;
        } else if (startDate) {
          return meetingDate >= startDate;
        } else if (endDate) {
          return meetingDate <= endDate;
        }
        return true;
      })();

      return matchesSearch && matchesDate ;
    });
    
    const meetingDisplayed=filteredMeetings.slice(
      (active - 1) * meetingPerPage,
      active * meetingPerPage
    );

    //pagination
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

    const parseDate = (str) => {
      const [day, month, year] = str.split("/");
      return new Date(`${year}-${month}-${day}`);
    };
    //fetch data
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
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-full"
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
                    meeting_id,
                    username,
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
                        <Typography>{meeting_id}</Typography>
                    </td>
                    <td className="p-2">
                        <Typography>{username}</Typography>
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
                        className={`text-center rounded-2xl border-2 ${
                            meeting_status === "Pending" ? "bg-blue-500 text-white border-blue-600" :
                            meeting_status === "Completed" ? "bg-green-500 text-white border-green-600" :
                            "bg-red-500 text-white border-red-800"
                        }`} />
                    </td>
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
                <Typography color="gray" className="font-normal md:text-xl text-sm">
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
                  <Select
                    onChange={(value) => {
                      setMeetingPerPage(Number(value));
                      setActive(1);
                    }}
                    value={meetingPerPage.toString()}
                    label="Display Per Page:"
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