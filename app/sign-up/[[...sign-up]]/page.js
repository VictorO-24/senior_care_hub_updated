import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static" sx={{ backgroundColor: "#2e3b4e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Senior Care Hub
          </Typography>
          <Button color="inherit">
            <Link href="/sign-in" passHref>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 8, minHeight: "calc(100vh - 64px)", bgcolor: "#f7f7f7", py: 4, px: 2, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#004d40" }}>
          Create Your Account
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            bgcolor: "white",
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <SignUp />
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/sign-in" passHref>
            <Button sx={{ color: "#004d40", fontWeight: "bold" }}>
              Sign In
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
