import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import EditUser from "./components/EditUser.jsx";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
