import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [open] = useState(true);

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
    <Drawer variant="permanent" open={open}>
      <List sx={{ width: 240 }}>
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
  );
};

export default Sidebar;
