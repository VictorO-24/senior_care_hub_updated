"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css"; // Import global styles here

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html lang="en">
          <body>
            <div className="header">SeniorCareHub</div>
            <div className="sidebar">
              <nav>
                <ul>
                  {/* Removed the dashboard, medications, tasks, and caregiver tasks links */}
                </ul>
              </nav>
            </div>
            <div className="container">{children}</div>
            <div className="footer">Footer Information</div>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
