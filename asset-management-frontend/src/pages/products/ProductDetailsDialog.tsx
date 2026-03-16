import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import StatusBadge from "../../components/common/StatusBadge";

const ProductDetailsDialog = ({ open, onClose, product }: any) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Product Details</DialogTitle>

      <DialogContent>
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
          <img src={`http://localhost:5055/${product.imagePath}`} width="200" />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
