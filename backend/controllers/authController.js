const axios = require("axios");
const USER_API_URL  = process.env.USER_API_URL ;

exports.signup = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL }/signup`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL }/signin`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL }/refresh_token`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};
