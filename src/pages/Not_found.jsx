import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%", boxShadow: 4 }}>
        <CardContent sx={{ pt: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1.5 }}>
            <AlertCircle size={32} color="red" />
            <Typography variant="h5" fontWeight={600} color="text.primary">
              404 - Page Not Found
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            The route you're trying to access does not exist on this website.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
             <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate("/route-guide")}
            >
              Route Guide
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
