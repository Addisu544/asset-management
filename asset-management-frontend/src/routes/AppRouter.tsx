// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "../pages/Login";
// import ProtectedRoute from "./ProtectedRoute";

// const Dashboard = () => <h1>Dashboard</h1>;
// const UserPage = () => <h1>User Page</h1>;

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute>
//               <UserPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
import Dashboard from "../components/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
