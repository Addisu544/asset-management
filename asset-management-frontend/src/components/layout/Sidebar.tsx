
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Sidebar = ({ open, setOpen }: any) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser?.role === "Employee") return null;

  const assetManagerItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
    { label: "Products", path: "/products" },
    { label: "Transactions", path: "/transactions" },
    { label: "Asset Groups", path: "/asset-groups" },
    { label: "Asset Types", path: "/asset-types" },
    { label: "Departments", path: "/departments" },
  ];

  const managerItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
    { label: "Products", path: "/products" },
    { label: "Transactions", path: "/transactions" },
  ];

  const menu =
    currentUser?.role === "AssetManager" ? assetManagerItems : managerItems;

  return (
    <>
      {/* 🔹 Open Button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 21, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* 🔹 Close Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;