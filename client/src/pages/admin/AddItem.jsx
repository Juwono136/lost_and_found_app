import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Datepicker  from "react-tailwindcss-datepicker"; 
import dayjs  from "dayjs";
import { Select, Option, Popover, PopoverHandler, PopoverContent, Input, Button, Textarea, Dialog,DialogHeader,DialogFooter, DialogBody} from "@material-tailwind/react"; 
import Item from "./Item";

const AddItemInfo =({item, setItem, setStatus, isMobile})=>{
    const navigate =useNavigate()

    const UploadImage = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItem({ ...item, Item_img: reader.result }); 
            };
            reader.readAsDataURL(file);
        }
    };

    const [value, setValue] = useState("");


    return(<>{isMobile?(
        <div className="w-full h-[60vh] flex flex-col gap-4 ">
            <div className="flex flex-row w-full">
                <div className="w-full h-[40vh] border border-solid border-black p-[5px] flex items-center justify-center overflow-hidden">
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <Input type="file" variant="static" accept="image/*" onChange={UploadImage} className="hidden"/>
                        {item.Item_img ? (
                        <img src={item.Item_img} alt="Preview" className="top-0 left-0 max-w-full max-h-full object-cover"/>
                        ) : (
                            <span className="text-gray-500  ">Upload Image</span>
                        )}
                    </label>
                </div>
                
            </div>
            <div className="h-full flex flex-col gap-8">
                    <Input type="text" variant="static" label="Item Name" value={item.Item_name} onChange={(e) => setItem({ ...item, Item_name: e.target.value })}/>
                    <Input type="text" variant="static" label="Item Category" value={item.Item_category} onChange={(e) => setItem({ ...item, Item_category: e.target.value })}/>
                    <Input type="text" variant="static" label="Location Found" value={item.location_found} onChange={(e) => setItem({ ...item, location_found: e.target.value })}/>
                    <Input type="text" variant="static" label="Location Store" value={item.location_store} onChange={(e) => setItem({ ...item, location_store: e.target.value })}/>
                    <Datepicker
                            asSingle={true}
                            value={value}
                            useRange={false}
                            readOnly={true}
                            onChange={(date) => {
                                setValue(date);
                                setItem({ ...item, date_reported: date?.startDate ? dayjs(date.startDate).format("DD-MM-YYYY") : null });
                            }}
                            primaryColor="blue"
                            />
                    <div className="flex items-center gap-2 flex-1 relative">
                    </div>
                <Textarea className="bg-gray-300 placeholder-gray-500 p-[9px] rounded " label="Complete Item Description" value={item.Item_detail_desc} onChange={(e) => setItem({ ...item, Item_detail_desc: e.target.value })}/>
                <Input type="text" variant="static" label="Short Item Description" value={item.Item_short_desc} onChange={(e) => setItem({ ...item, Item_short_desc: e.target.value })}/>
                {/* <Button className="mb-6 p-[5px] rounded-full w-[20%] " onClick={() => setStatus("AddFounder")}>
                    Next
                </Button> */}
            </div>
            
        </div>
    ):(
    <div className="flex flex-row w-full h-full gap-10">
            <div className="w-[50%] h-[72vh] flex flex-col gap-4">
                <div className="w-full h-[70%] border border-solid border-black p-[5px] flex items-center justify-center overflow-hidden">
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <Input type="file" accept="image/*" onChange={UploadImage} className="hidden" variant="standard"/>
                        {item.Item_img ? (
                        <img src={item.Item_img} alt="Preview" className="top-0 left-0 max-w-full max-h-full object-cover"/>
                        ) : (
                            <span className="text-gray-500  ">Upload Image</span>
                        )}
                    </label>
                </div>
                <div>
                    <Input type="text" label="Item Name" variant="static" value={item.Item_name} onChange={(e) => setItem({ ...item, Item_name: e.target.value })}/>
                </div>
                <div className="inline-flex items-center gap-2">
                    <p className="w-[90px]">Found at:</p>
                    {/* needs fixing */}
                    <div className="flex items-center gap-2 flex-1 relative" >
                        <Datepicker
                            variant="static"
                            asSingle={true}
                            useRange={false}
                            readOnly={true}
                            value={value}
                            onChange={(date) => {
                                setValue(date);
                                setItem({ ...item, date_reported: date?.startDate ? dayjs(date.startDate).format("DD-MM-YYYY") : null });
                                setOpenPopover(false);
                            }}
                            primaryColor="blue"
                            />
                    </div>
                </div>
            </div>
            <div className="w-[50%] h-[70vh] flex flex-col gap-6 ">
                <div>
                    <Select
                    variant="static"
                    label="Item Category"
                    value={item.Item_category}
                    onChange={(val)=> setItem({ ...item, Item_category:val })}>
                        {/* add more options for category as needed
                            change on Item.jsx and EditItem.jsx page*/}
                        <Option value="electronics">electronics</Option>
                        <Option value="daily appliance">daily appliance</Option>
                    </Select>
                </div>
                <div>
                    <Input type="text" variant="static" label="Location Found" value={item.location_found} onChange={(e) => setItem({ ...item, location_found: e.target.value })}/>
                </div>
                <div >
                    <Input type="text" variant="static" label="Location Store" value={item.location_store} onChange={(e) => setItem({ ...item, location_store: e.target.value })}/>
                </div>
                <div>
                    Long Item Description
                    <Textarea type="text" containerProps={{className:" rounded"}} placeholder="Complete item description" value={item.Item_detail_desc} onChange={(e) => setItem({ ...item, Item_detail_desc: e.target.value })}/>
                </div>
                <div>
                    <Input type="text" variant="static" label="Short Item Description" value={item.Item_short_desc} onChange={(e) => setItem({ ...item, Item_short_desc: e.target.value })}/>
                </div>
                {/* <button className=" bottom-4 right-4 bg-blue-500 text-white p-[5px] w-[60px] rounded-full" onClick={()=>setStatus("AddFounder")}>next</button> */}
                <Button size="lg" className="bottom-0 p-[5px] rounded-full w-[20%] " onClick={() => setStatus("AddFounder")}>
                    Next
                </Button>
        </div>
            
        </div>
    )}
    
    </>
        
    )
}

