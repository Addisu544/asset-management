import { Box, Typography, Paper, Stack } from "@mui/material";
import type { HTMLAttributes } from "react";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

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
      <Paper
        variant="outlined"
        sx={{
          maxWidth: 360,
          mx: "auto",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Stack spacing={1.5} alignItems="center">
          <SearchOffOutlinedIcon color="action" />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 700 }}>
            {message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmptyState;
