import axios from "axios";
const BASE = import.meta.env.VITE_USER_API_URL; 


console.log("🔹 authService BASE URL =", BASE);

const authService = {
  signup: (userData) =>
    axios.post(`${BASE}/signup`, userData, { withCredentials:true })
         .then(res => res.data),

  signin: (creds) =>
    axios.post(`${BASE}/signin`, creds, { withCredentials:true })
         .then(res => res.data),

  logout: () =>
    axios.get(`${BASE}/logout`, { withCredentials:true })
         .then(res => res.data),

  forgotPassword: ({ email }) =>
    axios.post(`${BASE}/forgot`, { email }, { withCredentials:true })
         .then(res => res.data),

    selectRole: ({ userId, selectedRole }) =>
       axios
         .post(`${BASE}/select-role`, { userId, selectedRole }, { withCredentials: true })
         .then(res => res.data),
};

export default authService;
