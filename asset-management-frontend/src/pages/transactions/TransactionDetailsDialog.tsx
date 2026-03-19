import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  transaction?: any;
}

const TransactionDetailsDialog = ({ open, onClose, transaction }: Props) => {
  if (!transaction) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Transaction Details</DialogTitle>

      <DialogContent dividers>
        {/* ✅ IMAGE */}
        <Box display="flex" justifyContent="center" mb={2}>
          {transaction.productImagePath ? (
            <img
              src={`http://localhost:5055/${transaction.productImagePath}`}
              width="150"
            />
          ) : (
            <Typography>No Image</Typography>
          )}
        </Box>

        <Typography>
          <strong>Transaction Type:</strong> {transaction.transactionType}
        </Typography>

        <Typography>
          <strong>Employee:</strong> {transaction.employeeName}
        </Typography>

        <Typography>
          <strong>User ID:</strong> {transaction.employeeUserId}
        </Typography>

        <Typography>
          <strong>Product Tag:</strong> {transaction.productTagNo}
        </Typography>

        <Typography>
          <strong>Brand:</strong> {transaction.productBrand}
        </Typography>

        <Typography>
          <strong>Group:</strong> {transaction.groupName}
        </Typography>

        <Typography>
          <strong>Type:</strong> {transaction.typeName}
        </Typography>

        <Typography>
          <strong>Issued By:</strong> {transaction.issuedBy}
        </Typography>

        <Typography>
          <strong>Date:</strong> {transaction.createdAt}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
