import {useState } from "react";
import {useNavigate} from "react-router-dom"
import { Input, Button, Dialog,DialogHeader,DialogFooter, DialogBody, Textarea} from "@material-tailwind/react"; 
import { FaArrowLeft } from "react-icons/fa";

export const SubmitLostItem =({binusian, item, setStatus})=>{
    const [openDialog, setOpenDialog] = useState(false);
    const toggleOpen = (value) => setOpenDialog(!openDialog);
    const navigate =useNavigate()

    const handleSubmit = () =>{
        navigate("/admin/items")
    }

    return(<>
    <div className="w-full h-full flex flex-col justify-between gap-3" >
        <div className="flex flex-col gap-5">
            <div className="flex md:flex-row flex-col w-full justify-between gap-6">
                <div className="md:w-1/2 w-full" >
                    <div className="text-[12px] pb-[10px] shadow-lg flex flex-col gap-5 p-3">
                        <h1 className="font-bold text-xl">Lost Item Info</h1>
                        <div className="lg:flex md:gap-5">
                            <div className="lg:w-1/2">
                                <h1 className="text-lg">Item Name: </h1>
                                <Input readOnly={true} value={item.Item_name}/>
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="text-lg">Reported at:</h1>
                                <Input readOnly={true} value={item.date_reported}/>
                            </div>
                        </div>
                        <div className="">
                            <h1 className="text-lg">Short Description:</h1>
                            <Input readOnly={true}  value={item.Item_short_desc}/>
                        </div>
                        <div className="">
                            <h1 className="text-lg">Detailed Description:</h1>
                            <Input readOnly={true}  value={item.Item_detail_desc}/>
                        </div>
                        <div className="">
                            <h1 className="text-lg">Category:</h1>
                            <Input readOnly={true}  value={item.Item_category}/>
                        </div>
                        <div className="lg:flex md:gap-5">
                            <div className="lg:w-1/2">
                                <h1 className="text-lg">Found at:</h1>
                                <Input readOnly={true}  value={item.location_found}/>
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="text-lg">Stored at:</h1>
                                <Input readOnly={true}  value={item.location_store}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-full">
                    <div className="w-full flex flex-col  gap-6 p-5 text-[12px] shadow-lg">
                        <h1 className="font-bold text-xl">Founder Info</h1>
                        <div className="">
                            <h1 className="text-lg ">Binusian ID:</h1>
                            <Input readOnly={true} value={binusian.binusian_id} />
                        </div>
                        <div className="">
                            <h1 className="text-lg ">Founder Name:</h1>
                            <Input readOnly={true} value={binusian.name}/>
                        </div>
                        <div className="lg:flex md:gap-5">
                            <div className="lg:w-1/2">
                                <h1 className="text-lg ">Founder Email:</h1>
                                <Input readOnly={true} value={binusian.email}/>
                            </div>
                            <div className="lg:w-1/2">
                                <h1 className="text-lg ">Founder Phone:</h1>
                                <Input readOnly={true} value={binusian.phone}/>
                            </div>
                        </div>
                        <div className="">
                            <h1 className="text-lg ">Founder Address:</h1>
                            <Textarea readOnly={true} value={binusian.address}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full justify-between items-center mb-8">
                <Button className="bg-red-500 rounded-full px-6 py-2 capitalize flex justify-center items-center gap-2" onClick={() => setStatus("AddFounder")}><FaArrowLeft/>Prev</Button>
                <Button className="bg-indigo-600 rounded-full px-6 py-2 capitalize flex justify-center items-center gap-2" onClick={()=>setOpenDialog(true)}>Submit</Button>
            </div>
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
    </>)
}

export default SubmitLostItem;