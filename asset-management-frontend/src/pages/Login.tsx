import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    if (!password.trim()) nextErrors.password = "Password is required";

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container   maxWidth="sm" 
  sx={{ 
    minHeight: "75vh", 
    display: "flex", 
    alignItems: "center" 
  }}>
      <Paper variant="outlined" sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="dense"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: "" }));
          }}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          required
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="dense"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: "" }));
          }}
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password}
          required
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
