import React, { useEffect, useState } from "react";

const Profile = () => {

    const [user, setUser] = useState({
        
    })


  useEffect(() => {
  }, []);

  return (
    <div className="w-[90%] flex inline gap-5">
        <div className="w-[50%] h-screen border border-black ">
            {/* profile picture */}
            <div>
                <div className="w-[250px] h-[250px] mx-auto mt-10 rounded-full overflow-hidden border border-black">
                    <img 
                    className="w-full h-full object-cover"
                    src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                    />
                </div>
                <table className="mx-auto">
                    <tr>
                        <td>Username:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            

        </div>
        <div className="w-[50%] h-screen border border-black ">

        </div>
    </div>
  );
};

export default Profile;
