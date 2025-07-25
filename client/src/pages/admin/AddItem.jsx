import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Datepicker  from "react-tailwindcss-datepicker"; 
import dayjs  from "dayjs";
import { Select, Option, Popover, PopoverHandler, PopoverContent, Input, Button, Textarea, Dialog,DialogHeader,DialogFooter, DialogBody} from "@material-tailwind/react"; 
import Item from "./Item";
import { AddItemInfo } from "../../components/admin/AddItemInfo";
import { AddFounderInfo } from "../../components/admin/AddFounderInfo";
import { SubmitLostItem } from "../../components/admin/SubmitLostItem";

const AddItem = () => {
    const [item, setItem] = useState({
        _id:0,
        user_info:"",
        staff_id:"",
        Item_name:"",
        Item_img:"",
        Item_detail_desc:"",
        Item_short_desc:"",
        Item_category:"",
        location_found:"",
        location_store:"",
        draft:"",
        date_reported:"",
        date_claimed:"",
        Item_status:"",
        createdAt:"",
        updatedAt:"",
    });

    const [binusian, setBinusian] = useState({
        binusian_id:"",
        name:"",
        email:"",
        phone:"",
        address:"fx",
    });

    const navigate =useNavigate()
    const [status, setStatus] = useState("AddItem");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
    }, []);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 700); 
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const renderContent = () => {
        switch (status) {
        case "AddFounder":
            return <AddFounderInfo binusian={binusian} setBinusian={setBinusian} setStatus={setStatus}/>
        case "SubmitItem":
            return <SubmitLostItem binusian={binusian} setBinusian={setBinusian} item={item} setStatus={setStatus} />
        default:
            return <AddItemInfo item={item} setItem={setItem} setStatus={setStatus} />
        }
    };

    return (
    <div className="h-[90%] overflow:auto">
        <p className="text-2xl">Add New Item</p>
        <p className="w-full inline-block text-sm md:text-xl flex items-center"><span className={`font-bold ${status==="AddFounder"|| status=="SubmitItem"? "text-green-500":"text-blue-600"}`} >Add Lost Item Info</span> <span className={`${status==="AddFounder"? "font-bold text-blue-600":""} ${status=="SubmitItem"? "font-bold text-green-500":""}`}> Add Founder Info</span> <span className={status=="SubmitItem"? "font-bold text-blue-600":""}> -------- Submit Lost Item</span></p>
        <hr className="border border-gray-400 mb-3"/>
        {renderContent()}
        </div>
    )
    
};

export default AddItem;
