import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import { assetTypeService } from "../../services/assetTypeService";
import { assetGroupService } from "../../services/assetGroupService";
import { useSnackbar } from "../../context/SnackbarContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AssetTypesPage = () => {
  const { showSuccess, showApiError } = useSnackbar();
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);

  const [typeName, setTypeName] = useState("");
  const [assetGroupId, setAssetGroupId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchData = async () => {
    try {
      const typesRes = await assetTypeService.getAll();
      const groupsRes = await assetGroupService.getAll();

      setTypes(typesRes.data);
      setGroups(groupsRes.data);
    } catch (err) {
      showApiError(err, "Failed to load asset types");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const nextErrors: Record<string, string> = {};
    if (!typeName.trim()) nextErrors.typeName = "Type name is required";
    if (!assetGroupId) nextErrors.assetGroupId = "Asset group is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = {
      typeName,
      assetGroupId: Number(assetGroupId),
    };

    setSaving(true);
    try {
      if (selected) {
        await assetTypeService.update(selected.id, body);
        showSuccess("Asset type updated successfully");
      } else {
        await assetTypeService.create(body);
        showSuccess("Asset type created successfully");
      }

      setOpen(false);
      setSelected(null);
      setTypeName("");
      setAssetGroupId("");
      setErrors({});
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to save asset type");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selected) return;
      setConfirmLoading(true);
      await assetTypeService.delete(selected.id);
      setConfirmOpen(false);
      showSuccess("Asset type deleted successfully");
      fetchData();
    } catch (err) {
      showApiError(err, "Failed to delete asset type");
    } finally {
      setConfirmLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },

    { field: "typeName", headerName: "Type Name", flex: 1 },

    {
      field: "groupName",
      headerName: "Group",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Tooltip title="Edit" arrow>
              <IconButton
                size="small"
                onClick={() => {
                  setSelected(row);
                  setTypeName(row.typeName);
                  setAssetGroupId(row.assetGroupId);
                  setOpen(true);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  setSelected(row);
                  setConfirmOpen(true);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
        Create Asset Type
      </Button>

      <DataTable rows={types} columns={columns} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selected ? "Edit Type" : "Create Type"}</DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            margin="dense"
            error={Boolean(errors.typeName)}
            helperText={errors.typeName}
            required
          />

          <TextField
            select
            fullWidth
            label="Asset Group"
            value={assetGroupId}
            onChange={(e) => setAssetGroupId(e.target.value)}
            margin="dense"
            error={Boolean(errors.assetGroupId)}
            helperText={errors.assetGroupId}
            required
          >
            {groups.map((g: any) => (
              <MenuItem key={g.id} value={g.id}>
                {g.groupName}
              </MenuItem>
            ))}
          </TextField>
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
        title="Delete Asset Type"
        message="Are you sure?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        loading={confirmLoading}
      />
    </Box>
  );
};

export default AssetTypesPage;
