import { useEffect, useState } from "react";

const useUserRole = (userId) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userId) {
      if (userId === 4) {
        setRole("admin");
      } else {
        setRole("staff");
      }
    }
  }, [userId]);

  return role;
};

export default useUserRole;
