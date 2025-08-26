import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom"

import {allItems, users, getDashboardRows} from "./RetrieveData.js"

import { Card, Typography ,Chip, CardFooter, Button, Select, Option} from "@material-tailwind/react";
import { FaCaretSquareLeft, FaCaretSquareRight, FaCheck, FaStopwatch, FaHourglass, FaExclamationCircle, FaStopCircle} from "react-icons/fa";



const ItemTable= ({searchItem, category, status, date, allFields, visibleFields, setVisibleFields})=>{
  
    const [items, setItems] = useState([])
    const [users , setUsers] =useState([])
    
    const [active,setActive] = useState(1)
    const navigate =useNavigate()

    let itemHead=["ID","Item Name","Short Description","Category","Stored Location","Date Reported","Status"]
    const [itemPerPage,setItemPerPage]=useState(10)

    const parseDate = (str) => {
      const [day, month, year] = str.split("/");
      return new Date(`${year}-${month}-${day}`);
    };
    
    useEffect(() => {
      const itemsData = allItems;
      const usersData = users; 
      
      const mergedData = itemsData.map(item => {
        const user = usersData.find(u => u._id === item.user_info); 
        return {
          ...item,
          user_name: user?.name || "Unknown",
          user_phone: user?.phone || "N/A",
          user_email: user?.email || "N/A"
        };
      });

      setItems(mergedData);
    }, []);

    const filteredItems = items.filter((item) => {
       const matchesSearch = searchItem
        ? Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchItem.toLowerCase())
          )
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


    const deleteRow = () => {}

    

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
        <>
      <div>
        <Card className="h-[425px] flex flex-col">
          <div className="overflow-auto flex-grow">
            <table className="w-full table-fixed">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="z-10">
                  {allFields.map((col) =>
                    visibleFields.includes(col) && (
                      <th
                        key={col}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 md:w-full w-[110px]"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {col}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {itemDisplayed.map(
                  (
                    {
                      _id,
                      item_name,
                      item_category,
                      location_store,
                      date_reported,
                      item_status,
                      user_name,
                      user_phone,
                    },
                    index
                  ) => {
                    return (
                      <tr key={_id} onClick={() => navigate(`/admin/items/edit?id=${_id}`)} className=" cursor-pointer even:bg-gray-100">
                        <td className="p-2" hidden={!visibleFields.includes("_id")}>
                          <Typography>{_id}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("item_name")}>
                          <Typography>{item_name}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("item_category")}>
                          <Typography>{item_category}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("location_store")}>
                          <Typography>{location_store}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("date_reported")}>
                          <Typography>{date_reported}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("item_status")}>
                          
                          <div className=" md:block hidden">
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
                          </div>
                          
                          <div className="flex justify-end md:hidden">
                            {getStatusIcon(item_status)}
                          </div>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("user_name")}>
                          <Typography>{user_name}</Typography>
                        </td>
                        <td className="p-2" hidden={!visibleFields.includes("user_phone")}>
                          <Typography>{user_phone}</Typography>
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

              <div className="flex md:flex-row flex-col md:items-center gap-2">

                  <Select
                  
                    onChange={(value) => {
                      setItemPerPage(Number(value));
                      setActive(1);
                    }}
                    value={itemPerPage.toString()}
                    label="Display per page"
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

      </>
    )
}

export default ItemTable;