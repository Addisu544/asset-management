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
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { departmentService } from "../../services/departmentService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<any> | any;
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
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });

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
  const handleSubmit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";

    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Enter a valid email";

    if (!form.userId.trim()) nextErrors.userId = "UserId is required";
    if (!isEdit && !form.password.trim())
      nextErrors.password = "Password is required";

    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.level.trim()) nextErrors.level = "Level is required";
    if (!form.departmentId) nextErrors.departmentId = "Department is required";
    if (!form.role.trim()) nextErrors.role = "Role is required";
    if (!form.status.trim()) nextErrors.status = "Status is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

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

    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {isEdit ? "Edit Employee" : "Create Employee"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="UserId"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              error={Boolean(errors.userId)}
              helperText={errors.userId}
              required
            />

            {!isEdit && (
              <TextField
                fullWidth
                margin="dense"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password}
                required
              />
            )}

            <TextField
              fullWidth
              margin="dense"
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
              required
            />

            <TextField
              select
              fullWidth
              margin="dense"
              label="Level"
              name="level"
              value={form.level}
              onChange={handleChange}
              SelectProps={{ native: true }}
              error={Boolean(errors.level)}
              helperText={errors.level}
              required
            >
              <option value=""></option>
              <option value="Junior">Junior</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Senior">Senior</option>
            </TextField>

            <TextField
              select
              fullWidth
              margin="dense"
              label="Department"
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              SelectProps={{ native: true }}
              error={Boolean(errors.departmentId)}
              helperText={errors.departmentId}
              required
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
              margin="dense"
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              SelectProps={{ native: true }}
              error={Boolean(errors.role)}
              helperText={errors.role}
              required
            >
              <option value=""></option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="AssetManager">AssetManager</option>
            </TextField>

            <TextField
              select
              fullWidth
              margin="dense"
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              SelectProps={{ native: true }}
              error={Boolean(errors.status)}
              helperText={errors.status}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </TextField>

            <Box sx={{ mt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Image (optional)
              </Typography>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {form.imageFile && (
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <img
                    src={URL.createObjectURL(form.imageFile)}
                    width={120}
                    style={{ display: "block", objectFit: "cover" }}
                  />
                </Box>
              )}

              {!form.imageFile && form.imagePath && (
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <img
                    src={`http://localhost:5055/${form.imagePath}`}
                    width={120}
                    style={{ display: "block", objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "space-between" }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <CircularProgress size={18} sx={{ color: "common.white", mr: 1 }} />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
