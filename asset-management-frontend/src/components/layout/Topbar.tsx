import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  // const { currentUser, logout } = useAuth();
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Asset Management System</Typography>

        <Box>
          {/* <Avatar sx={{ cursor: "pointer" }} onClick={handleOpen}>
            {profile?.email?.[0].toUpperCase()}
          </Avatar> */}
          <Avatar
            sx={{ cursor: "pointer" }}
            onClick={handleOpen}
            src={
              profile?.imagePath
                ? `http://localhost:5055/${profile.imagePath}`
                : ""
            }
          >
            {/* fallback letter */}
            {!profile?.imagePath && profile?.email?.[0]?.toUpperCase()}
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled>{profile?.email}</MenuItem>

            <MenuItem disabled>{profile?.role}</MenuItem>

            <MenuItem onClick={() => navigate("/profile")}>
              View Profile
            </MenuItem>

            <MenuItem onClick={() => navigate("/myproperties")}>
              My Properties
            </MenuItem>

            <MenuItem onClick={() => navigate("/mytransactions")}>
              My Transactions
            </MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
