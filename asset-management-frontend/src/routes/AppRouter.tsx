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
import EmployeesPage from "../pages/employees/EmployeesPage";
import ProtectedRoute from "./ProtectedRoute";
import AssetGroupsPage from "../pages/masterdata/AssetGroupsPage";
import AssetTypesPage from "../pages/masterdata/AssetTypesPage";
import DepartmentsPage from "../pages/masterdata/DepartmentsPage";
import ProductsPage from "../pages/products/ProductsPage";
import ProductFormDialog from "../pages/products/ProductFormDialog";
import ProductDetailsDialog from "../pages/products/ProductDetailsDialog";
import TransactionPage from "../pages/transactions/TransactionPage";

import ProfilePage from "../pages/user/ProfilePage";
import MyTransactionsPage from "../pages/user/MyTransactionsPage";
import MyPropertiesPage from "../pages/user/MyPropertiesPage";
import MainLayout from "../components/layout/MainLayout";
import LayoutWrapper from "../components/layout/LayoutWrapper";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

<Route
          element={
            <ProtectedRoute>
              <LayoutWrapper />
            </ProtectedRoute>
          }
        >
        <Route path="/users" element={<EmployeesPage />} />
        <Route path="/asset-groups" element={<AssetGroupsPage />} />
        <Route path="/asset-types" element={<AssetTypesPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/departments" element={<ProductFormDialog />} />
        <Route path="/departments" element={<ProductDetailsDialog />} />

        <Route path="/transactions" element={<TransactionPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mytransactions" element={<MyTransactionsPage />} />
        <Route path="/myproperties" element={<MyPropertiesPage />} />

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
                </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
