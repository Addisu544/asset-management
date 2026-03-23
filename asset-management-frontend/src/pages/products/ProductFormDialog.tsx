// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Box,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { assetGroupService } from "../../services/assetGroupService";
// import { assetTypeService } from "../../services/assetTypeService";

// const ProductFormDialog = ({ open, onClose, onSubmit, product }: any) => {
//   const [groups, setGroups] = useState([]);
//   const [types, setTypes] = useState([]);

//   const [form, setForm] = useState({
//     tagNo: "",
//     assetGroupId: "",
//     assetTypeId: "",
//     stockedAt: "",
//     imagePath: "",
//     brand: "",
//     cost: "",
//     serialNo: "",
//   });

//   useEffect(() => {
//     const load = async () => {
//       const g = await assetGroupService.getAll();
//       const t = await assetTypeService.getAll();

//       setGroups(g.data);
//       setTypes(t.data);
//     };

//     load();
//   }, []);

//   useEffect(() => {
//     if (product) {
//       setForm({
//         tagNo: product.tagNo || "",
//         assetGroupId: product.assetGroupId || "",
//         assetTypeId: product.assetTypeId || "",
//         stockedAt: product.stockedAt || "",
//         imagePath: product.imagePath || "",
//         brand: product.brand || "",
//         cost: product.cost || "",
//         serialNo: product.serialNo || "",
//       });
//     }
//   }, [product]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const filteredTypes = types.filter(
//     (t: any) => t.assetGroupId == form.assetGroupId,
//   );

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle>

//       <DialogContent>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Tag No"
//           name="tagNo"
//           value={form.tagNo}
//           onChange={handleChange}
//         />

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Asset Group"
//           name="assetGroupId"
//           value={form.assetGroupId}
//           onChange={handleChange}
//         >
//           {groups.map((g: any) => (
//             <MenuItem key={g.id} value={g.id}>
//               {g.groupName}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Asset Type"
//           name="assetTypeId"
//           value={form.assetTypeId}
//           onChange={handleChange}
//         >
//           {filteredTypes.map((t: any) => (
//             <MenuItem key={t.id} value={t.id}>
//               {t.typeName}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           fullWidth
//           margin="normal"
//           type="date"
//           label="Stocked At"
//           name="stockedAt"
//           InputLabelProps={{ shrink: true }}
//           value={form.stockedAt}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Image Path"
//           name="imagePath"
//           value={form.imagePath}
//           onChange={handleChange}
//         />

//         <Box sx={{ mt: 2 }}>
//           {form.imagePath && (
//             <img src={`http://localhost:5055/${form.imagePath}`} width="150" />
//           )}
//         </Box>

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Brand"
//           name="brand"
//           value={form.brand}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Cost"
//           type="number"
//           name="cost"
//           value={form.cost}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Serial No"
//           name="serialNo"
//           value={form.serialNo}
//           onChange={handleChange}
//         />
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>

//         <Button variant="contained" onClick={() => onSubmit(form)}>
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ProductFormDialog;

// type AssetGroup = {
//   id: number;
//   groupName: string;
// };

// type AssetType = {
//   id: number;
//   typeName: string;
//   assetGroupId: number;
// };

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   Box,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { assetGroupService } from "../../services/assetGroupService";
// import { assetTypeService } from "../../services/assetTypeService";

// const ProductFormDialog = ({ open, onClose, onSubmit, product }: any) => {
//   // const [groups, setGroups] = useState([]);
//   // const [types, setTypes] = useState([]);
//   const [groups, setGroups] = useState<AssetGroup[]>([]);
//   const [types, setTypes] = useState<AssetType[]>([]);
//   const isEdit = !!product?.id;
//   // const [form, setForm] = useState({
//   //   tagNo: "",
//   //   assetGroupId: 0,
//   //   assetTypeId: 0,
//   //   stockedAt: "",
//   //   imageFile: null as File | null, //  NEW
//   //   imagePath: "", // for preview (existing image)
//   //   brand: "",
//   //   cost: "",
//   //   serialNo: "",
//   // });
//   const initialForm = {
//     tagNo: "",
//     assetGroupId: 0,
//     assetTypeId: 0,
//     stockedAt: "",
//     imageFile: null as File | null,
//     imagePath: "",
//     brand: "",
//     cost: "",
//     serialNo: "",
//   };
//   const [form, setForm] = useState(initialForm);
//   useEffect(() => {
//     const load = async () => {
//       const g = await assetGroupService.getAll();
//       const t = await assetTypeService.getAll();

