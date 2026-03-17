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
} from "@mui/material";

import DataTable from "../../components/common/DataTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import { assetTypeService } from "../../services/assetTypeService";
import { assetGroupService } from "../../services/assetGroupService";

const AssetTypesPage = () => {
  const [types, setTypes] = useState([]);
  const [groups, setGroups] = useState([]);

  const [typeName, setTypeName] = useState("");
  const [assetGroupId, setAssetGroupId] = useState("");

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const fetchData = async () => {
    const typesRes = await assetTypeService.getAll();
    const groupsRes = await assetGroupService.getAll();

    setTypes(typesRes.data);
    setGroups(groupsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const body = {
      typeName,
      assetGroupId: Number(assetGroupId),
    };

    if (selected) await assetTypeService.update(selected.id, body);
    else await assetTypeService.create(body);

    setOpen(false);
    setSelected(null);
    setTypeName("");
    setAssetGroupId("");
    fetchData();
  };

  const handleDelete = async () => {
    await assetTypeService.delete(selected.id);
    setConfirmOpen(false);
    fetchData();
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
          <Box>
            <Button
              size="small"
              onClick={() => {
                setSelected(row);
                setTypeName(row.typeName);
                setAssetGroupId(row.assetGroupId);
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
        Create Asset Type
      </Button>

      <DataTable rows={types} columns={columns} />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selected ? "Edit Type" : "Create Type"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Type Name"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            select
            fullWidth
            label="Asset Group"
            value={assetGroupId}
            onChange={(e) => setAssetGroupId(e.target.value)}
            sx={{ mt: 2 }}
          >
            {groups.map((g: any) => (
              <MenuItem key={g.id} value={g.id}>
                {g.groupName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Asset Type"
        message="Are you sure?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default AssetTypesPage;
