import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import {Button, Dialog, DialogHeader, DialogBody,DialogFooter } from "@material-tailwind/react";


const Header = ({toggleSidebar, showSidebar}) => {
    const [PageName,setPageName]= useState("")
    const [showSidebarIcon, setShowSidebarIcon] = useState(window.innerWidth > 1086);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const path=useLocation().pathname

    const toggleOpen = (value) => setOpenDialog(!openDialog);

    //dummy data
    const users={
        _id:"1",
        name:"kevin",
        email:"mail@mail.com",
        role:"student"
    }

    const notificationAmount = 0

    
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
        }

    },[path])

    // used to toggle the sidebar
    useEffect(() => {
        const handleResize = () => {
          setShowSidebarIcon(window.innerWidth > 1086);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

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
      )}
        <header className="bg-blue-800 h-[40px] flex items-center px-4 py-5">
            {!showSidebar && (
            <button onClick={toggleSidebar} >
                <FaBars />
            </button>
            )}
            <h6 className="text-white text-sm pl-[10px]">{PageName}</h6>
            <div className="flex items-center ml-auto gap-3">
                <button className="text-[10px] bg-white rounded-full h-[20px] px-2" onClick={()=>navigate("/admin")}>Home Page</button>
                <div
                    className={`absolute right-7 top-10 bg-white shadow-lg rounded-md p-2 transition-transform duration-300 ease-out z-40 p-3 w-[13rem] text-[12px] justify-between shadow-xl
                        ${showNotification ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                    `}>
                    {notificationAmount>0?(<>
                    </>):
                        <p>You have no Notifications</p>
                    }
                </div>
                <div className="relative cursor-pointer" onClick={() => {setShowNotification(!showNotification);setShowProfile(false)}}>
                    <FaBell size={20} className="text-white" />
                    {notificationAmount > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full border border-white"></span>
                    )}
                </div>
                <div
                className={`absolute right-2 top-10 bg-white shadow-lg rounded-md p-2 transition-transform duration-300 ease-out z-40 gap-2 w-[15rem] shadow-xl
                    ${showProfile ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                `}>
                    <div className="space-y-3">
                        <p onClick={()=>{navigate("/admin/profile");setShowProfile(false)}} className="inline-flex gap-3 hover:bg-gray-200 p-3 w-full"><FaRegUserCircle size={20} />Profile settings</p>
                        <p onClick={()=>setOpenDialog(true)} className="inline-flex gap-3 text-red-600 font-bold hover:bg-gray-200 p-3 w-full"> <FaPowerOff size={20} />Logout</p>
                    
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
