import { useState } from "react";

export const allItems=[{
    _id:1,
    user_info:"1",
    staff_id:"3",
    item_name:"Phone",
    item_img:"-",
    item_detail_desc:"smartphone blue casing",
    item_short_desc:"i phone",
    item_category:"electornics",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"20/03/2025",
    date_claimed:"21/03/2025",
    item_status:"Active",
    createdAt:"",
    updatedAt:"",
  },{
    _id:2,
    user_info:"2",
    staff_id:"3",
    item_name:"water bottle",
    item_img:"",
    item_detail_desc:"named",
    item_short_desc:"blue",
    item_category:"daily applicance",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"10/02/2025",
    date_claimed:"",
    item_status:"Claimed",
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
    item_category:"electornics",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"20/03/2025",
    date_claimed:"",
    item_status:"Pending",
    createdAt:"",
    updatedAt:"",
  },{
    _id:4,
    user_info:"2",
    staff_id:"3",
    item_name:"water bottle",
    item_img:"",
    item_detail_desc:"named",
    item_short_desc:"blue",
    item_category:"daily applicance",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"10/02/2025",
    date_claimed:"",
    item_status:"On Hold",
    createdAt:"",
    updatedAt:"",
  },{
    _id:5,
    user_info:"1",
    staff_id:"3",
    item_name:"Phone",
    item_img:"-",
    item_detail_desc:"smartphone blue casing",
    item_short_desc:"i phone",
    item_category:"electornics",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"20/03/2025",
    date_claimed:"",
    item_status:"Cancel",
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
    item_category:"daily applicance",
    location_found:"fx",
    location_store:"fx",
    draft:"",
    date_reported:"10/02/2025",
    date_claimed:"",
    item_status:"Cancel",
    createdAt:"",
    updatedAt:"",
  },];

export const users=[{
    _id:"1",
    name:"alisa",
    email:"alisa@mail",
    phone:1111,
    role:"student"
},{_id:"2",
    name:"rayhan",
    email:"Rayhan@mail",
    phone:1111,
    role:"student"
},{
    _id:"3",
    name:"kevin",
    email:"Kevin@mail",
    phone:1111,
    role:"staff"
    },
    {
    _id:"4",
    name:"juwono",
    email:"Juwono@mail",
    phone:1111,
    role:"staff"
    }]


export const getDashboardRows=(items,users)=>{

    //functions

    

    const dashboardRows=[]

    for (let i = 0; i < 5; i++) {
        const item= items[i];

        const staff = users.find(u => u._id === item.staff_id && u.role === "staff");
        const student = users.find(u => u._id === item.user_info && u.role === "student");

        dashboardRows.push({
            item_id: item._id,
            item_name: item.item_name,
            student_name: student ? student.name : "Unknown",
            location_found: item.location_found,
            location_store:item.location_store,
            item_status: item.item_status,
            date_reported: item.date_reported,
            staff_name: staff ? staff.name : "Unknown",
        });

    }

    return dashboardRows;
}

