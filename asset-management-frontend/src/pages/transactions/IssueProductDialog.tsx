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
import { employeeService } from "../../services/employeeService";
import { productService } from "../../services/productService";

const IssueProductDialog = ({ open, onClose, onSubmit }: any) => {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [productId, setProductId] = useState("");

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

  const handleSubmit = () => {
    onSubmit({
      employeeId: Number(employeeId),
      productId: Number(productId),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Issue Product</DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          label="Employee"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          margin="normal"
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
          onChange={(e) => setProductId(e.target.value)}
          margin="normal"
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

        <Button variant="contained" onClick={handleSubmit}>
          Issue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueProductDialog;
