import { useEffect, useState } from "react";
import { Typography, Paper, Box, Avatar } from "@mui/material";
import { userService } from "../../services/userService";
// import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  // const { currentUser } = useAuth();

  const [profile, setProfile] = useState<any>(null);

  const fetchProfile = async () => {
    // const res = await userService.getProfile(currentUser?.userId);
    const res = await userService.getMyProfile();
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          src={
            profile.imagePath
              ? `http://localhost:5055/${profile.imagePath}`
              : ""
          }
          sx={{ width: 120, height: 120 }}
        />
      </Box>

      <Typography>
        <strong>Full Name:</strong> {profile.fullName}
      </Typography>

      <Typography>
        <strong>Email:</strong> {profile.email}
      </Typography>

      <Typography>
        <strong>Title:</strong> {profile.title}
      </Typography>

      <Typography>
        <strong>Role:</strong> {profile.role}
      </Typography>

      <Typography>
        <strong>Status:</strong> {profile.status}
      </Typography>
    </Paper>
  );
};

export default ProfilePage;
