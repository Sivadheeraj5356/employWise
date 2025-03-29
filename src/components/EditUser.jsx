import { useState } from "react";
import { updateUser } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";

const EditUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateUserInList } = useUsers();
  const [userData, setUserData] = useState({ ...state });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await updateUser(userData.id, userData);
      if (response.status === 200) {
        setSuccess(true);
        updateUserInList(userData);
        
        setTimeout(() => {
          navigate("/users");
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error updating user!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit User
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleUpdate}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={userData.first_name}
                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={userData.last_name}
                onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center">User updated successfully!</div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => navigate("/users")}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
