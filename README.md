# EmployWise Assignment

## Overview
This React application integrates with the [Reqres API](https://reqres.in/) to perform basic user management functions, including authentication, listing users, and editing or deleting users.

## Features
- **Authentication Screen**: Users can log in with provided credentials.
- **Users List**: Displays a paginated list of users fetched from the API.
- **User Management**:
  - Edit user details (first name, last name, email).
  - Delete users from the list.
- **Pagination**: Navigate through different pages of users.
- **Bonus Features**:
  - Client-side search and filtering.
  - React Router for navigation.
  - Hosted version (if applicable).

## Technologies Used
- **Frontend**: React, Vite
- **State Management**: useState, useEffect (React Hooks)
- **API Requests**: Axios
- **UI Framework**: Tailwind CSS (or Bootstrap/Material-UI if used)
- **Routing**: React Router
- **Persistence**: Local Storage

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** (comes with Node.js) or **yarn**

### Steps to Run the Project
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-github-username/employwise.git
   cd employwise
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Start the Development Server**
   ```sh
   npm run dev
   ```
   This will start the application at `http://localhost:5173/` (or another port if occupied).

4. **Build for Production**
   ```sh
   npm run build
   ```

5. **Preview Production Build**
   ```sh
   npm run preview
   ```

---

## API Endpoints Used

### Authentication (Login)
- **POST** `/api/login`
  - Email: `eve.holt@reqres.in`
  - Password: `cityslicka`
  - Response: `{ "token": "QpwL5tke4Pnpja7X4" }`

### Fetch Users (Paginated List)
- **GET** `/api/users?page=1`

### Update User
- **PUT** `/api/users/{id}`

### Delete User
- **DELETE** `/api/users/{id}`

---

## Folder Structure
```
/employwise
│── public/             # Static assets
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (LoginPage, UsersPage, etc.)
│   ├── hooks/          # Custom hooks (if any)
│   ├── services/       # API service calls
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│── .gitignore
│── package.json
│── vite.config.js
│── tailwind.config.js  # Tailwind setup (if used)
│── README.md           # Project documentation
```

---

## Assumptions & Considerations
- The application uses **local storage** to persist the authentication token.
- Pagination is implemented using API pagination (`page=1, page=2, ...`).
- If the token is missing or expired, the user is redirected to the login page.
- UI is designed to be responsive for both mobile and desktop.

---

## Deployment
To deploy the application on **Vercel**:
1. **Build the project:**
   ```sh
   npm run build
   ```
2. **Deploy using Vercel CLI (Example)**:
   ```sh
   npm install -g vercel
   vercel
   ```

---

## Author
- **Siva Dheeraj**
- [GitHub Profile](https://github.com/Sivadheeraj5356)

---


---


