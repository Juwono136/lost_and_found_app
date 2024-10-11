import { useEffect, useState } from "react";

const useUserRole = (userId) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userId) {
      if (userId % 2 === 0) {
        setRole("admin");
      } else {
        setRole("security");
      }
    }
  }, [userId]);

  return role;
};

export default useUserRole;
