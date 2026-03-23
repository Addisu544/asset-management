import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import StatusBadge from "../../components/common/StatusBadge";

const ProductDetailsDialog = ({ open, onClose, product }: any) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Product Details
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Typography>Tag No: {product.tagNo}</Typography>
          <Typography>Group: {product.groupName}</Typography>
          <Typography>Type: {product.typeName}</Typography>
          <Typography>Brand: {product.brand}</Typography>
          <Typography>Serial: {product.serialNo}</Typography>
          <Typography>Cost: {product.cost}</Typography>
          <Typography>Stocked At: {product.stockedAt}</Typography>

          <Typography>
            Status: <StatusBadge status={product.status} />
          </Typography>

          <Box sx={{ mt: 2 }}>
            <img
              src={`http://localhost:5055/${product.imagePath}`}
              width="100%"
              style={{ maxWidth: 260, borderRadius: 12, display: "block" }}
            />
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, justifyContent: "flex-end" }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsDialog;
