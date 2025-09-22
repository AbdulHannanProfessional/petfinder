import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show only once per user (localStorage)
    const hasSeenModal = localStorage.getItem("welcomeModalShown");
    if (!hasSeenModal) {
      setOpen(true);
      localStorage.setItem("welcomeModalShown", "true");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", padding: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <PetsIcon color="primary" />
          Welcome to PetFinder 🐾
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Here’s how you can use the platform:
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <ShoppingCartIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Shop for Pets"
              secondary="Browse adorable pets, add them to your cart, and checkout."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AdminPanelSettingsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary="Admin Portal"
              secondary="If you’re an admin, log in at /admin to add new pets."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <MenuBookIcon sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              primary="Route Guide"
              secondary={
                <>
                  Want to explore all routes? Visit{" "}
                  <Link href="/route-guide" underline="hover" color="primary">
                    /route-guide
                  </Link>
                </>
              }
            />
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          Tip: Save the admin link if you have admin access 🔑
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleClose}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
