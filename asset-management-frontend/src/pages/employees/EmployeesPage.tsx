import { useEffect, useState } from "react";
import { Button, Box, Avatar, IconButton, Tooltip } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmployeeFormDialog from "./EmployeeFormDialog";
import EmployeeDetailsDialog from "./EmployeeDetailsDialog";
import { employeeService } from "../../services/employeeService";
// import { useAuth } from "../../contexts/AuthContext";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/SnackbarContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const EmployeesPage = () => {
  const { currentUser } = useAuth();
  const { showSuccess, showApiError } = useSnackbar();

  const [employees, setEmployees] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const fetchEmployees = async () => {
    try {
      const res = await employeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      showApiError(err, "Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await employeeService.create(data);
      setOpenForm(false);
      showSuccess("Employee created successfully");
      fetchEmployees();
    } catch (err) {
      showApiError(err, "Failed to create employee");
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      if (!selectedEmployee) return;
      await employeeService.update(selectedEmployee.id, data);
      setOpenForm(false);
      showSuccess("Employee updated successfully");
      fetchEmployees();
    } catch (err) {
      showApiError(err, "Failed to update employee");
    }
  };
  const handleToggleStatus = async () => {
    if (!selectedEmployee) return;
    const newStatus =
      selectedEmployee.status === "Active" ? "Inactive" : "Active";

    try {
      setConfirmLoading(true);
      await employeeService.changeStatus(selectedEmployee.id, {
        status: newStatus,
      });
      setConfirmOpen(false);
      showSuccess(`Employee status updated to ${newStatus}`);
      fetchEmployees();
    } catch (err) {
      showApiError(err, "Failed to update employee status");
    } finally {
      setConfirmLoading(false);
    }
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="View" arrow>
              <IconButton
                size="small"
                onClick={() => {
                  setSelectedEmployee(employee);
                  setOpenDetails(true);
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {currentUser?.role === "AssetManager" && (
              <>
                <Tooltip title="Edit" arrow>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setOpenForm(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={toggleLabel} arrow>
                  <IconButton
                    size="small"
                    color={toggleColor}
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setConfirmOpen(true);
                    }}
                  >
                    <PowerSettingsNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
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
        loading={confirmLoading}
      />
    </Box>
  );
};

export default EmployeesPage;
