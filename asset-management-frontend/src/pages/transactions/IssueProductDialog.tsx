import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { employeeService } from "../../services/employeeService";
import { productService } from "../../services/productService";

const IssueProductDialog = ({ open, onClose, onSubmit }: any) => {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [productId, setProductId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      const emp = await employeeService.getAll();
      const prod = await productService.getAll();

      setEmployees(emp.data);

      // show only FREE products
      const freeProducts = prod.data.filter((p: any) => p.status === "Free");

      setProducts(freeProducts);
    };

    load();
  }, []);

  const handleSubmit = async () => {
    const nextErrors: Record<string, string> = {};
    if (!employeeId) nextErrors.employeeId = "Employee is required";
    if (!productId) nextErrors.productId = "Product is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        employeeId: Number(employeeId),
        productId: Number(productId),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Issue Product
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              fullWidth
              label="Employee"
              value={employeeId}
              onChange={(e) => {
                setEmployeeId(e.target.value);
                setErrors((prev) => ({ ...prev, employeeId: "" }));
              }}
              margin="dense"
              error={Boolean(errors.employeeId)}
              helperText={errors.employeeId}
              required
            >
              {employees.map((e: any) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.fullName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Product"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
                setErrors((prev) => ({ ...prev, productId: "" }));
              }}
              margin="dense"
              error={Boolean(errors.productId)}
              helperText={errors.productId}
              required
            >
              {products.map((p: any) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.tagNo} - {p.brand}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "space-between" }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <CircularProgress size={18} sx={{ color: "common.white", mr: 1 }} />
              Issuing...
            </>
          ) : (
            "Issue"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueProductDialog;
