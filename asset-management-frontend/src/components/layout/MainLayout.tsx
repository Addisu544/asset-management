import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import BreadcrumbsNav from "./BreadcrumbsNav";

const MainLayout = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Topbar />

        <Box sx={{ p: 3 }}>
          {/* <BreadcrumbsNav /> */}

          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
