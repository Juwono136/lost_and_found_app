import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import {
  Input,
  Button,
  Textarea,
  Dialog,DialogHeader,DialogFooter,
} from "@material-tailwind/react";
import { FaArrowRight, FaRegTrashAlt } from "react-icons/fa";


export const AddItemInfo = ({ item, setItem, setStatus}) => {

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
  
  const [openDialogDeleteImage, setOpenDialogDeleteImage] = useState(false);
  const toggleOpenDialogDeleteImage = (value) => setOpenDialogDeleteImage(!openDialogDeleteImage);

  const handleDeleteImage= () =>{
    setItem({...item,Item_img:""});
    setOpenDialogDeleteImage(false)
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex flex-col gap-6 lg:flex-row">
        {/* upload image component */}
        <div className="flex flex-col gap-9 lg:w-2/5 w-full  items-center">
          <div className="w-full h-[60vh] border border-solid border-gray-500 p-[5px] flex items-center justify-center overflow-hidden shadow-md">
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <Input
                type="file"
                variant="static"
                accept="image/*"
                onChange={UploadImage}
                className="hidden"
              />
              {item.Item_img ? (
                <img
                  src={item.Item_img}
                  alt="Preview"
                  className="top-0 left-0 max-w-full max-h-full "
                />
              ) : (
                <span className="text-gray-500  ">Upload Image</span>
              )}
            </label>
          </div>
          <Button onClick={()=>setOpenDialogDeleteImage(true)} size={"sm"} className="bg-red-600 flex gap-3"><FaRegTrashAlt/> Delete Image</Button>
        </div>
        {/* input item info component */}
        <div className="h-full flex flex-col lg:w-3/5 w-full gap-6">
          <div className="flex lg:flex-row flex-col w-full gap-5">
            <div className="lg:w-1/2">
              <h1>Item Name</h1>
              <Input
                type="text"
                className="bg-gray-200"
                label={false}
                value={item.Item_name}
                onChange={(e) => setItem({ ...item, Item_name: e.target.value })}
              />
            </div>
            <div className="lg:w-1/2">
                <h1>Item Category</h1>
                <Input
                type="text"
                className="bg-gray-200 "
                value={item.Item_category}
                onChange={(e) =>
                  setItem({ ...item, Item_category: e.target.value })
                }
              />
              
            </div>
          </div>
          <div>
            <h1>Date Found</h1>
            <Datepicker
              asSingle={true}
              value={value}
              useRange={false}
              readOnly={true}
              onChange={(date) => {
                setValue(date);
                setItem({
                  ...item,
                  date_reported: date?.startDate
                    ? dayjs(date.startDate).format("DD-MM-YYYY")
                    : null,
                });
              }}
              primaryColor="blue"
            />
          </div>
          <div>
            <h1>Short Item Description</h1>
            <Input
              type="text"
              className="bg-gray-200"
              value={item.Item_short_desc}
              onChange={(e) =>
                setItem({ ...item, Item_short_desc: e.target.value })
              }
            />
          </div>
          <div>
            <h1>Complete Item Description</h1>
            <Textarea
            className="bg-gray-200 placeholder-gray-500 rounded"
            value={item.Item_detail_desc}
            onChange={(e) =>
              setItem({ ...item, Item_detail_desc: e.target.value })
            }/>
          </div>
          <div className="flex lg:flex-row flex-col w-full gap-5">
            
            <div className="lg:w-1/2">
              <h1>Location Found</h1>
              <Input
              type="text"
              className="bg-gray-200 "
              value={item.location_found}
              onChange={(e) =>
                setItem({ ...item, location_found: e.target.value })
              }
            />
            </div>
            <div className="lg:w-1/2">
              <h1>Located Stored</h1>
              <Input
              type="text"
              className="bg-gray-200 "
              value={item.location_store}
              onChange={(e) =>
                setItem({ ...item, location_store: e.target.value })
              }
            />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-end w-full mb-8 md:mb-0 lg:mb-8">
        <Button
          className="bg-indigo-600 rounded-full px-6 py-2 capitalize flex justify-center items-center gap-2"
          onClick={() => setStatus("AddFounder")}
        >
          Next
        <FaArrowRight />
        </Button>
      </div>
      <Dialog open={openDialogDeleteImage} handler={toggleOpenDialogDeleteImage} size="sm" className="absolute w-[200px]">
            <DialogHeader>Are you sure you want delete this record?</DialogHeader>
            <DialogFooter>
            <Button
                variant="text"
                color="red"
                onClick={toggleOpenDialogDeleteImage}
                className="mr-1"
            >
                <span>Cancel</span>
            </Button>
            <Button variant="text" color="green" onClick={()=>{handleDeleteImage()}}>
                <span>Delete</span>
            </Button>
            </DialogFooter>
        </Dialog>
    </div>
  );
};
