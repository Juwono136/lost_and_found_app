import axios from "axios";
const BASE = import.meta.env.VITE_USER_API_URL;

const userService = {
  getCurrentUser: () =>
    axios.get(`${BASE}/user_infor`, { withCredentials:true })
         .then(res => res.data),

  getAllUsers: () =>
    axios.get(`${BASE}/all_infor`, { withCredentials:true })
         .then(res => res.data),

  updateUser: (data) =>
    axios.put(`${BASE}/update_user`, data, { withCredentials:true })
         .then(res => res.data),
};

export default userService;
