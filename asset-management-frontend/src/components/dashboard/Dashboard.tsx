import { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
// import MainLayout from "../layout/MainLayout";

interface Product {
  id: number;
  status: "Free" | "Taken";
}

interface Employee {
  id: number;
  status: "Active" | "Inactive";
}

interface Transaction {
  id: number;
}

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { request, loading } = useApi();

  const [products, setProducts] = useState<Product[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await request({
          url: "/Products",
          method: "GET",
        });
        const employeesRes = await request({
          url: "/Employees",
          method: "GET",
        });
        const transactionsRes = await request({
          url: "/Transactions",
          method: "GET",
        });

        setProducts(productsRes || []);
        setEmployees(employeesRes || []);
        setTransactions(transactionsRes || []);
      } catch (err: any) {
        setError(err?.message || "Error fetching dashboard data");
      }
    };

    fetchData();
  }, [request]);

  // Employee role view
  if (currentUser?.role === "Employee") {
    return (
      // <MainLayout>
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h4">Asset Management System</Typography>
        </Box>
      // </MainLayout>
      // <h1>aa</h1>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Compute statistics
  const totalProducts = products.length;
  const freeProducts = products.filter((p) => p.status === "Free").length;
  const takenProducts = products.filter((p) => p.status === "Taken").length;

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "Active").length;

  const totalTransactions = transactions.length;

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard title="Total Products" value={totalProducts} />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard
              title="Free Products"
              value={freeProducts}
              color="success"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard
              title="Taken Products"
              value={takenProducts}
              color="warning"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard title="Total Employees" value={totalEmployees} />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard
              title="Active Employees"
              value={activeEmployees}
              color="success"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DashboardCard
              title="Total Transactions"
              value={totalTransactions}
              color="info"
            />
          </Grid>
        </Grid>
      </Box>
  );
};

export default Dashboard;
