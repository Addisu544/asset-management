// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useState, useEffect } from "react";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
//   employee?: any;
// }

// const EmployeeFormDialog = ({ open, onClose, onSubmit, employee }: Props) => {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//   });

//   useEffect(() => {
//     if (employee) {
//       setForm({
//         fullName: employee.fullName,
//         email: employee.email,
//       });
//     }
//   }, [employee]);

//   const handleChange = (e: any) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = () => {
//     onSubmit(form);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth>
//       <DialogTitle>
//         {employee ? "Edit Employee" : "Create Employee"}
//       </DialogTitle>

//       <DialogContent>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Full Name"
//           name="fullName"
//           value={form.fullName}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//         />
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>

//         <Button variant="contained" onClick={handleSubmit}>
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EmployeeFormDialog;

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  employee?: any;
}

const EmployeeFormDialog = ({ open, onClose, onSubmit, employee }: Props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    departmentId: 1,
    title: "",
    level: "",
    phone: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    if (employee) {
      const names = employee.fullName?.split(" ") || [];

      setForm({
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        departmentId: employee.departmentId || 1,
        title: employee.title || "",
        level: employee.level || "",
        phone: employee.phone || "",
        role: employee.role || "",
        status: employee.status || "Active",
      });
    }
  }, [employee]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {employee ? "Edit Employee" : "Create Employee"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Level"
          name="level"
          value={form.level}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Department ID"
          name="departmentId"
          type="number"
          value={form.departmentId}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="AssetManager">AssetManager</option>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
