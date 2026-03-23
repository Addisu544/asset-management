import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: (t) => t.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          minHeight: 64,
          px: { xs: 1.5, md: 3 },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {onMenuClick && (
            <IconButton
              onClick={onMenuClick}
              sx={{
                bgcolor: "action.hover",
                "&:hover": { bgcolor: "action.selected" },
              }}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: "-0.01em" }}
          >
            Asset Management System
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button
              variant="text"
              color="error"
              onClick={() => navigate("/myproperties")}
              sx={{ fontWeight: 600 }}
            >
              My Properties
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => navigate("/mytransactions")}
              sx={{ fontWeight: 600 }}
            >
              My Transactions
            </Button>
          </Box>

          <Box>
            <Avatar
              onClick={handleOpen}
              sx={{
                cursor: "pointer",
                bgcolor: "primary.light",
                width: 40,
                height: 40,
                fontWeight: 700,
              }}
              src={
                profile?.imagePath
                  ? `http://localhost:5055/${profile.imagePath}`
                  : undefined
              }
              alt={profile?.email ? `User ${profile.email}` : "User"}
            >
              {!profile?.imagePath && profile?.email?.[0]?.toUpperCase()}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  minWidth: 220,
                },
              }}
            >
              <MenuItem disabled>{profile?.email}</MenuItem>

              <MenuItem disabled>{profile?.role}</MenuItem>

              <MenuItem onClick={() => navigate("/profile")}>
                View Profile
              </MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
