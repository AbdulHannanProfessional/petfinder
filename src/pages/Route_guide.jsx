import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const publicSteps = [
  { label: "Home Page", description: "Accessible at `/` → Shows the New_Home component.", route: "/", type: "public" },
  { label: "Login Page", description: "Accessible at `/login` → User login screen.", route: "/login", type: "public" },
  { label: "Sign Up", description: "Accessible at `/signup` → User registration screen.", route: "/signup", type: "public" },
  { label: "Details", description: "Accessible at `/details/:id` → Shows pet details.", route: "/details/1", type: "public" },
];

const adminSteps = [
  { label: "Admin Login", description: "Accessible at `/admin/login` → Admin login screen.", route: "/admin/login", type: "admin" },
  { label: "Admin Dashboard", description: "Accessible at `/admin/dashboard` → Admin panel dashboard.", route: "/admin/dashboard", type: "admin" },
  { label: "Admin Pets", description: "Accessible at `/admin/pets` → Manage pets list.", route: "/admin/pets", type: "admin" },
  { label: "Admin Add Pet", description: "Accessible at `/admin/pets/add` → Add a new pet.", route: "/admin/pets/add", type: "admin" },
];

export default function RouteGuide() {
  const [activeStep, setActiveStep] = useState(0);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const navigate = useNavigate();
  const { auth, login } = useAuth();

  const isAdmin = auth?.user?.role === "admin";
  const steps = [...publicSteps, ...adminSteps];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  // fake admin auth just for demo (replace with real API request if needed)
  const handleAdminLogin = () => {
    if (adminEmail === "admin@admin.com" && adminPass === "admin123") {
      login({
        token: "demo-admin-token",
        user: { email: adminEmail, role: "admin" },
      });
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Application Route Guide
      </Typography>

      {/* Show unlock form if not admin */}
      {!isAdmin && (
        <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            🔒 Unlock Admin Routes
          </Typography>
          <TextField
            fullWidth
            label="Admin Email"
            variant="outlined"
            margin="normal"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Admin Password"
            variant="outlined"
            margin="normal"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdminLogin}
            sx={{ mt: 2 }}
          >
            Unlock Admin Routes
          </Button>
        </Paper>
      )}

      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => {
          const isLocked = step.type === "admin" && !isAdmin;
          return (
            <Step key={step.label}>
              <StepLabel
                icon={isLocked ? <Lock size={20} /> : undefined}
                error={isLocked}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>
                  {isLocked ? "Admin credentials required!" : step.description}
                </Typography>
                <Box sx={{ mt: 2, mb: 1, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isLocked}
                    onClick={() => navigate(step.route)}
                  >
                    {isLocked ? "Locked" : `Go to ${step.label}`}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={index === steps.length - 1}
                  >
                    Next Step
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>✅ All routes covered!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1 }}>
            Restart Guide
          </Button>
        </Paper>
      )}
    </Box>
  );
}
