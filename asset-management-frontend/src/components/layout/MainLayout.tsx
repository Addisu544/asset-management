
import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = ({ children }: any) => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      
      {/* 🔹 TOPBAR (FULL WIDTH) */}
      <Topbar open={open} setOpen={setOpen} />

      {/* 🔹 BODY */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;