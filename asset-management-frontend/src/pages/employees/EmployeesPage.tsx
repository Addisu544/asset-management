import { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
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

  const handleDeactivate = async () => {
    await employeeService.changeStatus(selectedEmployee.id);
    setConfirmOpen(false);
    fetchEmployees();
  };

  //   const columns = [
  //     { field: "id", headerName: "ID", width: 80 },

  //     { field: "fullName", headerName: "Name", flex: 1 },

  //     { field: "email", headerName: "Email", flex: 1 },

  //     {
  //       field: "status",
  //       headerName: "Status",
  //       width: 150,
  //       renderCell: (params: any) => <StatusBadge status={params.value} />,
  //     },

  //     {
  //       field: "actions",
  //       headerName: "Actions",
  //       width: 250,
  //       renderCell: (params: any) => {
  //         const employee = params.row;

  //         return (
  //           <Box>
  //             <Button
  //               size="small"
  //               onClick={() => {
  //                 setSelectedEmployee(employee);
  //                 setOpenDetails(true);
  //               }}
  //             >
  //               View
  //             </Button>

  //             {currentUser?.role === "AssetManager" && (
  //               <>
  //                 <Button
  //                   size="small"
  //                   onClick={() => {
  //                     setSelectedEmployee(employee);
  //                     setOpenForm(true);
  //                   }}
  //                 >
  //                   Edit
  //                 </Button>

  //                 <Button
  //                   size="small"
  //                   color="error"
  //                   onClick={() => {
  //                     setSelectedEmployee(employee);
  //                     setConfirmOpen(true);
  //                   }}
  //                 >
  //                   Deactivate
  //                 </Button>
  //               </>
  //             )}
  //           </Box>
  //         );
  //       },
  //     },
  //   ];

  const columns = [
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
                  color="error"
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setConfirmOpen(true);
                  }}
                >
                  Deactivate
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
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setOpenForm(true)}
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

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeactivate}
        title="Deactivate Employee"
        message="Are you sure?"
      />
    </Box>
  );
};

export default EmployeesPage;
