import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const updateUserInList = (updatedUser) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUserFromList = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const setUsersList = (newUsers) => {
    setUsers(newUsers);
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      updateUserInList, 
      deleteUserFromList, 
      setUsersList 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}; 