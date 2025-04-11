const axios = require("axios");
const USER_API_URL = process.env.USER_API_URL;  

// Sign up a new user
exports.signup = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL}/signup`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Sign in an existing user
exports.signin = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL}/signin`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Refresh authentication token
exports.refreshToken = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL}/refresh_token`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user information
exports.getCurrentUser = async (req, res) => {
  try {
    const response = await axios.get(`${USER_API_URL}/user_infor`);
    res.status(response.status).json({ data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ data: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Get information on all users
exports.getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${USER_API_URL}/all_infor`);
    res.status(response.status).json({ data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ data: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Logout a user
exports.logout = async (req, res) => {
  try {
    const response = await axios.get(`${USER_API_URL}/logout`);
    res.status(response.status).json({ message: "User logged out successfully", data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ message: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot password (request password reset)
exports.forgotPassword = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL}/forgot`, req.body);
    res.status(response.status).json({ message: "Password reset request processed", data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ message: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const response = await axios.put(`${USER_API_URL}/update_user`, req.body);
    res.status(response.status).json({ message: "User updated successfully", data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ message: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const response = await axios.post(`${USER_API_URL}/reset`, req.body);
    res.status(response.status).json({ message: "Password reset successfully", data: response.data });
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json({ message: error.response.data });
    else res.status(500).json({ message: "Internal server error" });
  }
};