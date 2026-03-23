import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { assetGroupService } from "../../services/assetGroupService";
import { useSnackbar } from "../../context/SnackbarContext";

const AssetGroupsPage = () => {
  const { showSuccess, showApiError } = useSnackbar();
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await assetGroupService.getAll();
      setGroups(res.data);
    } catch (err) {
      showApiError(err, "Failed to load asset groups");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const nextErrors: Record<string, string> = {};
    if (!groupName.trim()) nextErrors.groupName = "Group name is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      if (selected) {
        await assetGroupService.update(selected.id, { groupName });
        showSuccess("Asset group updated successfully");
      } else {
        await assetGroupService.create({ groupName });
        showSuccess("Asset group created successfully");
      }

      setOpen(false);
      setSelected(null);
      setGroupName("");
      setErrors({});
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to save asset group");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selected) return;
      await assetGroupService.delete(selected.id);
      setConfirmOpen(false);
      showSuccess("Asset group deleted successfully");
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to delete asset group");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    { field: "groupName", headerName: "Group Name", flex: 1 },

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
                setGroupName(row.groupName);
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
        Create Asset Group
      </Button>

      <DataTable rows={groups} columns={columns} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selected ? "Edit Group" : "Create Group"}</DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="dense"
            error={Boolean(errors.groupName)}
            helperText={errors.groupName}
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
        title="Delete Group"
        message="Are you sure?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default AssetGroupsPage;
