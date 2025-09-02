
import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import {useNavigate } from "react-router-dom"
import { Pie, PieChart,Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Label } from "recharts";

const GraphOfMeetings =()=>{
    const [dateFilter, setDateFilter] = useState('');
    const [meetingData,setMeetingData]=useState([
        {name:"rescheduled",number:10},
        {name:"need approval",number:5},
        {name:"rejected",number:15},
    ]
    )
    const COLORS = ["#8884d8", "#82ca9d", "#ff8042"];


    useEffect(() => {
          
        }, []);


    const navigate =useNavigate()

    return (
    <div className="flex flex-col items-start w-full h-[350px] justify-between text-center mb-4 border-2 border-solid border-gray-400 shadow shadow-lg rounded p-3 relative">
        
        <div className="w-full h-4/5 gap-4">
        <h3 className="text-left font-semibold text-gray-700 text-xl">Meetings</h3>
        <ResponsiveContainer>
          <PieChart width={400} height={400}>
            <Pie
              data={meetingData}
              dataKey="number"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60} // 👈 Makes it hollow (donut)
              fill="#8884d8"
            >
              {meetingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip/>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        </div>
    </div>
    )
    

}

export default GraphOfMeetings