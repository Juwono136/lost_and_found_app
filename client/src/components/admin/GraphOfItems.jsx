import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState, useMemo } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import {useNavigate, useLocation} from "react-router-dom"
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Label } from "recharts";

const GraphOfItems =()=>{
    const [dateFilter, setDateFilter] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [items, setItems] = useState([{
            _id:1,
            user_info:"1",
            staff_id:"1",
            Item_name:"Phone",
            Item_img:"-",
            Item_detail_desc:"smartphone blue casing",
            Item_short_desc:"i phone",
            Item_category:"electornics",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"20/03/2025",
            date_claimed:"21/03/2025",
            Item_status:"Approved",
            createdAt:"",
            updatedAt:"",
          },{
            _id:2,
            user_info:"2",
            staff_id:"1",
            Item_name:"water bottle",
            Item_img:"",
            Item_detail_desc:"named",
            Item_short_desc:"blue",
            Item_category:"daily applicance",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"10/02/2025",
            date_claimed:"22/03/2025",
            Item_status:"Store",
            createdAt:"",
            updatedAt:"",
          },{
            _id:3,
            user_info:"1",
            staff_id:"1",
            Item_name:"Phone",
            Item_img:"-",
            Item_detail_desc:"smartphone blue casing",
            Item_short_desc:"i phone",
            Item_category:"electornics",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"20/03/2025",
            date_claimed:"",
            Item_status:"Approved",
            createdAt:"",
            updatedAt:"",
          },{
            _id:4,
            user_info:"2",
            staff_id:"1",
            Item_name:"water bottle",
            Item_img:"",
            Item_detail_desc:"named",
            Item_short_desc:"blue",
            Item_category:"daily applicance",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"10/02/2025",
            date_claimed:"",
            Item_status:"Store",
            createdAt:"",
            updatedAt:"",
          },{
            _id:5,
            user_info:"1",
            staff_id:"1",
            Item_name:"Phone",
            Item_img:"-",
            Item_detail_desc:"smartphone blue casing",
            Item_short_desc:"i phone",
            Item_category:"electornics",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"20/03/2025",
            date_claimed:"",
            Item_status:"Approved",
            createdAt:"",
            updatedAt:"",
          },{
            _id:6,
            user_info:"2",
            staff_id:"1",
            Item_name:"water bottle",
            Item_img:"",
            Item_detail_desc:"named",
            Item_short_desc:"blue",
            Item_category:"daily applicance",
            location_found:"fx",
            location_store:"fx",
            draft:"",
            date_reported:"10/02/2025",
            date_claimed:"",
            Item_status:"Store",
            createdAt:"",
            updatedAt:"",
          }]);
      
        //converting individual items to status of daily report
        const graphData = useMemo(() => {
          const dateCountMap = {};
        
          items.forEach((item) => {
            // Handle date_reported
            if (item.date_reported) {
              const [day, month, year] = item.date_reported.split("/");
              const reportedDate = `${year}-${month}-${day}`;
        
              if (!dateCountMap[reportedDate]) {
                dateCountMap[reportedDate] = { date: reportedDate, Reported: 0, Claimed: 0 };
              }
        
              dateCountMap[reportedDate].Reported += 1;
            }
        
            // Handle date_claimed
            if (item.date_claimed) {
              const [day, month, year] = item.date_claimed.split("/");
              const claimedDate = `${year}-${month}-${day}`;
        
              if (!dateCountMap[claimedDate]) {
                dateCountMap[claimedDate] = { date: claimedDate, Reported: 0, Claimed: 0 };
              }
        
              dateCountMap[claimedDate].Claimed += 1;
            }
          });
        
          // Sort and calculate running total:
          const sortedData = Object.values(dateCountMap).sort((a, b) => new Date(a.date) - new Date(b.date));
        
          let cumulativeReportedData = 0;
          let cumulativeClaimedData = 0;
          const cumulativeData = sortedData.map(entry => {
            cumulativeReportedData += entry.Reported;
            cumulativeReportedData -= entry.Claimed;
            cumulativeClaimedData += entry.Claimed
            return {
              ...entry,
              TotalReported: cumulativeReportedData,
              TotalClaimed: cumulativeClaimedData
            };
          });
        
          return cumulativeData;
        }, [items]);

      // filter data from the past 30 or 90 days
      const filterData = () => {
        const currentDate = new Date();
        let filteredData = [...graphData];

        if (dateFilter === 'month') {
            filteredData = graphData.filter((data) => {
                const dataDate = new Date(data.date);
                return currentDate - dataDate <= 30 * 24 * 60 * 60 * 1000;
            });
        } else if (dateFilter === '90days') {
            filteredData = graphData.filter((data) => {
                const dataDate = new Date(data.date);
                return currentDate - dataDate <= 90 * 24 * 60 * 60 * 1000;
            });
        }

        return filteredData;
    };

    useEffect(() => {
          const handleResize = () => {
            setIsMobile(window.innerWidth < 600); 
          };
        
          window.addEventListener('resize', handleResize);
        
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);


    const navigate =useNavigate()

    return (
        <>{isMobile ? (
        <div className="flex flex-col items-center w-full h-[280px] justify-between text-center mb-4 border-2 border-solid border-[#3917b4] rounded p-3 ">
              <h3 className="text-md font-semibold text-gray-700">Lost Item VS Claimed Items</h3>
              <div className="w-full h-full flex flex-col items-start justify-between">
                {/* Graph */}
              
                {filterData().length > 0 ? (<div className="w-full h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={780} height={180} data={filterData()} margin={{left:-30, bottom:10}}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3917b4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3917b4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorClaimed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00cdff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00cdff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date"  label={{ value: 'Date', position: 'insideBottom', offset:-3, style: { textAnchor: 'middle' }}}/>
                    <YAxis label={{angle: -90, position: 'insideLeft', offset:0, style: { textAnchor: 'middle' }}} /> 
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" align="right" iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>
                    <Area type="monotone" dataKey="TotalReported" name="Lost Item" stroke="#3917b4" fillOpacity={1} fill="url(#colorTotal)" />
                    <Area type="monotone" dataKey="TotalClaimed" name="Claimed Item" stroke="#00cdff" fillOpacity={1} fill="url(#colorClaimed)" />
                  </AreaChart>
                </ResponsiveContainer>
                </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                    No item matches your filter.
                  </div>
                )}
                {/* sorting */}
                <Select 
                    className="text-xs"
                    label="select graph date"
                    onChange={(value) => {
                      setDateFilter(value)}}>

                    <Option value="">All Time</Option>
                    <Option value="90days">Last 90 Days</Option>
                    <Option value="month">Past Month</Option>
                  </Select>
              </div>
            </div>
            ):(
            <div className="flex flex-col items-start w-full h-[300px] justify-between text-center mb-4 border-2 border-solid border-[#3917b4] rounded p-3 relative">
              <h3 className="text-left font-semibold text-gray-700 text-xl">Lost Item VS Claimed Items</h3>
              
              <div className="w-full h-full flex items-start justify-between mt-2">
                {/* Graph */}
                {filterData().length > 0 ? (
                  <div className="flex-1 h-full">
                  <ResponsiveContainer>
                    <AreaChart width={730} height={200} data={filterData()} >
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3917b4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3917b4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClaimed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00cdff" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00cdff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date"  label={{ value: 'Date', position: 'insideBottom', offset:-3, style: { textAnchor: 'middle' }}}/>
                      <YAxis label={{ value: 'Number Of Item', angle: -90, position: 'insideLeft', offset:0, style: { textAnchor: 'middle' }}} /> 
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend verticalAlign="top" align="right" iconType="square" iconSize={10} wrapperStyle={{ fontSize: '12px' }}/>
                      <Area type="monotone" dataKey="TotalReported" name="Lost Item" stroke="#3917b4" fillOpacity={1} fill="url(#colorTotal)" />
                      <Area type="monotone" dataKey="TotalClaimed" name="Claimed Item" stroke="#00cdff" fillOpacity={1} fill="url(#colorClaimed)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                    No item matches your filter.
                  </div>
                )}
                
                {/* sorting */}
                <div className="absolute top-2 right-3">
                  <Select 
                    className="text-xs"
                    label="select graph date"
                    onChange={(value) => {
                      setDateFilter(value)}}>

                    <Option value="">All Time</Option>
                    <Option value="90days">Last 90 Days</Option>
                    <Option value="month">Past Month</Option>
                  </Select>
                </div>
              </div>
            </div>)}</>
    )
    

}

export default GraphOfItems