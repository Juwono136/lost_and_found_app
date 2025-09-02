import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import {Button, Dialog, DialogHeader, DialogBody,DialogFooter } from "@material-tailwind/react";


const Header = ({toggleSidebar, showSidebar}) => {
    const [PageName,setPageName]= useState("")
    const [showProfile, setShowProfile] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const path=useLocation().pathname

    const toggleOpen = (value) => setOpenDialog(!openDialog);

    //dummy data

    

    const [notifications, setNotifications] = useState([{
        _id:1,
        user_id:1,
        item_info:1,
        meeting_info:1,
        message:"message 1",
        is_read:false,
      },{
        _id:2,
        user_id:1,
        item_info:2,
        meeting_info:2,
        message:"message 2",
        is_read:false,
      }]);

    const recentNotifications = [...notifications]
        .sort((lastRecent, moreRecent) => moreRecent._id - lastRecent._id) 
        .slice(0, 5);

      const notificationAmount = notifications.length
    
    const navigate =useNavigate()

    //to show the path to show at the top
    useEffect(()=>{
        switch(path){
            case "/admin":
                setPageName("Dashboard")
                break
            case "/admin/notification":
                setPageName("Notification")
                break
            case "/admin/items":
                setPageName("Manage Lost Item")
                break
            case "/admin/meetings":
                setPageName("Meeting Requests")
                break
            case "/admin/profile":
                setPageName("Profile")
                break
            case "/admin/settings":
                setPageName("Setting")
                break
            case "/admin/items/add":
                setPageName("Add Item")
                break
        }
    },[path])

      //fetching data if needed
      useEffect(() => {
 
      }, []);


    const handleLogout = ()=>{

    }

    return (
    <>{showProfile && (
        <div
          className="fixed inset-0 z-30"
          onClick={()=>setShowProfile(!showProfile)}
        ></div>
      )||
      showNotification && (
        <div
          className="fixed inset-0 z-30"
          onClick={()=>setShowNotification(!showNotification)}
        ></div>
      )
      }
      
        <header className="bg-blue-800 h-[40px] flex items-center px-4 py-6">
            {!showSidebar && (
            <button onClick={toggleSidebar} >
                <FaBars />
            </button>
            )}
            <h6 className="text-white text-sm pl-[10px]">{PageName}</h6>
            <div className="flex items-center ml-auto gap-3">
                <button className="text-[10px] bg-white rounded-full h-[20px] px-2" onClick={()=>navigate("/admin")}>Home Page</button>
                <div
                    className={`absolute right-7 top-12 bg-white shadow-lg rounded-md transition-transform duration-300 ease-out z-40 p-3 w-[13rem] text-[12px] justify-between shadow-xl
                        ${showNotification ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                    `}
                    >
                    {notifications.length > 0 ? (
                        <div className="flex flex-col gap-2">
                        {recentNotifications.map((notif) => (
                            <div
                            key={notif._id}
                            className="border-b last:border-none pb-1 mb-1 last:pb-0 last:mb-0"
                            >
                            <p className="text-gray-700">{notif.message}</p>
                            </div>
                        ))}
                            <h1
                            onClick={() => {navigate("/admin/notification");setShowNotification(false)}}
                            className="text-xs text-blue-500 hover:underline self-end"
                            >
                            View all
                            </h1>
                        </div>
                    ) : (
                        <p>You have no Notifications</p>
                    )}
                    </div>
                <div className="relative cursor-pointer" onClick={() => {setShowNotification(!showNotification);setShowProfile(false)}}>
                    <FaBell size={20} className="text-white" />
                    {notificationAmount > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full border border-white"></span>
                    )}
                </div>
                <div
                className={`absolute right-2 top-12 bg-white shadow-lg rounded-md p-2 transition-transform duration-300 ease-out z-40 gap-2 w-[12rem] shadow-xl
                    ${showProfile ? "" : "scale-0 opacity-0"}
                `}>
                    <div className="gap-1">
                        <p onClick={()=>{navigate("/admin/profile");setShowProfile(false)}} className="inline-flex gap-3 hover:bg-gray-200 p-2 w-full text-sm"><FaRegUserCircle size={15} />Profile settings</p>
                        <p onClick={()=>setOpenDialog(true)} className="inline-flex gap-3 text-red-600 font-bold hover:bg-gray-200 p-2 w-full text-sm"> <FaPowerOff size={15} />Logout</p>
                    </div>
                </div>
                <img className="w-[30px] h-[30px] rounded-full " onClick={()=>{setShowProfile(!showProfile);setShowNotification(false)}}/>
            </div>
        </header>
        <Dialog open={openDialog} handler={toggleOpen} size="sm" className="absolute w-[200px]">
            <DialogHeader>Are you sure you want to log out?</DialogHeader>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={toggleOpen}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="text" color="green" onClick={handleLogout}>
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
    </>
    );
};

export default Header;
