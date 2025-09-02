import { Button, Input, Dialog, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { FaRegEdit, FaRegSave, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
 

const Profile = () => {

    const [user, setUser] = useState({
        profilePicture:"",
        username: "Juwono",
        phone:"+62 812-3456-7890",
        email:"juwono@student.binus.ac.id",
        address:"fx",
        role:"admin"
    })

    const [originalUser, setOriginalUser] = useState(user);

    const [toggleEdit, setToggleEdit]=useState(false)
    const [disableUpdateUser, setDisableUpdateUser] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const toggleOpen = (value) => setOpenDialog(!openDialog);

    const UploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser({ ...user, profilePicture: reader.result });
        };
        reader.readAsDataURL(file);
        }
    };

    const cancelChanges =()=>{
        setUser(originalUser)
        setOpenDialog(false)
        setToggleEdit(false)
    }

    const confirmChanges =()=>{
        setOriginalUser(user)
        //command to change the user in database
        setOpenDialog(false)
        setToggleEdit(false)
    }

    useEffect(() => {
      const changeEditStatus = JSON.stringify(user) !== JSON.stringify(originalUser);
      setDisableUpdateUser(!changeEditStatus);
    }, [user, originalUser]);
    


    useEffect(() => {
    }, []);

    return (
        <>
        <div className="w-full flex flex-col gap-5 ">
            <h1 className="text-2xl ">Welcome, {originalUser.username}</h1>
            <div className="lg:w-full xs:w-full h-full p-5 border border-gray-400 rounded shadow shadow-xl ">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl">Profile Information</h1>
                        <div className="flex gap-2">
                            <Button className={`bg-gray-100 hover:bg-gray-300/50 border border-gray-400 text-black flex gap-1 items-center ${toggleEdit? 'hidden':''}`} onClick={()=>setToggleEdit(true)}><FaRegEdit size={20}/> Edit </Button>
                            <Button className={`bg-gray-100 hover:bg-gray-300/50 border border-gray-400 text-black flex gap-1 items-center ${toggleEdit? '':'hidden'}`} size="sm" onClick={cancelChanges}><FaXmark/> Cancel </Button>
                            <Button className={`bg-blue-600 hover:bg-blue-800 border border-gray-400 flex gap-3 items-center ${toggleEdit? '':'hidden'}`} disabled={disableUpdateUser} onClick={()=>setOpenDialog(true)}><FaRegSave size={20}/> Save </Button>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-5">
                    <div className="justify-center">
                        <label className="group relative inline-block w-[240px] h-[240px]">
                            
                            <img
                                className={`rounded-full w-full h-full border border-solid border-black object-cover ${toggleEdit?'bg-gray-400':''}`}
                                src={user.profilePicture}
                                alt="profile"
                            />
                            <h1 className={`absolute inset-0 flex items-center underline justify-center text-xl font-bold ${toggleEdit?'visible':'invisible'}` } onClick={UploadImage}>
                                upload image
                            </h1>
                            <Input
                                type="file"
                                variant="static"
                                accept="image/*"
                                onChange={UploadImage}
                                className="z-10 hidden"
                                disabled={!toggleEdit}
                                />
                        </label>
                        <h1 className="text-2xl">{originalUser.username}</h1>
                        <h1>{originalUser.email}</h1>
                    </div>
                    <div className="w-full">
                        <div className="lg:flex w-full pt-5 gap-4">
                            <div className="lg:w-1/3 1/5 w-full">
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
                                    <h1>Role</h1>
                                    <Input className="" disabled={true} value={user.role} />
                                </div>
                                <div className="pb-5">
                                    <h1>Member Since</h1>
                                    <Input className="" disabled={true} value={"today"} />
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex justify-right">
                            <FaInstagramSquare size={40} color="#DD2A7B"/>
                            <FaSquareXTwitter size={40}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog open={openDialog} handler={toggleOpen} size="sm" className="absolute w-[200px]">
            <DialogHeader>Are you sure you want submit</DialogHeader>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={cancelChanges}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="text" color="green" onClick={confirmChanges}>
                <span>Confirm</span>
            </Button>
            </DialogFooter>
        </Dialog>
        </>
    );
};

export default Profile;