//       setGroups(g.data);
//       setTypes(t.data);
//     };

//     load();
//   }, []);

//   // useEffect(() => {
//   //   if (product) {
//   //     setForm({
//   //       tagNo: product.tagNo || "",
//   //       assetGroupId: product.assetGroupId || "",
//   //       assetTypeId: product.assetTypeId || "",
//   //       stockedAt: product.stockedAt?.split("T")[0] || "",
//   //       imageFile: null,
//   //       imagePath: product.imagePath || "",
//   //       brand: product.brand || "",
//   //       cost: product.cost || "",
//   //       serialNo: product.serialNo || "",
//   //     });
//   //   }
//   // }, [product]);

//   // useEffect(() => {
//   //   if (product && groups.length && types.length) {
//   //     const group = groups.find((g: any) => g.groupName === product.groupName);

//   //     const type = types.find(
//   //       (t: any) =>
//   //         t.typeName === product.typeName && t.assetGroupId === group?.id,
//   //     );

//   //     setForm({
//   //       tagNo: product.tagNo || "",
//   //       assetGroupId: group?.id || 0,
//   //       assetTypeId: type?.id || 0,
//   //       stockedAt: product.stockedAt?.split("T")[0] || "",
//   //       imageFile: null,
//   //       imagePath: product.imagePath || "",
//   //       brand: product.brand || "",
//   //       cost: product.cost || "",
//   //       serialNo: product.serialNo || "",
//   //     });
//   //   }
//   // }, [product, groups, types]);

//   useEffect(() => {
//     if (product && groups.length && types.length) {
//       const group = groups.find((g) => g.groupName === product.groupName);

//       const type = types.find(
//         (t) => t.typeName === product.typeName && t.assetGroupId === group?.id,
//       );

//       setForm({
//         tagNo: product.tagNo || "",
//         assetGroupId: group?.id || 0,
//         assetTypeId: type?.id || 0,
//         stockedAt: product.stockedAt?.split("T")[0] || "",
//         imageFile: null,
//         imagePath: product.imagePath || "",
//         brand: product.brand || "",
//         cost: product.cost || "",
//         serialNo: product.serialNo || "",
//       });
//     }
//   }, [product, groups, types]);

