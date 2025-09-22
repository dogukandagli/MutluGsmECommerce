"use client";

import * as React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: giriş mantığını bağla
    console.log({ email, password });
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (t) => t.palette.background.default,
        px: 2,
        py: 6,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 384,
          p: 4,
          borderRadius: 2,
          border: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* Header */}
        <Stack spacing={1.5} alignItems="center" mb={3}>
          <Box
            component="img"
            src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
            alt="Logo"
            sx={{ width: 32, height: 32, objectFit: "cover" }}
          />
          <Typography variant="h5" fontWeight={700}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Sign in to continue to your account
          </Typography>
        </Stack>

        {/* Form */}
        <Stack component="form" spacing={2}>
          <TextField
            fullWidth
            label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </Stack>

        {/* Divider + Social */}
        <Stack alignItems="center" spacing={2.5} mt={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
              or continue with
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Continue with GitHub" onClick={() => {}}>
              <GitHubIcon />
            </IconButton>
            <IconButton aria-label="Continue with Twitter" onClick={() => {}}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Continue with Email" onClick={() => {}}>
              <MailOutlineIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Footer Links */}
        <Stack alignItems="center" spacing={1.5} mt={4}>
          <Link component="button" type="button" onClick={() => {}}>
            Forgot your password?
          </Link>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an account?
            </Typography>
            <Link
              component="button"
              type="button"
              color="primary"
              onClick={() => {}}
            >
              Sign up
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
