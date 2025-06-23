import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import {
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { FaArrowRight } from "react-icons/fa";

export const AddItemInfo = ({ item, setItem, setStatus, isMobile }) => {
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex flex-col gap-6 lg:flex-row">
        {/* upload image component */}
        <div className="flex flex-col gap-6 w-full basis-1/2">
          <div className="w-full h-[40vh] border border-solid border-black p-[5px] flex items-center justify-center overflow-hidden">
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
                  className="top-0 left-0 max-w-full max-h-full object-cover"
                />
              ) : (
                <span className="text-gray-500  ">Upload Image</span>
              )}
            </label>
          </div>

          <Input
            type="text"
            variant="static"
            label="Item Name"
            value={item.Item_name}
            onChange={(e) => setItem({ ...item, Item_name: e.target.value })}
          />
          <Input
            type="text"
            variant="static"
            label="Item Category"
            value={item.Item_category}
            onChange={(e) =>
              setItem({ ...item, Item_category: e.target.value })
            }
          />
          <Input
            type="text"
            variant="static"
            label="Location Found"
            value={item.location_found}
            onChange={(e) =>
              setItem({ ...item, location_found: e.target.value })
            }
          />
        </div>

        {/* input item info component */}
        <div className="h-full flex flex-col basis-1/2 gap-8">
          {/* date picker component */}
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

          <Input
            type="text"
            variant="static"
            label="Location Store"
            value={item.location_store}
            onChange={(e) =>
              setItem({ ...item, location_store: e.target.value })
            }
          />
          <Textarea
            className="bg-gray-300 placeholder-gray-500 p-[9px] rounded "
            label="Complete Item Description"
            value={item.Item_detail_desc}
            onChange={(e) =>
              setItem({ ...item, Item_detail_desc: e.target.value })
            }
          />
          <Input
            type="text"
            variant="static"
            label="Short Item Description"
            value={item.Item_short_desc}
            onChange={(e) =>
              setItem({ ...item, Item_short_desc: e.target.value })
            }
          />
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
    </div>
  );
};
