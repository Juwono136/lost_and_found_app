import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditItem = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const navigate =useNavigate()

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

    const UploadImage = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItem({ ...item, Item_img: reader.result }); // Store base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    const submitEdit= (item)=>{

    }
  
    return (
    <>{isMobile?(
        <div className="h-[90%] overflow:auto text-xs mb-[5px] pb-6">
        <div className="w-full h-[60vh] flex flex-col gap-4 ">
            <div className="flex flex-row w-full">
                <div className="w-full h-[40vh] border border-solid border-black p-[5px] flex items-center justify-center overflow-hidden">
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <input type="file" accept="image/*" onChange={UploadImage} className="hidden"/>
                        {item.Item_img ? (
                        <img src={item.Item_img} alt="Preview" className="top-0 left-0 max-w-full max-h-full object-cover"/>
                        ) : (
                            <span className="text-gray-500  ">Upload Image</span>
                        )}
                    </label>
                </div>
                
            </div>
            <div className="h-full flex flex-col gap-4">
                    <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Item Name" value={item.Item_name} onChange={(e) => setItem({ ...item, Item_name: e.target.value })}/>
                    <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Item Category" value={item.Item_category} onChange={(e) => setItem({ ...item, Item_category: e.target.value })}/>
                    <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Location Found" value={item.location_found} onChange={(e) => setItem({ ...item, location_found: e.target.value })}/>
                    <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Location Store" value={item.location_store} onChange={(e) => setItem({ ...item, location_store: e.target.value })}/>

                <textarea className="bg-gray-300 placeholder-gray-500 p-[9px] rounded " placeholder="Complete Item Description" value={item.Item_detail_desc} onChange={(e) => setItem({ ...item, Item_detail_desc: e.target.value })}/>
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Short Item Description" value={item.Item_short_desc} onChange={(e) => setItem({ ...item, Item_short_desc: e.target.value })}/>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 pb-6">
                <button className="bottom-0 bg-blue-500 p-[5px] rounded-full w-[20%]" onClick={() => submitEdit(item)}>submit</button>
            </div>
        </div>
        </div>
    ):(
    <div className="flex flex-row w-full h-full gap-10">
            <div className="w-[50%] h-[72vh] flex flex-col gap-4">
                <div className="w-full h-[70%] border border-solid border-black p-[5px] flex items-center justify-center overflow-hidden">
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <input type="file" accept="image/*" onChange={UploadImage} className="hidden"/>
                        {item.Item_img ? (
                        <img src={item.Item_img} alt="Preview" className="top-0 left-0 max-w-full max-h-full object-cover"/>
                        ) : (
                            <span className="text-gray-500  ">Upload Image</span>
                        )}
                    </label>
                </div>    
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Item Name" value={item.Item_name} onChange={(e) => setItem({ ...item, Item_name: e.target.value })}/>
            </div>
            <div className="w-[50%] h-[70vh] flex flex-col gap-4 ">
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Item Category" value={item.Item_category} onChange={(e) => setItem({ ...item, Item_category: e.target.value })}/>
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Location Found" value={item.location_found} onChange={(e) => setItem({ ...item, location_found: e.target.value })}/>
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Location Store" value={item.location_store} onChange={(e) => setItem({ ...item, location_store: e.target.value })}/>

                <textarea type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Complete Item Description" value={item.Item_detail_desc} onChange={(e) => setItem({ ...item, Item_detail_desc: e.target.value })}/>
                <input type="text" className="bg-gray-300 placeholder-gray-500 p-[9px] rounded" placeholder="Short Item Description" value={item.Item_short_desc} onChange={(e) => setItem({ ...item, Item_short_desc: e.target.value })}/>
            </div>
            <button className="absolute bottom-4 right-4 bg-blue-500 text-white p-[5px] w-[60px] rounded-full" onClick={() => submitEdit(item)}>submit</button>
            
        </div>
    )}
    </>
        
    )
  };
  
  export default EditItem;