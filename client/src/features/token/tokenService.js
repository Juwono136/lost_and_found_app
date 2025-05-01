import axios from "axios";
const BASE = import.meta.env.VITE_USER_API_URL;

const tokenService = {
  refreshToken: () =>
    axios.post(`${BASE}/refresh_token`, {}, { withCredentials:true })
         .then(res => res.data),
};

export default tokenService;
