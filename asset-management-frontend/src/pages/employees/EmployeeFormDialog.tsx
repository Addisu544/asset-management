// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { departmentService } from "../../services/departmentService";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
//   employee?: any;
// }

// const EmployeeFormDialog = ({ open, onClose, onSubmit, employee }: Props) => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     departmentId: 1,
//     title: "",
//     level: "",
//     phone: "",
//     role: "",
//     status: "Active",
//     email: "",
//     Password: "",
//     userId: "",
//   });

//   const [departments, setDepartments] = useState<any[]>([]);

//   useEffect(() => {
//     if (employee) {
//       const names = employee.fullName?.split(" ") || [];

//       setForm({
//         firstName: names[0] || "",
//         lastName: names.slice(1).join(" ") || "",
//         departmentId: employee.departmentId || "",
//         title: employee.title || "",
//         level: employee.level || "",
//         phone: employee.phone || "",
//         role: employee.role || "",
//         status: employee.status || "Active",
//         email: employee.email || "",
//         Password: employee.Password || "",
//         userId: employee.userId || "",
//       });
//     }
//   }, [employee]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       const res = await departmentService.getAll();
//       setDepartments(res.data);
//     };

//     fetchDepartments();
//   }, []);

//   // const handleChange = (e: any) => {
//   //   setForm({
//   //     ...form,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: name === "departmentId" ? Number(value) : value,
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
//           label="First Name"
//           name="firstName"
//           value={form.firstName}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Email"
//           name="Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="UserId"
//           name="UserId"
//           value={form.userId}
//           onChange={handleChange}
//         />

//         {/* <TextField
//           fullWidth
//           margin="normal"
//           label="Password"
//           name="Password"
//           value={form.Password}
//           onChange={handleChange}
//         /> */}

//         {employee ? null : (
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Password"
//             name="Password"
//             value={form.Password}
//             onChange={handleChange}
//           />
//         )}

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Last Name"
//           name="lastName"
//           value={form.lastName}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Phone"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Title"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//         />

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Level"
//           name="level"
//           value={form.level}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//         >
//           <option value=""></option>
//           <option value="Junior">Junior</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Senior">Senior</option>
//         </TextField>

//         {/* <TextField
//           fullWidth
//           margin="normal"
//           label="Department ID"
//           name="departmentId"
//           type="number"
//           value={form.departmentId}
//           onChange={handleChange}
//         /> */}

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Department"
//           name="departmentId"
//           value={form.departmentId}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//         >
//           <option value=""></option>

//           {departments.map((dept) => (
//             <option key={dept.id} value={dept.id}>
//               {dept.name}
//             </option>
//           ))}
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Role"
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//         >
//           <option value=""></option>
//           <option value="Employee">Employee</option>
//           <option value="Manager">Manager</option>
//           <option value="AssetManager">AssetManager</option>
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Status"
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//         >
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </TextField>
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
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { departmentService } from "../../services/departmentService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  employee?: any;
}

const EmployeeFormDialog = ({ open, onClose, onSubmit, employee }: Props) => {
  const initialForm = {
    firstName: "",
    lastName: "",
    departmentId: 1,
    title: "",
    level: "",
    phone: "",
    role: "",
    status: "Active",
    email: "",
    password: "",
    userId: "",
    imageFile: null as File | null,
    imagePath: "",
  };

  const [form, setForm] = useState(initialForm);
  const [departments, setDepartments] = useState<any[]>([]);

  const isEdit = !!employee?.id;

  // ✅ RESET / PREFILL
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
        email: employee.email || "",
        password: "",
        userId: employee.userId || "",
        imageFile: null,
        imagePath: employee.imagePath || "", // ✅ important
      });
    } else {
      setForm(initialForm); // ✅ FIX create reset
    }
  }, [employee]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await departmentService.getAll();
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "departmentId" ? Number(value) : value,
    });
  };

  // ✅ IMAGE CHANGE
  const handleFileChange = (e: any) => {
    setForm({
      ...form,
      imageFile: e.target.files[0],
      imagePath: "", // remove old preview
    });
  };

  // ✅ SUBMIT WITH FORMDATA
  const handleSubmit = () => {
    const data = new FormData();

    data.append("FirstName", form.firstName);
    data.append("LastName", form.lastName);
    data.append("DepartmentId", form.departmentId.toString());
    data.append("Title", form.title);
    data.append("Level", form.level);
    data.append("Phone", form.phone);
    data.append("Role", form.role);
    data.append("Status", form.status);
    data.append("Email", form.email);
    data.append("UserId", form.userId);

    if (!isEdit) {
      data.append("Password", form.password); // only on create
    }

    if (form.imageFile) {
      data.append("Image", form.imageFile);
    }

    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? "Edit Employee" : "Create Employee"}</DialogTitle>

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
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="UserId"
          name="userId"
          value={form.userId}
          onChange={handleChange}
        />

        {!isEdit && (
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        )}

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
          select
          fullWidth
          margin="normal"
          label="Level"
          name="level"
          value={form.level}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          <option value="Junior">Junior</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Senior">Senior</option>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Department"
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </TextField>

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

        {/* ✅ IMAGE INPUT */}
        <Box mt={2}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>

        {/* ✅ IMAGE PREVIEW */}
        <Box mt={2}>
          {form.imageFile && (
            <img src={URL.createObjectURL(form.imageFile)} width={120} />
          )}

          {!form.imageFile && form.imagePath && (
            <img src={`http://localhost:5055/${form.imagePath}`} width={120} />
          )}
        </Box>
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
