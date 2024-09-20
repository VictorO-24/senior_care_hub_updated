import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Container maxWidth="100vw" sx={{ p: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Senior Care Hub
          </Typography>
          <Button color="inherit" component={Link} href="/sign-in">
            Login
          </Button>
          <Button color="inherit" component={Link} href="/sign-up">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "80vh", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <SignIn />
        </Box>
      </Box>
    </Container>
  );
}
