
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DomainIcon from "@mui/icons-material/Domain";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Sidebar = ({
  isMobile,
  open,
  onClose,
}: {
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser?.role === "Employee") return null;

  const assetManagerItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Users", path: "/users", icon: <PeopleIcon /> },
    { label: "Products", path: "/products", icon: <Inventory2Icon /> },
    {
      label: "Transactions",
      path: "/transactions",
      icon: <CompareArrowsIcon />,
    },
    {
      label: "Asset Groups",
      path: "/asset-groups",
      icon: <CategoryIcon />,
    },
    {
      label: "Asset Types",
      path: "/asset-types",
      icon: <AccountTreeIcon />,
    },
    {
      label: "Departments",
      path: "/departments",
      icon: <DomainIcon />,
    },
  ];

  const managerItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Users", path: "/users", icon: <PeopleIcon /> },
    { label: "Products", path: "/products", icon: <Inventory2Icon /> },
    {
      label: "Transactions",
      path: "/transactions",
      icon: <CompareArrowsIcon />,
    },
  ];

  const menu =
    currentUser?.role === "AssetManager" ? assetManagerItems : managerItems;

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Matches Topbar height alignment */}
      <Toolbar />

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
          NAVIGATION
        </Typography>
      </Box>

      <List sx={{ pt: 0 }}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={isActive}
              onClick={isMobile ? onClose : undefined}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                px: 2,
                "&.Mui-selected": {
                  bgcolor: "action.selected",
                  "& .MuiListItemIcon-root": { color: "primary.main" },
                },
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive ? "primary.main" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;