import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  open: boolean;
}

const LoadingOverlay = ({ open }: Props) => {
  return (
    <Backdrop open={open} sx={{ zIndex: 2000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
