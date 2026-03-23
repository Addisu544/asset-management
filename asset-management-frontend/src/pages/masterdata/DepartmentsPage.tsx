import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  CircularProgress,
} from "@mui/material";
import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { departmentService } from "../../services/departmentService";
import { useSnackbar } from "../../context/SnackbarContext";

const DepartmentsPage = () => {
  const { showSuccess, showApiError } = useSnackbar();
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await departmentService.getAll();
      setDepartments(res.data);
    } catch (err) {
      showApiError(err, "Failed to load departments");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Department name is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      if (selected) {
        await departmentService.update(selected.id, { name });
        showSuccess("Department updated successfully");
      } else {
        await departmentService.create({ name });
        showSuccess("Department created successfully");
      }

      setOpen(false);
      setSelected(null);
      setName("");
      setErrors({});
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to save department");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selected) return;
      await departmentService.delete(selected.id);
      setConfirmOpen(false);
      showSuccess("Department deleted successfully");
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to delete department");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    { field: "name", headerName: "Department Name", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <Box>
            <Button
              size="small"
              onClick={() => {
                setSelected(row);
                setName(row.name);
                setOpen(true);
              }}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              onClick={() => {
                setSelected(row);
                setConfirmOpen(true);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Create Department
      </Button>

      <DataTable rows={departments} columns={columns} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {selected ? "Edit Department" : "Create Department"}
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
          />
          </Paper>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "space-between" }}>
          <Button onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <CircularProgress
                  size={18}
                  sx={{ color: "common.white", mr: 1 }}
                />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Department"
        message="Are you sure?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default DepartmentsPage;
