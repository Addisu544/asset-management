import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { assetGroupService } from "../../services/assetGroupService";
import { assetTypeService } from "../../services/assetTypeService";

const ProductFormDialog = ({ open, onClose, onSubmit, product }: any) => {
  const [groups, setGroups] = useState([]);
  const [types, setTypes] = useState([]);

  const [form, setForm] = useState({
    tagNo: "",
    assetGroupId: "",
    assetTypeId: "",
    stockedAt: "",
    imagePath: "",
    brand: "",
    cost: "",
    serialNo: "",
  });

  useEffect(() => {
    const load = async () => {
      const g = await assetGroupService.getAll();
      const t = await assetTypeService.getAll();

      setGroups(g.data);
      setTypes(t.data);
    };

    load();
  }, []);

  useEffect(() => {
    if (product) {
      setForm({
        tagNo: product.tagNo || "",
        assetGroupId: product.assetGroupId || "",
        assetTypeId: product.assetTypeId || "",
        stockedAt: product.stockedAt || "",
        imagePath: product.imagePath || "",
        brand: product.brand || "",
        cost: product.cost || "",
        serialNo: product.serialNo || "",
      });
    }
  }, [product]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredTypes = types.filter(
    (t: any) => t.assetGroupId == form.assetGroupId,
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Tag No"
          name="tagNo"
          value={form.tagNo}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Asset Group"
          name="assetGroupId"
          value={form.assetGroupId}
          onChange={handleChange}
        >
          {groups.map((g: any) => (
            <MenuItem key={g.id} value={g.id}>
              {g.groupName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Asset Type"
          name="assetTypeId"
          value={form.assetTypeId}
          onChange={handleChange}
        >
          {filteredTypes.map((t: any) => (
            <MenuItem key={t.id} value={t.id}>
              {t.typeName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Stocked At"
          name="stockedAt"
          InputLabelProps={{ shrink: true }}
          value={form.stockedAt}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Image Path"
          name="imagePath"
          value={form.imagePath}
          onChange={handleChange}
        />

        <Box sx={{ mt: 2 }}>
          {form.imagePath && (
            <img src={`http://localhost:5055/${form.imagePath}`} width="150" />
          )}
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Cost"
          type="number"
          name="cost"
          value={form.cost}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Serial No"
          name="serialNo"
          value={form.serialNo}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={() => onSubmit(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
