import { useEffect, useState } from "react";
import {Progress } from "@material-tailwind/react"; 
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

    const [status, setStatus] = useState("AddItem");
    const [progress,setProgress]=useState(10)

    useEffect(() => {
        switch(status){
            case "AddFounder":
                setProgress(50)
                return
            case "SubmitItem":
                setProgress(100)
                return
            default:
                setProgress(10)
                return
        }
    }, [status]);
    
    const renderContent = () => {
        switch (status) {
        case "AddFounder":
            return <AddFounderInfo binusian={binusian} setBinusian={setBinusian} setStatus={setStatus} />
        case "SubmitItem":
            return <SubmitLostItem binusian={binusian} setBinusian={setBinusian} item={item} setStatus={setStatus} />
        default:
            return <AddItemInfo item={item} setItem={setItem} setStatus={setStatus} />
        }
    };

    return (
    <div className="h-[90%] overflow:auto">
        <p className="w-full inline-block text-sm md:text-xl flex items-center justify-between">
            <span className={`font-bold ${status==="AddFounder"|| status=="SubmitItem"? "text-green-500":"text-blue-600"}`} >
                <h1>
                    Add Lost Item Info
                </h1>
            </span> 
            <span className={`${status==="AddFounder"? "font-bold text-blue-600":""} ${status=="SubmitItem"? "font-bold text-green-500":""}`}> 
                <h1>
                    Add Founder Info
                </h1>
            </span> 
            <span className={status=="SubmitItem"? "font-bold text-blue-600":""}>
                <h1>
                    Submit Lost Item
                </h1>
            </span>
        </p>
        <Progress value={progress} className="mb-3" color="blue"></Progress>
        {/* <hr className="border border-gray-400 mb-3"/> */}
        {renderContent()}
        </div>
    )
    
};

export default AddItem;
