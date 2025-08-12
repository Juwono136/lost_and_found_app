import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input,Button,Dialog,DialogHeader,DialogBody,DialogFooter } from "@material-tailwind/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const AddFounderInfo =({ binusian, setBinusian, setStatus})=>{

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

    return(
    <div className="flex flex-col w-full h-full gap-5">
        <div className="flex flex-col gap-5">
            <div className="flex md:flex-row flex-col w-full h-full justify-between gap-6 ">
                <div className=" h-full md:w-1/2 w-full gap-5">
                    <div className="pt-[20px] pb-[100px]">
                        <Input type="text" variant="static" value={binusian.binusian_id} onChange={(e) => setBinusian({ ...binusian, binusian_id: e.target.value })} label="Search user here"/>
                        <div>
                            
                        </div>
                    </div>
                    <div className="shadow-md  p-5 pb-[34px]">
                        Founder Information:
                        <Input readOnly={true} variant="static" placeholder="Username" value={binusian.name}/>
                        <Input readOnly={true} variant="static" placeholder="email" value={binusian.email}/>
                        <Input readOnly={true} variant="static" placeholder="phone number" value={binusian.phone}/>
                        <Input readOnly={true} variant="static" placeholder="address" value={binusian.address}/>
                    </div>
                </div>
                <div className="h-full md:w-1/2 w-full flex flex-col gap-4 shadow-md  p-5">
                    <p className="text-sm">Don't have an account? make account Here</p>
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
            <div className="flex flex-row w-full justify-between items-center mb-8">
                <Button size="lg" className="bg-red-500 rounded-full px-6 py-2 capitalize flex justify-center items-center gap-2" onClick={() => setStatus("AddItem")}><FaArrowLeft/>Prev</Button>
                <Button size="lg" className="bg-indigo-600 rounded-full px-6 py-2 capitalize flex justify-center items-center gap-2" onClick={() => setStatus("SubmitItem")}>Next<FaArrowRight/></Button>
            </div>
        </div>
    </div>
    )
}

