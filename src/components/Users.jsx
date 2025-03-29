import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchUsers, deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import "../styles/common.css";

const Users = () => {
  const { users, setUsersList, deleteUserFromList } = useUsers();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users only when page changes
  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetchUsers(page);
        if (isMounted) {
          setLocalUsers(response.data.data);
          setUsersList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [page]); // Remove setUsersList from dependencies

  // Memoize filtered users
  const filteredUsers = useMemo(() => {
    let filtered = [...localUsers];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.first_name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [localUsers, searchTerm]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteUser(id);
      setLocalUsers(prev => prev.filter(user => user.id !== id));
      deleteUserFromList(id);
    } catch (error) {
      alert("Error deleting user!");
    }
  }, [deleteUserFromList]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8 p-1">
        <h2 className="text-2xl font-bold text-gray-900 p-2">User Management</h2>
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              page === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setPage(prev => prev - 1)} 
            disabled={page === 1 || isLoading}
          >
            Previous
          </button>
          <button 
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(2)}
            disabled={isLoading}
          >
            Next
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 text-center">
                <img 
                  src={user.avatar} 
                  alt={user.first_name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {user.email}
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex gap-3">
                <button 
                  className="flex-1 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => navigate(`/edit/${user.id}`, { state: user })}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
