import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom"
import { AiOutlineRollback } from "react-icons/ai";
import {Button, Dialog, DialogHeader, DialogBody,DialogFooter } from "@material-tailwind/react";

const Sidebar =({isOpen, toggleSidebar, showSidebar})=>{

    const[name,setName]=useState("Unidentified User")
    const[role,setRole]=useState("No Role")
    const PageName= useLocation().pathname
    const [openDialog, setOpenDialog] = useState(false);

    const toggleOpen = (value) => setOpenDialog(!openDialog);

    const navigate =useNavigate()

    const handleLogout = ()=>{

    }

    return (<>{showSidebar?(
    <aside className="bg-indigo-900 flex flex-col h-screen w-60 pl-5 pr-5 flex-shrink-0">
        {/* Lost and found header */}
        <p className="text-white font-mono text-[20px] pb-10 pt-5"><img href="#"/>Lost & Found</p>

        <hr className="border-solid ml-[10px]"/>
        {/* Page Menus */}
        <ul className="mt-[4px] space-y-2">
            <li className={`block ${PageName==="/admin" ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "}`} onClick={()=>{navigate("/admin")}}> 
                Dashboard</li>
            <li className={`block ${PageName.startsWith("/admin/notification") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "}`} onClick={()=>{navigate("/admin/notification")}}> 
                Notification</li>
            <li className={`block ${PageName.startsWith("/admin/items") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "}`} onClick={()=>{navigate("/admin/items")}}> 
                Manage Lost Item</li>
            <li className={`block ${PageName.startsWith("/admin/meetings") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "}`} onClick={()=>{navigate("/admin/meetings")}}> 
                Meeting Request</li>
            <li className={`block ${PageName.startsWith("/admin/profile") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "}`} onClick={()=>{navigate("/admin/profile")}}> 
                Profile</li>
            <li onClick={()=>setOpenDialog(true)} className="text-red-600 font-mono text-[15px] p-1 rounded">
                Logout
            </li>
        </ul>

        {/* User Information */}
        <div className="bg-white h-10 mt-auto mb-[10px] flex items-center rounded p-5 h-[50px]">
            <img className="w-[30px] h-[30px] ml-[5px]"/>
            <div className="flex flex-col ml-auto pr-[5px] items-center">
                <h6 className="text-[10px] bg-blue-200 pl-[7px] pr-[7px] rounded-full text-blue-950 font-bold border border-solid border-blue-900 inline whitespace-nowrap">{role}</h6>
                <h6 className="p-[5px] text-[12px]">{name}</h6>
            </div>
        </div>
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
    </aside>
    ):(<>
        {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={toggleSidebar}
            ></div>
          )}
    <div className={`bg-indigo-900 flex flex-col h-screen w-60 pl-5 pr-5 flex-shrink-0 fixed top-0 left-0 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Lost and found header */}
        <div className="text-white font-mono text-[20px] pb-10 pt-5 flex items-center justify-between">
            <p className="m-0">Lost & Found</p>
            <AiOutlineRollback onClick={toggleSidebar} className="cursor-pointer" />
        </div>
        <hr className="border-solid ml-[10px]"/>
        {/* Page Menus */}
        <ul className="mt-[4px] space-y-2">
            <li className={PageName==="/admin" ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "} onClick={()=>{navigate("/admin"),toggleSidebar()}}> 
                Dashboard</li>
            <li className={PageName.startsWith("/admin/notification") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "} onClick={()=>{navigate("/admin/notification"),toggleSidebar()}}> 
                Notification</li>
            <li className={PageName.startsWith("/admin/items") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "} onClick={()=>{navigate("/admin/items"),toggleSidebar()}}> 
                Manage Lost Item</li>
            <li className={PageName.startsWith("/admin/meetings") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "} onClick={()=>{navigate("/admin/meetings"),toggleSidebar()}}> 
                Meeting Request</li>
            <li className={PageName.startsWith("/admin/profile") ? "text-white font-mono text-[15px] p-1 rounded bg-blue-600": "text-white font-mono text-[15px] p-1 rounded "} onClick={()=>{navigate("/admin/profile"),toggleSidebar()}}> 
                Profile</li>
            <li onClick={()=>setOpenDialog(true)} className="text-red-600 font-mono text-[15px] p-1 rounded">
                Logout
            </li>
        </ul>

        {/* User Information */}
        <div className="bg-white h-10 mt-auto mb-[10px] flex items-center rounded p-3">
            <img className="w-[30px] h-[30px] ml-[5px]"/>
            <h6 className="p-[5px] text-[12px]">{name}</h6>
            <div className="flex flex-col ml-auto pr-[5px] items-center">
                <h6 className="text-[10px] bg-blue-200 pl-[7px] pr-[7px] rounded-full text-blue-950 font-bold border border-solid border-blue-900 inline whitespace-nowrap">{role}</h6>
                <button className="text-xs">logout</button>
            </div>
        </div>
    </div>
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
    )}
    
    </>   
    )
}

export default Sidebar;