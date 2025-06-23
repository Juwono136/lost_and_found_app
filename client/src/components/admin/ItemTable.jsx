import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom"

import {allItems, users, getDashboardRows} from "./RetrieveData.js"

import { Card, Typography ,Chip, CardHeader,CardBody,CardFooter, Button, Select, Option} from "@material-tailwind/react";
import { FaCaretSquareLeft, FaCaretSquareRight, FaCheck, FaStopwatch, FaHourglass, FaExclamationCircle, FaStopCircle} from "react-icons/fa";



const ItemTable= ({searchItem, category, status, date})=>{

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
    //renders page for items page
    <>{PageName.startsWith("/admin/items")?(
      isMobile?((<>
      <div className="h-[500px]"> 
        <Card className="h-[95%] flex flex-col">
          <div className="overflow-x-auto flex-grow">
            <table className="w-[600px] table-fixed">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  {itemHead.map((col) => (
                    <th
                      key={col}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 text-center"
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
                {itemDisplayed.map(
                  (
                    {
                      _id,
                      item_name,
                      item_short_desc,
                      item_category,
                      location_store,
                      date_reported,
                      item_status,
                    },
                    index
                  ) => {
                    return (
                      <tr key={_id} onClick={() => navigate(`/admin/items/edit?id=${_id}`)} className=" cursor-pointer even:bg-gray-100">
                        <td className="p-2 text-center">
                          <Typography>{_id}</Typography>
                        </td>
                        <td className="p-2 text-center">
                          <Typography>{item_name}</Typography>
                        </td>
                        <td className="p-2 text-center">
                          <Typography>{item_short_desc}</Typography>
                        </td>
                        <td className="p-2 text-center">
                          <Typography>{item_category}</Typography>
                        </td>
                        <td className="p-2 text-center">
                          <Typography>{location_store}</Typography>
                        </td>
                        <td className="p-2 text-center">
                          <Typography>{date_reported}</Typography>
                        </td>
                        <td className="p-2 text-right">
                          <div className="flex justify-end">
                            {getStatusIcon(item_status)}
                          </div>
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
                <Typography color="gray" className="font-normal">
                  <strong className="text-gray-900">{active}</strong> of{" "}
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

              <div className="w-[30%] flex justify-end">
                <Select
                className="text-xs"
                containerProps={{className:"min-w-0"}}
                menuProps={{className:"text-lg max-w-[90px]"}}
                  onChange={(value) => {
                    setItemPerPage(Number(value));
                    setActive(1);
                  }}
                  value={itemPerPage.toString()}
                >
                  <Option value="10" className="mb-2">10</Option>
                  <Option value="25" className="mb-2">25</Option>
                  <Option value="50" className="mb-2">50</Option>
                  <Option value="100">100</Option>
                </Select>
              </div>

            </div>
          </CardFooter>
        </Card>
      </div>

      </>)):(<>
      <div>
        <Card className="h-[425px] flex flex-col">
          <div className="overflow-auto flex-grow">
            <table className="w-full table-fixed">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="z-10">
                  {itemHead.map((col) => (
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
                {itemDisplayed.map(
                  (
                    {
                      _id,
                      item_name,
                      item_short_desc,
                      item_category,
                      location_store,
                      date_reported,
                      item_status,
                    },
                    index
                  ) => {
                    return (
                      <tr key={_id} onClick={() => navigate(`/admin/items/edit?id=${_id}`)} className=" cursor-pointer even:bg-gray-100">
                        <td className="p-2">
                          <Typography>{_id}</Typography>
                        </td>
                        <td className="p-2">
                          <Typography>{item_name}</Typography>
                        </td>
                        <td className="p-2">
                          <Typography>{item_short_desc}</Typography>
                        </td>
                        <td className="p-2">
                          <Typography>{item_category}</Typography>
                        </td>
                        <td className="p-2">
                          <Typography>{location_store}</Typography>
                        </td>
                        <td className="p-2">
                          <Typography>{date_reported}</Typography>
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
                      setItemPerPage(Number(value));
                      setActive(1);
                    }}
                    value={itemPerPage.toString()}
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

      </>)
      
    ):(
    //renders items for dashboard page
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
        </>
    )
}

export default ItemTable;