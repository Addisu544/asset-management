
import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }: any) => {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      
      {/* 🔹 TOPBAR (FULL WIDTH) */}
      <Topbar />

      {/* 🔹 BODY */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;