import {
  Box,
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
import { useForm, type FieldValues } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../../app/store/hooks";
import { login } from "../store/authSlice";

function Login() {
  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    await dispatch(login(data));
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      userNameorEmail: "",
      password: "",
    },
  });

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
            Mutlu Gsm
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Giriş Yapın
          </Typography>
        </Stack>

        {/* Form */}
        <Stack component="form" spacing={2} onSubmit={handleSubmit(submitForm)}>
          <TextField
            {...register("userNameorEmail", {
              required: "Email veya kullanıcı adı girmeniz zorunlu!",
            })}
            fullWidth
            label="Email yada Kullanici adi"
            placeholder="Emalinizi veya kullanıcı adınızı giriniz"
            error={!!errors.userNameorEmail}
            helperText={errors.userNameorEmail?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            {...register("password", {
              required: "Parola girmelisiniz!",
              minLength: {
                value: 4,
                message: "En az 4 karakter girmelisiniz!",
              },
            })}
            fullWidth
            label="Şifre"
            type="password"
            placeholder="Şifrenizi giriniz"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={isSubmitting}
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!isValid}
          >
            Giriş Yap
          </LoadingButton>
        </Stack>

        {/* Divider + Social */}
        <Stack alignItems="center" spacing={2.5} mt={4}></Stack>

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
