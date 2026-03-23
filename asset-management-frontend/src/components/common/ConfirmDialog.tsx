import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  loading = false,
}: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Typography>{message}</Typography>
        </Paper>
      </DialogContent>

      <DialogActions
        sx={{ px: 3, pb: 3, pt: 1, justifyContent: "space-between" }}
      >
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress
                size={18}
                sx={{ color: "common.white", mr: 1 }}
              />
              Confirming...
            </>
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
