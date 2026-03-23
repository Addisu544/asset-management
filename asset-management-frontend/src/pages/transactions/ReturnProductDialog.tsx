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
import { productService } from "../../services/productService";

const ReturnProductDialog = ({ open, onClose, onSubmit }: any) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      const prod = await productService.getAll();

      const takenProducts = prod.data.filter((p: any) => p.status === "Taken");

      setProducts(takenProducts);
    };

    load();
  }, []);

  const handleSubmit = async () => {
    const nextErrors: Record<string, string> = {};
    if (!productId) nextErrors.productId = "Product is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
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
          Return Product
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              fullWidth
              label="Product"
              margin="dense"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
                setErrors((prev) => ({ ...prev, productId: "" }));
              }}
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

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <CircularProgress
                size={18}
                sx={{ color: "common.white", mr: 1 }}
              />
              Returning...
            </>
          ) : (
            "Return"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnProductDialog;
