
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../context/AuthContext";

const MainLayout = ({ children }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useAuth();
  const showSidebar = currentUser?.role !== "Employee";

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      {showSidebar && (
        <Sidebar
          isMobile={isMobile}
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Topbar
          onMenuClick={
            isMobile && showSidebar ? () => setMobileOpen(true) : undefined
          }
        />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: "auto",
            px: { xs: 2, md: 3 }, // 16–24px padding range
            py: { xs: 2, md: 3 },
          }}
        >
          <Container maxWidth="xl" disableGutters>
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;