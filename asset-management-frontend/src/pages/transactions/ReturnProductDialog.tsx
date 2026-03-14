import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { productService } from "../../services/productService";

const ReturnProductDialog = ({ open, onClose, onSubmit }: any) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const load = async () => {
      const prod = await productService.getAll();

      const takenProducts = prod.data.filter((p: any) => p.status === "Taken");

      setProducts(takenProducts);
    };

    load();
  }, []);

  const handleSubmit = () => {
    onSubmit({
      productId: Number(productId),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Return Product</DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          label="Product"
          margin="normal"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          {products.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.tagNo} - {p.brand}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" color="success" onClick={handleSubmit}>
          Return
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnProductDialog;
