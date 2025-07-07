import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../features/auth/authService';
import { ROLE_LABEL } from '../../constants/roles';

export default function SelectRoleScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Pull roles array and userId out of the router state
  const { roles = [], userId } = state || {};

  // If we don’t have roles or ID, send them back to login
  useEffect(() => {
    if (!roles.length || !userId) {
      navigate('/login');
    }
  }, [roles, userId, navigate]);

  const [selectedRole, setSelectedRole] = useState(roles[0] || null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {   
      await authService.selectRole({ userId, selectedRole });
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {roles.map((role) => (
            <div key={role} className="flex items-center">
              <input
                id={`role-${role}`}
                name="role"
                type="radio"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="mr-2"
              />
              <label htmlFor={`role-${role}`} className="cursor-pointer">
                {ROLE_LABEL[role] || `Role ${role}`}
              </label>
            </div>
          ))}

          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