const AddFounderInfo =({ binusian, setBinusian, item, setItem, setStatus, isMobile})=>{

    const [createUser, setCreateUser]=useState({
        id:"",
        username:"",
        email:"",
        phone:"",
        address:""
    })

    const [openDialog, setOpenDialog] = useState(false);
    const toggleOpen = (value) => setOpenDialog(!openDialog);

    //for mobile only
    const [showForm,setShowForm]= useState(false);
    const toggleShowForm = (value) => setShowForm(!showForm);

    const handleCreateUser =() => {
        //find if user exists

        //set the created user into the binusian
        setBinusian({
            binusian_id:createUser.id,
            name:createUser.username,
            email:createUser.email,
            phone:createUser.phone,
            address:createUser.address,
        })

        //close dialog
        toggleOpen()
    }

    const fetchFounder =()=>{

    }

    return(<>
    {isMobile?(
        <div className="flex flex-col w-full h-full gap-5">
            <div className="w-full h-[400px] flex flex-col justify-between ">
                <div className=" h-full w-full gap-5">
                    <div className="pt-[20px] pb-[50px]">
                        <Input type="text" variant="static" value={binusian.binusian_id} onChange={(e) => setBinusian({ ...binusian, binusian_id: e.target.value })} label="Search user here"/>
                        <div>
                            
                        </div>
                    </div>
                    <div className="shadow-md shadow-blue-400 p-5">
                        Founder Information:
                        <Input readOnly={true} variant="static" placeholder="Username" value={binusian.name}/>
                        <Input readOnly={true} variant="static" placeholder="email" value={binusian.email}/>
                        <Input readOnly={true} variant="static" placeholder="phone number" value={binusian.phone}/>
                        <Input readOnly={true} variant="static" placeholder="address" value={binusian.address}/>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center pb-7 gap-4"><h1 className="text-lg">Don't have an account?</h1> <Button size="sm" onClick={toggleShowForm}>Create Account</Button></div>
                    <div className={`h-full w-full flex flex-col gap-4 shadow-md shadow-blue-400 p-5 mb-[20px] ${showForm?"":"hidden"}`}>
                        
                        <div>
                            <Input type="text" value={createUser.id} onChange={(e) => setCreateUser({ ...createUser, id: e.target.value })} variant="static" label="UID"/>
                        </div>
                        <div>
                            <Input type="text" value={createUser.username} onChange={(e) => setCreateUser({ ...createUser, username: e.target.value })} variant="static" label="Username"/>
                        </div>
                        <div>
                            <Input type="text" value={createUser.email} onChange={(e) => setCreateUser({ ...createUser, email: e.target.value })} variant="static" label="E-mail"/>
                        </div>
                        <div>
                            <Input type="text" value={createUser.phone} onChange={(e) => setCreateUser({ ...createUser, phone: e.target.value })} variant="static" label="Phone Number"/>
                        </div>
                        <div>
                            <Input type="text" value={createUser.address} onChange={(e) => setCreateUser({ ...createUser, address: e.target.value })} variant="static" label="address"/>
                        </div>
                        <Button onClick={toggleOpen}>Create</Button>
                        <Dialog open={openDialog} handler={toggleOpen}>
                            <DialogHeader>
                                Are you sure you want to create an account?
                            </DialogHeader>
                            <DialogBody>
                                <div className="flex flex-col">
                                    <div>
                                        UserId: {createUser.id}
                                    </div>
                                    <div>
                                        Username: {createUser.username}
                                    </div>
                                    <div>
                                        E-mail: {createUser.email}
                                    </div>
                                    <div>
                                        Phone: {createUser.phone}
                                    </div>
                                    <div>
                                        Address: {createUser.address}
                                    </div>
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={toggleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="text" color="green" onClick={handleCreateUser}>
                                    <span>Create</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </div>
                </div>
                <div className="flex flex-row w-full justify-between mt-auto mb-4">
                    <Button size="lg" className="bottom-1 bg-red-500 p-[5px] rounded-full w-[20%]" onClick={() => setStatus("AddItem")}>Prev</Button>
                    <Button size="lg" className="bottom-1 bg-blue-500 p-[5px] rounded-full w-[20%] " onClick={() => setStatus("SubmitItem")}>Next</Button>
                </div>
            </div>
         </div>

    ):(
        <div className="flex flex-col w-full h-full gap-5">
            <div className="flex flex-row w-full h-full justify-between ">
                <div className=" h-full w-[48%] gap-5">
                    <div className="pt-[20px] pb-[100px]">
                        <Input type="text" variant="static" value={binusian.binusian_id} onChange={(e) => setBinusian({ ...binusian, binusian_id: e.target.value })} label="Search user here"/>
                        <div>
                            
                        </div>
                    </div>
                    <div className="shadow-md shadow-blue-400 p-5 pb-[34px]">
                        Founder Information:
                        <Input readOnly={true} variant="static" placeholder="Username" value={binusian.name}/>
                        <Input readOnly={true} variant="static" placeholder="email" value={binusian.email}/>
                        <Input readOnly={true} variant="static" placeholder="phone number" value={binusian.phone}/>
                        <Input readOnly={true} variant="static" placeholder="address" value={binusian.address}/>
                    </div>
                </div>
                <div className="h-full w-[48%] flex flex-col gap-4 shadow-md shadow-blue-400 p-5">
                    Don't have an account? make account Here
                    <div>
                        <Input type="text" value={createUser.id} onChange={(e) => setCreateUser({ ...createUser, id: e.target.value })} variant="static" label="UID"/>
                    </div>
                    <div>
                        <Input type="text" value={createUser.username} onChange={(e) => setCreateUser({ ...createUser, username: e.target.value })} variant="static" label="Username"/>
                    </div>
                    <div>
                        <Input type="text" value={createUser.email} onChange={(e) => setCreateUser({ ...createUser, email: e.target.value })} variant="static" label="E-mail"/>
                    </div>
                    <div>
                        <Input type="text" value={createUser.phone} onChange={(e) => setCreateUser({ ...createUser, phone: e.target.value })} variant="static" label="Phone Number"/>
                    </div>
                    <div>
                        <Input type="text" value={createUser.address} onChange={(e) => setCreateUser({ ...createUser, address: e.target.value })} variant="static" label="address"/>
                    </div>
                    <Button onClick={toggleOpen}>Create</Button>
                    <Dialog open={openDialog} handler={toggleOpen}>
                        <DialogHeader>
                            Are you sure you want to create an account?
                        </DialogHeader>
                        <DialogBody>
                            <div className="flex flex-col">
                                <div>
                                    UserId: {createUser.id}
                                </div>
                                <div>
                                    Username: {createUser.username}
                                </div>
                                <div>
                                    E-mail: {createUser.email}
                                </div>
                                <div>
                                    Phone: {createUser.phone}
                                </div>
                                <div>
                                    Address: {createUser.address}
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={toggleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="text" color="green" onClick={handleCreateUser}>
                                <span>Create</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between ">
                <Button size="lg" className="bottom-0 bg-red-500 p-[5px] rounded-full w-[20%]" onClick={() => setStatus("AddItem")}>Prev</Button>
                <Button size="lg" className="bottom-0 bg-blue-500 p-[5px] rounded-full w-[20%] " onClick={() => setStatus("SubmitItem")}>Next</Button>
            </div>
            
        </div>)}
    </>
    
    )
}

const SubmitLostItem =({binusian, item, setItem, setStatus, isMobile})=>{
    const [openDialog, setOpenDialog] = useState(false);
    const toggleOpen = (value) => setOpenDialog(!openDialog);
    const navigate =useNavigate()

    const handleSubmit = ()=>{
        navigate("/admin/items")
    }

    return(<>{isMobile?(
        <div className="flex flex-col gap-5">
            <div>
                <h1 className="font-bold pt-[10px] text-lg">Lost Item Info</h1>
                <div className="text-[12px] pb-[10px] shadow-lg shadow-blue-400 flex flex-col gap-1 p-3">
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Item Name: </h1>
                        <Input readOnly={true} variant="static" value={item.Item_name}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Detailed Desc:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_detail_desc}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Short Desc:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_short_desc}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Category:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_category}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Found at:</h1>
                        <Input readOnly={true} variant="static" value={item.location_found}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Stored at:</h1>
                        <Input readOnly={true} variant="static" value={item.location_store}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Reported at:</h1>
                        <Input readOnly={true} variant="static" value={item.date_reported}/>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-bold pt-[10px] text-lg" >Founder Info</h1>
                <div className="w-full flex flex-col pb-[20px] gap-6 p-5 text-[12px] shadow-lg shadow-blue-400">
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Binusian ID:</h1>
                        <Input readOnly={true} variant="static" value={binusian.binusian_id} />
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Name:</h1>
                        <Input readOnly={true} variant="static" value={binusian.name}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Email:</h1>
                        <Input readOnly={true} variant="static" value={binusian.email}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Phone:</h1>
                        <Input readOnly={true} variant="static" value={binusian.phone}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-[17px] w-[210px]">Founder Address:</h1>
                        <Input readOnly={true} variant="static" value={binusian.address}/>
                    </div>
                </div>
            </div>
            <div className=" flex flex-row w-full justify-between mt-4 mb-8">
                <Button className="bottom-0 bg-red-500 p-[5px] rounded-full w-[20%]" onClick={() => setStatus("AddFounder")}>Prev</Button>
                <Button className="bottom-0 bg-blue-500 p-[5px] rounded-full w-[20%]" onClick={()=>setOpenDialog(true)}>Submit</Button>
            </div>
            <Dialog open={openDialog} handler={toggleOpen} size="sm" className="absolute w-[200px]">
                <DialogHeader>Are you sure you want submit</DialogHeader>
                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={toggleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="text" color="green" onClick={handleSubmit}>
                    <span>Submit</span>
                </Button>
                </DialogFooter>
            </Dialog>
        </div>
    ):(
    <div className="w-full h-full flex flex-col justify-between" >
        <div className="flex flex-row w-full justify-between mb-[30px]">
            <div className="w-[48%]" >
                <h1 className="font-bold pt-[10px]">Lost Item Info</h1>
                <div className="text-[12px] pb-[10px] shadow-lg shadow-blue-400 flex flex-col gap-1 p-3">
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Item Name: </h1>
                        <Input readOnly={true} variant="static" value={item.Item_name}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Detailed Desc:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_detail_desc}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Short Desc:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_short_desc}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Category:</h1>
                        <Input readOnly={true} variant="static" value={item.Item_category}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Found at:</h1>
                        <Input readOnly={true} variant="static" value={item.location_found}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Stored at:</h1>
                        <Input readOnly={true} variant="static" value={item.location_store}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[165px]">Reported at:</h1>
                        <Input readOnly={true} variant="static" value={item.date_reported}/>
                    </div>
                </div>
            </div>
            <div className="w-[48%]">
                <h1 className="font-bold pt-[10px]">Founder Info</h1>
                <div className="w-full flex flex-col pb-[20px] gap-6 p-5 text-[12px] shadow-lg shadow-blue-400">
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Binusian ID:</h1>
                        <Input readOnly={true} variant="static" value={binusian.binusian_id} />
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Name:</h1>
                        <Input readOnly={true} variant="static" value={binusian.name}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Email:</h1>
                        <Input readOnly={true} variant="static" value={binusian.email}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-lg w-[210px]">Founder Phone:</h1>
                        <Input readOnly={true} variant="static" value={binusian.phone}/>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-[17px] w-[210px]">Founder Address:</h1>
                        <Input readOnly={true} variant="static" value={binusian.address}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row w-full justify-between">
            <Button className=" bg-red-500 p-[5px] rounded-full w-[20%]" onClick={() => setStatus("AddFounder")}>Prev</Button>
            <Button className=" bg-blue-500 p-[5px] rounded-full w-[20%]" onClick={()=>setOpenDialog(true)}>Submit</Button>
        </div>
        <Dialog open={openDialog} handler={toggleOpen} size="sm" className="absolute w-[200px]">
            <DialogHeader>Are you sure you want submit</DialogHeader>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={toggleOpen}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="text" color="green" onClick={handleSubmit}>
                <span>Submit</span>
            </Button>
            </DialogFooter>
        </Dialog>
    </div>
    )}
    </>)
}

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
    
    const renderContent = (isMobile) => {
        switch (status) {
        case "AddFounder":
            return <AddFounderInfo binusian={binusian} setBinusian={setBinusian} item={item} setItem={setItem} setStatus={setStatus} isMobile={isMobile}/>
        case "SubmitItem":
            return <SubmitLostItem binusian={binusian} setBinusian={setBinusian} item={item} setItem={setItem} setStatus={setStatus} isMobile={isMobile}/>
        default:
            return <AddItemInfo item={item} setItem={setItem} setStatus={setStatus} isMobile={isMobile}/>
        }
    };

    return (<>{isMobile?(
        <div className="h-[90%] overflow:auto text-xs mb-[5px] pb-6">
            <p className="inline-block"><span className={`font-bold ${status==="AddFounder"|| status=="SubmitItem"? "text-green-500":"text-blue-600"}`} >Add Lost Item Info</span> <span className={`${status==="AddFounder"? "font-bold text-blue-600":""} ${status=="SubmitItem"? "font-bold text-green-500":""}`}> -------- Add Founder Info</span> <span className={status=="SubmitItem"? "font-bold text-blue-600":""}> -------- Submit Lost Item</span></p>
            {renderContent(isMobile)}
        </div>
    ):(
    <div className="h-[90%] overflow:auto">
            <p className="inline-block"><span className={`font-bold ${status==="AddFounder"|| status=="SubmitItem"? "text-green-500":"text-blue-600"}`} >Add Lost Item Info</span> <span className={`${status==="AddFounder"? "font-bold text-blue-600":""} ${status=="SubmitItem"? "font-bold text-green-500":""}`}> -------- Add Founder Info</span> <span className={status=="SubmitItem"? "font-bold text-blue-600":""}> -------- Submit Lost Item</span></p>
            {renderContent(isMobile)}
        </div>
    )
    }
    </>
        
    );
};

export default AddItem;
