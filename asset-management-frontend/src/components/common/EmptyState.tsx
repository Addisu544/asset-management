import { Box, Typography } from "@mui/material";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  message?: string;
};

const EmptyState = ({ message = "No Data Found", ...props }: Props) => {
  return (
    <Box
      {...props}
      sx={{
        textAlign: "center",
        py: 5,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
