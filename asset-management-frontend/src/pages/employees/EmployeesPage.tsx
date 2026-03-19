import { useEffect, useState } from "react";
import { Button, Box, Avatar } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmployeeFormDialog from "./EmployeeFormDialog";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";
import { employeeService } from "../../services/employeeService";
// import { useAuth } from "../../contexts/AuthContext";
import { useAuth } from "../../context/AuthContext";

const EmployeesPage = () => {
  const { currentUser } = useAuth();

  const [employees, setEmployees] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const fetchEmployees = async () => {
    const res = await employeeService.getAll();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async (data: any) => {
    await employeeService.create(data);
    setOpenForm(false);
    fetchEmployees();
  };

  const handleUpdate = async (data: any) => {
    await employeeService.update(selectedEmployee.id, data);
    setOpenForm(false);
    fetchEmployees();
  };
  const handleToggleStatus = async () => {
    if (!selectedEmployee) return;
    const newStatus =
      selectedEmployee.status === "Active" ? "Inactive" : "Active";
    await employeeService.changeStatus(selectedEmployee.id, {
      status: newStatus,
    });
    setConfirmOpen(false);
    fetchEmployees();
  };

  // 🔹 Columns definition
  const columns = [
    {
      field: "image",
      headerName: "Profile",
      width: 100,
      sortable: false,
      renderCell: (params: any) => {
        const employee = params.row;

        return (
          <Avatar
            src={
              employee.imagePath
                ? `http://localhost:5055/${employee.imagePath}`
                : ""
            }
            alt={employee.fullName}
            sx={{ width: 40, height: 40 }}
          />
        );
      },
    },
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "title", headerName: "Title", width: 160 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (params: any) => <StatusBadge status={params.value} />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => <StatusBadge status={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params: any) => {
        const employee = params.row;
        const isActive = employee.status === "Active";
        const toggleLabel = isActive ? "Deactivate" : "Activate";
        const toggleColor = isActive ? "error" : "success";

        return (
          <Box>
            <Button
              size="small"
              onClick={() => {
                setSelectedEmployee(employee);
                setOpenDetails(true);
              }}
            >
              View
            </Button>

            {currentUser?.role === "AssetManager" && (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setOpenForm(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color={toggleColor}
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setConfirmOpen(true);
                  }}
                >
                  {toggleLabel}
                </Button>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {currentUser?.role === "AssetManager" && (
        // <Button
        //   variant="contained"
        //   sx={{ mb: 2 }}
        //   onClick={() => setOpenForm(true)}
        // >
        //   Create Employee
        // </Button>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => {
            setSelectedEmployee(null); // ✅ VERY IMPORTANT
            setOpenForm(true);
          }}
        >
          Create Employee
        </Button>
      )}

      <DataTable rows={employees} columns={columns} />

      <EmployeeFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={selectedEmployee ? handleUpdate : handleCreate}
        employee={selectedEmployee}
      />

      <EmployeeDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        employee={selectedEmployee}
      />

      {/* <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Employee"
        message="Are you sure?"
      /> */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleToggleStatus}
        title={
          selectedEmployee?.status === "Active"
            ? "Deactivate Employee"
            : "Activate Employee"
        }
        message="Are you sure?"
      />
    </Box>
  );
};

export default EmployeesPage;
