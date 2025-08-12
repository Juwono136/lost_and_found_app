import { Button, Input } from "@material-tailwind/react";
import { FaRegEdit, FaRegSave, FaInstagramSquare } from "react-icons/fa";
import {  FaSquareXTwitter, FaXmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
 

const Profile = () => {

    const [user, setUser] = useState({
        username: "Juwono",
        phone:"+62 812-3456-7890",
        email:"juwono@student.binus.ac.id",
        address:"fx"
    })

    const [toggleEdit, setToggleEdit]=useState(false)


    useEffect(() => {
    }, []);

    return (
        <div className="w-full flex flex-col gap-5 ">
            <h1 className="text-2xl">Welcome, {user.username}</h1>
            <div className=" lg:w-full xs:w-full h-full p-5 border border-gray-400 rounded shadow shadow-xl ">
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Profile Information</h1>
                        <div className="flex gap-2">
                            <Button className={`bg-gray-100 hover:bg-gray-300/50 border border-gray-400 text-black flex gap-1 items-center ${toggleEdit? 'hidden':''}`} onClick={()=>setToggleEdit(true)}><FaRegEdit size={20}/> Edit </Button>
                            <Button className={`bg-gray-100 hover:bg-gray-300/50 border border-gray-400 text-black flex gap-1 items-center ${toggleEdit? '':'hidden'}`} size="sm" onClick={()=>setToggleEdit(false)}><FaXmark/> Cancel </Button>
                            <Button className={`bg-blue-600 hover:bg-blue-800 border border-gray-400 flex gap-3 items-center ${toggleEdit? '':'hidden'}`} onClick={()=>setToggleEdit(true)}><FaRegSave size={20}/> Save </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="w-2/5 justify-center">
                        <span className="group relative inline-block w-[240px] h-[240px]">
                            <img
                                className="rounded-full w-full h-full border border-solid border-black hover:bg-gray-400 object-cover"
                                src=""
                                alt="profile"
                            />
                            <h1 className="absolute inset-0 flex items-center underline justify-center text-xl font-bold invisible group-hover:visible">
                                upload image
                            </h1>
                        </span>
                        <h1 className="text-2xl">{user.username}</h1>
                        <h1>{user.email}</h1>
                    </div>
                    <div className="lg:flex w-full pt-5 gap-4">
                        <div className="lg:w-1/3 w-full">
                            <div className="pb-5">
                                <h1>Full Name</h1>
                                <Input className="" disabled={!toggleEdit} value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                            </div>
                            <div className="pb-5">
                                <h1>Phone Number</h1>
                                <Input className="" disabled={!toggleEdit} value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                            </div>
                        </div>
                        <div className="lg:w-1/3 w-full">
                            <div className="pb-5">
                                <h1>Email Address</h1>
                                <Input className="" disabled={!toggleEdit} value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div className="pb-5">
                                <h1>address</h1>
                                <Input className="" disabled={!toggleEdit} value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                            </div>
                        </div>
                        <div className="lg:w-1/3 w-full">
                            <div className="pb-5">
                                <h1>Member Since</h1>
                                <Input className="" disabled={true} value={"today"} />
                            </div>
                            <div className="flex ">
                                <FaInstagramSquare size={40} color="#DD2A7B"/>
                                <FaSquareXTwitter size={40}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};

export default Profile;