//   // const handleChange = (e: any) => {
//   //   setForm({ ...form, [e.target.name]: e.target.value });
//   // };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     if (name === "assetGroupId") {
//       setForm({
//         ...form,
//         assetGroupId: Number(value), // ✅ convert
//         assetTypeId: 0, // ✅ reset properly
//       });
//     } else if (name === "assetTypeId") {
//       setForm({
//         ...form,
//         assetTypeId: Number(value), // ✅ convert
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleFileChange = (e: any) => {
//     setForm({
//       ...form,
//       imageFile: e.target.files[0],
//       imagePath: "", // remove old preview
//     });
//   };

//   const filteredTypes = types.filter(
//     (t) => t.assetGroupId === form.assetGroupId,
//   );

//   //  SUBMIT WITH FORMDATA
//   const handleSubmit = () => {
//     const data = new FormData();

//     data.append("tagNo", form.tagNo);
//     // data.append("assetGroupId", form.assetGroupId);
//     // data.append("assetTypeId", form.assetTypeId);
//     data.append("assetGroupId", form.assetGroupId.toString()); // ✅ FIX
//     data.append("assetTypeId", form.assetTypeId.toString()); // ✅ FIX
//     data.append("stockedAt", form.stockedAt);
//     data.append("brand", form.brand);

//     // data.append("cost", form.cost);
//     data.append("serialNo", form.serialNo);

//     if (form.imageFile) {
//       data.append("Image", form.imageFile); // must match backend
//     }

//     onSubmit(data);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       {/* <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle> */}
//       <DialogTitle>{isEdit ? "Edit Product" : "Create Product"}</DialogTitle>
//       <DialogContent>
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Tag No"
//           name="tagNo"
//           value={form.tagNo}
//           onChange={handleChange}
//         />

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Asset Group"
//           name="assetGroupId"
//           value={form.assetGroupId}
//           onChange={handleChange}
//         >
//           {groups.map((g: any) => (
//             <MenuItem key={g.id} value={g.id}>
//               {g.groupName}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           fullWidth
//           margin="normal"
//           label="Asset Type"
//           name="assetTypeId"
//           value={form.assetTypeId}
//           onChange={handleChange}
//         >
//           {filteredTypes.map((t: any) => (
//             <MenuItem key={t.id} value={t.id}>
//               {t.typeName}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           fullWidth
//           margin="normal"
//           type="date"
//           label="Stocked At"
//           name="stockedAt"
//           InputLabelProps={{ shrink: true }}
//           value={form.stockedAt}
//           onChange={handleChange}
//         />

//         {/* 🔥 FILE INPUT */}
//         <Box mt={2}>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </Box>

//         {/* 🔥 PREVIEW */}
//         <Box sx={{ mt: 2 }}>
//           {form.imageFile && (
//             <img src={URL.createObjectURL(form.imageFile)} width="150" />
//           )}

//           {!form.imageFile && form.imagePath && (
//             <img src={`http://localhost:5055/${form.imagePath}`} width="150" />
//           )}
//         </Box>

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Brand"
//           name="brand"
//           value={form.brand}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Cost"
//           type="number"
//           name="cost"
//           value={form.cost}
//           onChange={handleChange}
//         />

//         <TextField
//           fullWidth
//           margin="normal"
//           label="Serial No"
//           name="serialNo"
//           value={form.serialNo}
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

// export default ProductFormDialog;

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { assetGroupService } from "../../services/assetGroupService";
import { assetTypeService } from "../../services/assetTypeService";

type AssetGroup = { id: number; groupName: string };
type AssetType = { id: number; typeName: string; assetGroupId: number };

const ProductFormDialog = ({
  open = false,
  onClose = () => {},
  onSubmit = async () => {},
  product,
}: {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: FormData) => Promise<any> | any;
  product?: any;
}) => {
  const [groups, setGroups] = useState<AssetGroup[]>([]);
  const [types, setTypes] = useState<AssetType[]>([]);

  const initialForm = {
    tagNo: "",
    assetGroupId: 0,
    assetTypeId: 0,
    stockedAt: "",
    imageFile: null as File | null,
    imagePath: "",
    brand: "",
    cost: "",
    serialNo: "",
  };

  const [form, setForm] = useState(initialForm);
  const isEdit = !!product?.id;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load Asset Groups and Types
  useEffect(() => {
    const load = async () => {
      const g = await assetGroupService.getAll();
      const t = await assetTypeService.getAll();
      setGroups(g.data);
      setTypes(t.data);
    };
    load();
  }, []);

  // Reset form when `product` changes (including null for create)
  useEffect(() => {
    if (product && groups.length && types.length) {
      // Edit mode → prefill
      const group = groups.find((g) => g.groupName === product.groupName);
      const type = types.find(
        (t) => t.typeName === product.typeName && t.assetGroupId === group?.id,
      );

      setForm({
        tagNo: product.tagNo || "",
        assetGroupId: group?.id || 0,
        assetTypeId: type?.id || 0,
        stockedAt: product.stockedAt?.split("T")[0] || "",
        imageFile: null,
        imagePath: product.imagePath || "",
        brand: product.brand || "",
        cost: product.cost || "",
        serialNo: product.serialNo || "",
      });
    } else {
      // Create mode → reset
      setForm(initialForm);
    }
  }, [product, groups, types]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      if (name === "assetGroupId") delete next.assetTypeId;
      return next;
    });
    if (name === "assetGroupId") {
      setForm({ ...form, assetGroupId: Number(value), assetTypeId: 0 });
    } else if (name === "assetTypeId") {
      setForm({ ...form, assetTypeId: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e: any) => {
    setForm({ ...form, imageFile: e.target.files[0], imagePath: "" });
  };

  const filteredTypes = types.filter(
    (t) => t.assetGroupId === form.assetGroupId,
  );

  const handleSubmit = async () => {
    const nextErrors: Record<string, string> = {};

    if (!form.tagNo.trim()) nextErrors.tagNo = "Tag No is required";
    if (!form.assetGroupId) nextErrors.assetGroupId = "Asset Group is required";
    if (!form.assetTypeId) nextErrors.assetTypeId = "Asset Type is required";
    if (!form.stockedAt) nextErrors.stockedAt = "Stocked At is required";
    if (!form.brand.trim()) nextErrors.brand = "Brand is required";

    const costTrimmed = form.cost.toString().trim();
    const costValue = Number(form.cost);
    // Keep cost optional: the existing submit payload doesn't append it yet.
    if (costTrimmed && (Number.isNaN(costValue) || costValue < 0)) {
      nextErrors.cost = "Enter a valid cost";
    }

    if (!form.serialNo.trim()) nextErrors.serialNo = "Serial No is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const data = new FormData();
    data.append("tagNo", form.tagNo);
    data.append("assetGroupId", form.assetGroupId.toString());
    data.append("assetTypeId", form.assetTypeId.toString());
    data.append("stockedAt", form.stockedAt);
    data.append("brand", form.brand);
    data.append("serialNo", form.serialNo);
    if (form.imageFile) data.append("Image", form.imageFile);

    // Submit flow stays in parent; we only handle UI loading/disable here.
    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {isEdit ? "Edit Product" : "Create Product"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              label="Tag No"
              name="tagNo"
              value={form.tagNo}
              onChange={handleChange}
              error={Boolean(errors.tagNo)}
              helperText={errors.tagNo}
              required
            />

            <TextField
              select
              fullWidth
              margin="dense"
              label="Asset Group"
              name="assetGroupId"
              value={form.assetGroupId}
              onChange={handleChange}
              error={Boolean(errors.assetGroupId)}
              helperText={errors.assetGroupId}
              required
            >
              {groups.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.groupName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              margin="dense"
              label="Asset Type"
              name="assetTypeId"
              value={form.assetTypeId}
              onChange={handleChange}
              error={Boolean(errors.assetTypeId)}
              helperText={errors.assetTypeId}
              required
            >
              {filteredTypes.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.typeName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              margin="dense"
              type="date"
              label="Stocked At"
              name="stockedAt"
              InputLabelProps={{ shrink: true }}
              value={form.stockedAt}
              onChange={handleChange}
              error={Boolean(errors.stockedAt)}
              helperText={errors.stockedAt}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="Cost"
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              error={Boolean(errors.cost)}
              helperText={errors.cost}
            />

            <TextField
              fullWidth
              margin="dense"
              label="Brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              error={Boolean(errors.brand)}
              helperText={errors.brand}
              required
            />

            <TextField
              fullWidth
              margin="dense"
              label="Serial No"
              name="serialNo"
              value={form.serialNo}
              onChange={handleChange}
              error={Boolean(errors.serialNo)}
              helperText={errors.serialNo}
              required
            />

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
                    width={150}
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
                    width={150}
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
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <CircularProgress size={18} sx={{ color: "common.white", mr: 1 }} />
          ) : null}
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
