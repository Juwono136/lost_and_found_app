import React, { useState } from "react";

const RegisterScreen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    binusianID: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Proceed to the next step
  const handleNextStep = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2); // Move to verification step
  };

  // Handle final form submission
  const handleFormSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-6">
      {step === 1 ? (
        <div className="w-full max-w-sm">
          {/* First Page - Registration Form */}
          <h1 className="text-3xl font-bold mb-6">Register</h1>
          <p className="mb-6 text-gray-700">
            Create an account by filling the details below.
          </p>

          {/* Email */}
          <div className="mb-4 relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Name */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-4 relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Binusian ID */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="binusianID"
              value={formData.binusianID}
              onChange={handleInputChange}
              placeholder="Binusian ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextStep}
            className="w-full py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Next
          </button>

          <p className="mt-4 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm">
          {/* Second Page - Verification Code */}
          <h1 className="text-3xl font-bold mb-6">Register</h1>
          <p className="mb-6 text-gray-700">
            We have sent an email to your account with a verification code!
          </p>

          {/* Verification Code */}
          <div className="mb-4 relative">
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              placeholder="Verification Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleFormSubmit}
            className="w-full py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
