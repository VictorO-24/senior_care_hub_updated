"use client";

import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  const [open, setOpen] = useState(false); // State to manage popup visibility
  const { isSignedIn } = useAuth(); // Get the signed-in status
  const router = useRouter();

  const handleViewServices = () => {
    if (!isSignedIn) {
      setOpen(true); // Open popup if not signed in
    } else {
      router.push("/services"); // Redirect to services page
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the popup
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (route) => {
    setAnchorEl(null);
    router.push(route);
  };

  return (
    <Container maxWidth="100vw" sx={{ bgcolor: "#e0e0e0" }}>
      <AppBar position="static" sx={{ bgcolor: "#2e3b4e", color: "#fff" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
            <Image src="/SeniorCareHub.webp" alt="Senior Care Hub Logo" width={40} height={40} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Senior Care Hub</Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleMenuOptionClick("/dashboard")}>Dashboard</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("/medications")}>
              Medication Reminders
            </MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("/tasks")}>Tasks</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("/contacts")}>Emergency Contacts</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("/appointments")}>Appointments</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick("/caregiver-tasks")}>
              Caregiver Tasks
            </MenuItem>
          </Menu>
          <SignedOut>
            <IconButton color="inherit" aria-label="sign in" href="/sign-in">
              <LoginIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="sign up" href="/sign-up">
              <AccountCircleIcon />
            </IconButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 4 }}>
  <Typography variant="h2" gutterBottom sx={{ color: "#004d40", fontSize: { xs: '24px', sm: '30px', md: '36px' } }}>
    Welcome to Senior Care Hub
  </Typography>
  <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}>
    Your trusted partner in senior care
  </Typography>
  <Button
    variant="contained"
    sx={{ mt: 2, bgcolor: "#004d40", color: "#fff", fontSize: { xs: '12px', sm: '16px', md: '18px' } }}
    onClick={handleViewServices}
  >
    View Services
  </Button>
</Box>

<Box sx={{ my: 6 }}>
  <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ color: "#004d40", fontSize: { xs: '20px', sm: '24px', md: '30px' } }}>
    Our Services
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
    <Box sx={{ 
      textAlign: "center", 
      p: { xs: 2, sm: 3, md: 4 }, 
      borderRadius: 2, 
      bgcolor: "#f0f4c3", 
      color: "#004d40", 
      mb: 4, 
      width: { xs: '100%', sm: '45%', md: '30%' }, 
      border: "3px solid black" 
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: { xs: '14px', sm: '18px', md: '22px' } }}>
        In-Home Care
      </Typography>
      <Typography sx={{ fontSize: { xs: '12px', sm: '16px', md: '18px' } }}>
        Personalized care services in the comfort of your own home.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#388e3c", color: "#fff", fontSize: { xs: '10px', sm: '14px', md: '16px' } }}
        onClick={handleViewServices}
      >
        Learn More
      </Button>
    </Box>
    <Box sx={{ 
      textAlign: "center", 
      p: { xs: 2, sm: 3, md: 4 }, 
      borderRadius: 2, 
      bgcolor: "#e1f5fe", 
      color: "#004d40", 
      mb: 4, 
      width: { xs: '100%', sm: '45%', md: '30%' }, 
      border: "3px solid black" 
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: { xs: '14px', sm: '18px', md: '22px' } }}>
        Medical Care
      </Typography>
      <Typography sx={{ fontSize: { xs: '12px', sm: '16px', md: '18px' } }}>
        Comprehensive medical services tailored for seniors.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#1976d2", color: "#fff", fontSize: { xs: '10px', sm: '14px', md: '16px' } }}
        onClick={handleViewServices}
      >
        Learn More
      </Button>
    </Box>
    <Box sx={{ 
      textAlign: "center", 
      p: { xs: 2, sm: 3, md: 4 }, 
      borderRadius: 2, 
      bgcolor: "#f3e5f5", 
      color: "#004d40", 
      mb: 4, 
      width: { xs: '100%', sm: '45%', md: '30%' }, 
      border: "3px solid black" 
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: { xs: '14px', sm: '18px', md: '22px' } }}>
        Support Services
      </Typography>
        <Typography>Companion care and other support services for a fulfilling life.</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: "#8e24aa", color: "#fff" }}
          onClick={handleViewServices}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  </Box>

  {/* Popup Dialog */}
  <Dialog open={open} onClose={handleClose} aria-labelledby="sign-in-dialog">
    <DialogTitle id="sign-in-dialog">Sign In Required</DialogTitle>
    <DialogContent>
      <Typography variant="body1">Please sign in to view our services.</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
      <Button href="/sign-in" sx={{ color: "#004d40" }}>
        Sign In
      </Button>
    </DialogActions>
  </Dialog>
</Container>
  );
}
