import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom"

import {allItems, users, getDashboardRows} from "./RetrieveData.js"

import { Card, Typography ,Chip, CardHeader,CardBody,CardFooter, Button, Select, Option} from "@material-tailwind/react";
import { FaCaretSquareLeft, FaCaretSquareRight, FaCheck, FaStopwatch, FaHourglass, FaExclamationCircle, FaStopCircle} from "react-icons/fa";



const ItemTableDashboard= ({searchItem, category, status, date})=>{

    const [items, setItems] = useState([{
        _id:1,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"21/03/2025",
        item_status:"Claimed",
        createdAt:"",
        updatedAt:"",
      },{
        _id:2,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"Cancel",
        createdAt:"",
        updatedAt:"",
      },{
        _id:3,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"",
        item_status:"On Hold",
        createdAt:"",
        updatedAt:"",
      },{
        _id:4,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"Pending",
        createdAt:"",
        updatedAt:"",
      },{
        _id:5,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"",
        item_status:"Active",
        createdAt:"",
        updatedAt:"",
      },{
        _id:6,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"On Hold",
        createdAt:"",
        updatedAt:"",
      },{_id:7,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"21/03/2025",
        item_status:"Claimed",
        createdAt:"",
        updatedAt:"",
      },{
        _id:8,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"On Hold",
        createdAt:"",
        updatedAt:"",
      },{
        _id:9,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"",
        item_status:"Claimed",
        createdAt:"",
        updatedAt:"",
      },{
        _id:10,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"On Hold",
        createdAt:"",
        updatedAt:"",
      },{
        _id:11,
        user_info:"1",
        staff_id:"1",
        item_name:"Phone",
        item_img:"-",
        item_detail_desc:"smartphone blue casing",
        item_short_desc:"i phone",
        item_category:"electronics",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"20/03/2025",
        date_claimed:"",
        item_status:"Claimed",
        createdAt:"",
        updatedAt:"",
      },{
        _id:12,
        user_info:"2",
        staff_id:"1",
        item_name:"water bottle",
        item_img:"",
        item_detail_desc:"named",
        item_short_desc:"blue",
        item_category:"daily appliance",
        location_found:"fx",
        location_store:"fx",
        draft:"",
        date_reported:"10/02/2025",
        date_claimed:"",
        item_status:"Cancel",
        createdAt:"",
        updatedAt:"",
      },]);
    
    const [active,setActive] = useState(1)
    const navigate =useNavigate()
    const PageName= useLocation().pathname
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    //for items page
    const itemHead=["ID","Item Name","Short Description","Category","Stored Location","Date Reported","Status"]
    const [itemPerPage,setItemPerPage]=useState(10)

    const parseDate = (str) => {
      const [day, month, year] = str.split("/");
      return new Date(`${year}-${month}-${day}`);
    };

    const filteredItems = items.filter((item) => {
       const matchesSearch = searchItem
        ? item.item_name.toLowerCase().includes(searchItem.toLowerCase())
        : true;

      const matchesCategory = category
        ? item.item_category.toLowerCase().includes(category.toLowerCase())
        : true;

      const matchesStatus = status
        ? item.item_status.toLowerCase().includes(status.toLowerCase())
        : true;

      const matchesDate = (() => {
        if (!date?.startDate && !date?.endDate) return true;

        const itemDate = parseDate(item.date_reported);

        const startDate = date?.startDate ? new Date(date.startDate) : null;
        const endDate = date?.endDate ? new Date(date.endDate) : null;

        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      })();

      return matchesSearch && matchesCategory && matchesDate && matchesStatus;
    });

    const totalPages = Math.ceil(filteredItems.length / itemPerPage);
    const itemDisplayed = filteredItems.slice(
      (active - 1) * itemPerPage,
      active * itemPerPage
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


    const dashboardHead=["No.","Name","Founder","Location","Store","Status","Reported","Staff"]
    const dashboardRows = getDashboardRows(allItems,users);

    const deleteRow = () => {}

    useEffect(() => {
          const handleResize = () => {
            setIsMobile(window.innerWidth < 700); 
          };
        
          window.addEventListener('resize', handleResize);
        
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);

    const getStatusIcon = (status) => {
      switch (status) {
        case "Active":
          return <FaExclamationCircle className="text-green-600" />;
        case "Claimed":
          return <FaCheck className="text-blue-600" />;
        case "Pending":
          return <FaStopwatch className="text-pink-400" />;
        case "On Hold":
          return <FaHourglass className="text-yellow-800" />;
        default:
          return <FaStopCircle className="text-red-600" />;
      }
    };

    return(
        <div className="overflow-x-auto overflow-y-hidden h-[265px] bg-black text-white text-xs" onClick={()=>navigate("/admin/items")}>
          <Card>
            <table>
              <thead>
                <tr>
                  {dashboardHead.map((col)=>(
                      <th
                      key={col}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
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
                {dashboardRows.map(({
                  item_id,
                  item_name,
                  student_name,
                  location_found,
                  location_store,
                  item_status,
                  date_reported,
                  staff_name})=>{
                  return(
                    <>
                  <tr className="even:bg-gray-100">
                    <td className="p-2">
                      <Typography>{item_id}</Typography>
                    </td>
                    <td className="p-2">
                      <Typography>{item_name}</Typography>
                    </td>
                    <td className="p-2">
                      <Typography>{student_name}</Typography>
                    </td>
                    <td className="p-2">
                      <Typography>{location_found}</Typography>
                    </td>
                    <td className="p-2">
                      <Typography>{location_store}</Typography>
                    </td>
                    <td className="p-2">
                      <Chip 
                        size="sm"
                        value={item_status} 
                        className={`text-center rounded-2xl border-2 ${
                                item_status === "Active" ? "bg-green-300 text-white border-green-600" :
                                item_status === "Claimed" ? "bg-blue-300 text-white border-blue-600" :
                                item_status === "Pending" ? "bg-pink-200 text-white border-pink-600" :
                                item_status === "On Hold" ? "bg-yellow-300 text-black border-yellow-800" :
                                "bg-red-400 text-white border-red-800"
                              }`} />
                    </td>
                    <td className="p-2">
                      <Typography>{date_reported}</Typography>
                    </td>
                    <td className="p-2">
                      <Typography>{staff_name}</Typography>
                    </td>
              </tr>
              </>
              )

            })}
          </tbody>
        </table>
      </Card>
    </div>
    )
}

export default ItemTableDashboard;