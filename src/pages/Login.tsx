import React, { useState, FormEvent } from "react";
import NavbarOne from "../components/NavbarOne";
import Footer from "../components/Footer";
import { Card, Button } from "@mantine/core";
import { TextField, Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconLock, IconUserCheck } from "@tabler/icons-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Save auth session
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/vendordashboard");
    }
  };

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <NavbarOne />
        
        <div className="w-full max-w-md my-12 mx-auto">
          <Card shadow="md" p="xl" radius="md" withBorder className="bg-white">
            <Box text-align="center" display="flex" flexDirection="column" alignItems="center" mb={3}>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <IconLock className="w-6 h-6 text-green-600" />
              </div>
              <Typography variant="h5" fontWeight="bold">
                Account Sign In
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                Sign in to manage supplier offers or update inventory
              </Typography>
            </Box>

            <form onSubmit={handleLogin} className="space-y-4">
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />

              <FormControl fullWidth size="small">
                <InputLabel id="role-label">Sign in as</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  label="Sign in as"
                  onChange={(e) => setRole(e.target.value as string)}
                >
                  <MenuItem value="vendor">Vendor / Supplier Portal</MenuItem>
                  <MenuItem value="admin">System Administrator</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                color="green"
                fullWidth
                size="md"
                mt="md"
                radius="md"
                leftIcon={<IconUserCheck size={18} />}
              >
                Sign In
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Login;
